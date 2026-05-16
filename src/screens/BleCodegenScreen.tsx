import React, { useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';
import NativeBleTransfer from '../specs/NativeBleTransfer';

const SERVICE_UUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const TX_CHARACTERISTIC_UUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
const RX_CHARACTERISTIC_UUID = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

const codegenSpec = `import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isBluetoothReady(): Promise<boolean>;
  startScan(serviceUuid: string): Promise<string>;
  connect(deviceId: string): Promise<boolean>;
  write(
    deviceId: string,
    serviceUuid: string,
    characteristicUuid: string,
    base64Payload: string,
  ): Promise<boolean>;
  read(
    deviceId: string,
    serviceUuid: string,
    characteristicUuid: string,
  ): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('BleTransfer');`;

const macDataSource = `brew install node
mkdir -p ~/ble-uart-source && cd ~/ble-uart-source
npm init -y
npm install @abandonware/bleno
sudo node peripheral.js`;

const macPeripheralScript = `const bleno = require('@abandonware/bleno');

const serviceUuid = '6e400001b5a3f393e0a9e50e24dcca9e';
const txUuid = '6e400002b5a3f393e0a9e50e24dcca9e';
const rxUuid = '6e400003b5a3f393e0a9e50e24dcca9e';

const tx = new bleno.Characteristic({
  uuid: txUuid,
  properties: ['write', 'writeWithoutResponse'],
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('phone -> mac:', data.toString('utf8'));
    callback(this.RESULT_SUCCESS);
  },
});

const rx = new bleno.Characteristic({
  uuid: rxUuid,
  properties: ['read', 'notify'],
  onReadRequest(offset, callback) {
    callback(this.RESULT_SUCCESS, Buffer.from('hello from mac'));
  },
});

bleno.on('stateChange', state => {
  if (state === 'poweredOn') {
    bleno.startAdvertising('Mac BLE UART', [serviceUuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', error => {
  if (!error) {
    bleno.setServices([
      new bleno.PrimaryService({
        uuid: serviceUuid,
        characteristics: [tx, rx],
      }),
    ]);
  }
});`;

const implementationSteps = [
  '在 src/specs/NativeBleTransfer.ts 定义 TurboModule 接口，运行 npm run codegen:ios 或 npm run codegen:android。',
  'iOS 原生侧用 CoreBluetooth CBCentralManager 扫描 serviceUuid，连接后写入 TX characteristic。',
  'Android 原生侧用 BluetoothLeScanner + BluetoothGatt，注意 BLUETOOTH_SCAN / CONNECT 权限。',
  'Mac 本地用 Homebrew 安装 Node，再用 bleno 广播一个 Nordic UART 风格的 GATT 服务作为数据源。',
  '真机测试时手机要靠近 Mac；iOS 模拟器不支持真实 BLE，Android 模拟器通常也不能做完整 BLE 链路。',
];

function toBase64(input: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const bytes: number[] = [];

  for (let index = 0; index < input.length; index += 1) {
    const codePoint = input.codePointAt(index);

    if (codePoint === undefined) {
      continue;
    }

    if (codePoint > 0xffff) {
      index += 1;
    }

    if (codePoint <= 0x7f) {
      bytes.push(codePoint);
    } else if (codePoint <= 0x7ff) {
      bytes.push(0xc0 + Math.floor(codePoint / 64), 0x80 + (codePoint % 64));
    } else if (codePoint <= 0xffff) {
      bytes.push(
        0xe0 + Math.floor(codePoint / 4096),
        0x80 + (Math.floor(codePoint / 64) % 64),
        0x80 + (codePoint % 64),
      );
    } else {
      bytes.push(
        0xf0 + Math.floor(codePoint / 262144),
        0x80 + (Math.floor(codePoint / 4096) % 64),
        0x80 + (Math.floor(codePoint / 64) % 64),
        0x80 + (codePoint % 64),
      );
    }
  }

  let output = '';
  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index];
    const second = bytes[index + 1];
    const third = bytes[index + 2];

    output += alphabet[Math.floor(first / 4)];
    output += alphabet[((first % 4) * 16) + Math.floor((second ?? 0) / 16)];
    output += second === undefined ? '=' : alphabet[((second % 16) * 4) + Math.floor((third ?? 0) / 64)];
    output += third === undefined ? '=' : alphabet[third % 64];
  }

  return output;
}

export default function BleCodegenScreen() {
  const [colors] = useAtom(themeColorsAtom);
  const [deviceId, setDeviceId] = useState('Mac BLE UART');
  const [payload, setPayload] = useState('hello from React Native');
  const [status, setStatus] = useState('等待连接 BLE 数据源');
  const moduleState = NativeBleTransfer ? '已发现 BleTransfer 原生模块' : 'BleTransfer 原生模块待实现';
  const base64Payload = useMemo(() => toBase64(payload), [payload]);

  const checkBluetooth = async () => {
    if (!NativeBleTransfer) {
      setStatus('当前只有 Codegen 接口和页面，尚未接入 iOS/Android 原生 BLE 实现。');
      return;
    }

    try {
      const ready = await NativeBleTransfer.isBluetoothReady();
      setStatus(ready ? '蓝牙已就绪，可以扫描数据源。' : '蓝牙未就绪，请检查系统蓝牙和权限。');
    } catch (error: any) {
      Alert.alert('BLE 检查失败', error.message || '无法读取蓝牙状态');
    }
  };

  const scanDataSource = async () => {
    if (!NativeBleTransfer) {
      setStatus('运行 Mac 数据源后，实现原生 BleTransfer.startScan 即可扫描该 Service UUID。');
      return;
    }

    try {
      const foundDeviceId = await NativeBleTransfer.startScan(SERVICE_UUID);
      setDeviceId(foundDeviceId);
      setStatus(`发现设备：${foundDeviceId}`);
    } catch (error: any) {
      Alert.alert('扫描失败', error.message || '未找到 BLE 数据源');
    }
  };

  const sendPayload = async () => {
    if (!NativeBleTransfer) {
      setStatus(`演示 payload 已转为 Base64：${base64Payload}`);
      return;
    }

    try {
      const connected = await NativeBleTransfer.connect(deviceId);
      if (!connected) {
        setStatus('连接失败，请确认 Mac BLE 数据源正在广播。');
        return;
      }

      await NativeBleTransfer.write(deviceId, SERVICE_UUID, TX_CHARACTERISTIC_UUID, base64Payload);
      setStatus(`已发送 ${payload.length} 个字符到 ${deviceId}`);
    } catch (error: any) {
      Alert.alert('发送失败', error.message || 'BLE 写入失败');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.kicker, { color: colors.primary }]}>BLE Low Energy</Text>
          <Text style={[styles.title, { color: colors.text }]}>BLE Codegen 数据传输</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            用 React Native Codegen 定义蓝牙连接、读写和扫描接口，再用 Mac 本机创建一个可发送数据的 BLE GATT 数据源。
          </Text>
          <View style={[styles.statusPill, { backgroundColor: colors.primary + '18' }]}>
            <Text style={[styles.statusPillText, { color: colors.primary }]}>{moduleState}</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>连接与发送</Text>
          <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
            默认使用 Nordic UART 风格的 Service / Characteristic UUID，便于 Mac 数据源和手机端对齐。
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>设备名或设备 ID</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              value={deviceId}
              onChangeText={setDeviceId}
              placeholder="Mac BLE UART"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>发送内容</Text>
            <TextInput
              style={[styles.input, styles.payloadInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              value={payload}
              onChangeText={setPayload}
              multiline
              placeholder="输入要发送到 Mac 的文本"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.info }]} onPress={checkBluetooth}>
              <Text style={styles.actionButtonText}>检查蓝牙</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]} onPress={scanDataSource}>
              <Text style={styles.actionButtonText}>扫描数据源</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.success }]} onPress={sendPayload}>
              <Text style={styles.actionButtonText}>发送数据</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.statusBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>状态</Text>
            <Text style={[styles.statusText, { color: colors.text }]}>{status}</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>UUID 约定</Text>
          <Text style={[styles.uuidText, { color: colors.text }]}>Service: {SERVICE_UUID}</Text>
          <Text style={[styles.uuidText, { color: colors.text }]}>TX Write: {TX_CHARACTERISTIC_UUID}</Text>
          <Text style={[styles.uuidText, { color: colors.text }]}>RX Read/Notify: {RX_CHARACTERISTIC_UUID}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Codegen Spec</Text>
          <CodeBlock code={codegenSpec} />
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Mac 通过 brew 创建数据源</Text>
          <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
            Homebrew 负责安装运行环境，BLE 广播由 Node 的 bleno 库完成。macOS 可能需要授予终端蓝牙权限。
          </Text>
          <CodeBlock code={macDataSource} />
          <Text style={[styles.fileLabel, { color: colors.primary }]}>peripheral.js</Text>
          <CodeBlock code={macPeripheralScript} />
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>落地步骤</Text>
          <View style={styles.stepList}>
            {implementationSteps.map((step, index) => (
              <Text key={step} style={[styles.stepText, { color: colors.textSecondary }]}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
          <Text style={[styles.platformHint, { color: colors.warning }]}>
            当前平台：{Platform.OS}。BLE 真机行为以设备、系统权限和蓝牙芯片能力为准。
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <View style={[styles.codeBlock, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.codeText, { color: colors.text }]}>{code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 14,
  },
  hero: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginTop: 14,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 15,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  payloadInput: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  actionButton: {
    borderRadius: 8,
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  statusBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 20,
  },
  uuidText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    lineHeight: 20,
  },
  fileLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 14,
  },
  codeBlock: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
  stepList: {
    gap: 8,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 21,
  },
  platformHint: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginTop: 14,
  },
});
