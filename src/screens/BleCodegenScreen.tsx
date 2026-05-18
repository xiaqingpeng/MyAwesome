import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
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
const WEIGHT_SCALE_SERVICE_UUID = '0000181D-0000-1000-8000-00805F9B34FB';
const WEIGHT_MEASUREMENT_UUID = '00002A9D-0000-1000-8000-00805F9B34FB';
const BLOOD_PRESSURE_SERVICE_UUID = '00001810-0000-1000-8000-00805F9B34FB';
const BLOOD_PRESSURE_MEASUREMENT_UUID = '00002A35-0000-1000-8000-00805F9B34FB';

// E-Bike custom service UUIDs (vendor-defined)
const EBIKE_SERVICE_UUID    = 'E7000001-A0C0-4E8B-B3D0-1A2B3C4D5E6F';
const EBIKE_CONTROL_UUID    = 'E7000002-A0C0-4E8B-B3D0-1A2B3C4D5E6F'; // write commands
const EBIKE_STATUS_UUID     = 'E7000003-A0C0-4E8B-B3D0-1A2B3C4D5E6F'; // read/notify status

// E-Bike command bytes (must match peripheral.js)
const CMD_POWER_ON  = 0x01;
const CMD_POWER_OFF = 0x02;
const CMD_LOCK      = 0x03;
const CMD_UNLOCK    = 0x04;
const CMD_FIND      = 0x05;

type BleProfileKey = 'uart' | 'scale' | 'bloodPressure' | 'ebike';

const bleProfiles: Record<
  BleProfileKey,
  {
    label: string;
    deviceName: string;
    serviceUuid: string;
    writeUuid: string;
    readUuid: string;
    samplePayload: string;
  }
> = {
  uart: {
    label: 'UART',
    deviceName: 'Mac BLE UART',
    serviceUuid: SERVICE_UUID,
    writeUuid: TX_CHARACTERISTIC_UUID,
    readUuid: RX_CHARACTERISTIC_UUID,
    samplePayload: 'hello from React Native',
  },
  scale: {
    label: '体重秤',
    deviceName: 'Mac Weight Scale',
    serviceUuid: WEIGHT_SCALE_SERVICE_UUID,
    writeUuid: WEIGHT_MEASUREMENT_UUID,
    readUuid: WEIGHT_MEASUREMENT_UUID,
    samplePayload: 'read weight measurement',
  },
  bloodPressure: {
    label: '血压仪',
    deviceName: 'Mac Blood Pressure',
    serviceUuid: BLOOD_PRESSURE_SERVICE_UUID,
    writeUuid: BLOOD_PRESSURE_MEASUREMENT_UUID,
    readUuid: BLOOD_PRESSURE_MEASUREMENT_UUID,
    samplePayload: 'read blood pressure measurement',
  },
  ebike: {
    label: '电动车',
    deviceName: 'Mac E-Bike',
    serviceUuid: EBIKE_SERVICE_UUID,
    writeUuid: EBIKE_CONTROL_UUID,
    readUuid: EBIKE_STATUS_UUID,
    samplePayload: 'read bike measurement',
  },
};

const codegenSpec = `import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isBluetoothReady(): Promise<boolean>;
  startScan(serviceUuid: string): Promise<string>;
  stopScan(): Promise<void>;
  connect(deviceId: string): Promise<boolean>;
  disconnect(deviceId: string): Promise<void>;
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

const macDataSource = `brew update
brew install node
cd /Applications/qingpengxia/develop/rn/MyAwesome/tools/ble-gatt-source
pnpm install
pnpm build:bleno-mac
pnpm check:bleno

pnpm uart
pnpm scale
pnpm blood-pressure
pnpm ebike`;

const macPeripheralScript = `// 文件位置：tools/ble-gatt-source/peripheral.js
// 运行：sudo node peripheral.js --profile ebike
const bleno = require('@abandonware/bleno');

const profileName = process.argv.includes('--profile')
  ? process.argv[process.argv.indexOf('--profile') + 1]
  : 'uart';

// 支持 uart / scale / blood-pressure / ebike，完整示例已放在仓库 tools/ble-gatt-source/peripheral.js。`;

const implementationSteps = [
  '在 src/specs/NativeBleTransfer.ts 定义 TurboModule 接口，运行 npm run codegen:ios 或 npm run codegen:android。',
  'iOS 原生侧用 CoreBluetooth CBCentralManager 扫描 serviceUuid，连接后读写目标 characteristic。',
  'Android 原生侧用 BluetoothLeScanner + BluetoothGatt，注意 BLUETOOTH_SCAN / CONNECT 权限。',
  'Mac 本地用 Homebrew 安装 Node，再用 bleno 广播 UART、Weight Scale、Blood Pressure 或 E-Bike GATT 服务作为数据源。',
  '电动车 Profile 使用 Control characteristic 写入 0x01-0x05 指令，用 Status characteristic 读取电源、车锁、电量、速度和里程。',
  '真机测试时手机要靠近 Mac；iOS 模拟器不支持真实 BLE，Android 模拟器通常也不能做完整 BLE 链路。',
];

const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const ANDROID_MAC_ADDRESS_PATTERN = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
const IOS_PERIPHERAL_ID_PATTERN = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/;

function utf8Bytes(input: string) {
  const bytes: number[] = [];

  for (let index = 0; index < input.length; index += 1) {
    let codePoint = input.charCodeAt(index);

    if (codePoint >= 0xd800 && codePoint <= 0xdbff && index + 1 < input.length) {
      const next = input.charCodeAt(index + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        codePoint = 0x10000 + ((codePoint - 0xd800) << 10) + (next - 0xdc00);
        index += 1;
      }
    }

    if (codePoint <= 0x7f) {
      bytes.push(codePoint);
    } else if (codePoint <= 0x7ff) {
      bytes.push(0xc0 | (codePoint >> 6), 0x80 | (codePoint & 0x3f));
    } else if (codePoint <= 0xffff) {
      bytes.push(0xe0 | (codePoint >> 12), 0x80 | ((codePoint >> 6) & 0x3f), 0x80 | (codePoint & 0x3f));
    } else {
      bytes.push(
        0xf0 | (codePoint >> 18),
        0x80 | ((codePoint >> 12) & 0x3f),
        0x80 | ((codePoint >> 6) & 0x3f),
        0x80 | (codePoint & 0x3f),
      );
    }
  }

  return bytes;
}

function bytesToBase64(bytes: number[]) {
  let output = '';

  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index] ?? 0;
    const second = bytes[index + 1] ?? 0;
    const third = bytes[index + 2] ?? 0;
    const combined = (first << 16) | (second << 8) | third;

    output += BASE64_ALPHABET[(combined >> 18) & 0x3f];
    output += BASE64_ALPHABET[(combined >> 12) & 0x3f];
    output += index + 1 < bytes.length ? BASE64_ALPHABET[(combined >> 6) & 0x3f] : '=';
    output += index + 2 < bytes.length ? BASE64_ALPHABET[combined & 0x3f] : '=';
  }

  return output;
}

function toBase64(input: string) {
  return bytesToBase64(utf8Bytes(input));
}

function isResolvedBleDeviceId(value: string) {
  return ANDROID_MAC_ADDRESS_PATTERN.test(value) || IOS_PERIPHERAL_ID_PATTERN.test(value);
}

function fromBase64(input: string) {
  const cleanInput = input.replace(/[^A-Za-z0-9+/=]/g, '');
  const bytes: number[] = [];

  for (let index = 0; index < cleanInput.length; index += 4) {
    const first = BASE64_ALPHABET.indexOf(cleanInput[index] ?? 'A');
    const second = BASE64_ALPHABET.indexOf(cleanInput[index + 1] ?? 'A');
    const thirdChar = cleanInput[index + 2];
    const fourthChar = cleanInput[index + 3];
    const third = thirdChar === '=' || thirdChar == null ? 0 : BASE64_ALPHABET.indexOf(thirdChar);
    const fourth = fourthChar === '=' || fourthChar == null ? 0 : BASE64_ALPHABET.indexOf(fourthChar);
    const combined = (first << 18) | (second << 12) | (third << 6) | fourth;

    bytes.push((combined >> 16) & 0xff);
    if (thirdChar !== '=' && thirdChar != null) {
      bytes.push((combined >> 8) & 0xff);
    }
    if (fourthChar !== '=' && fourthChar != null) {
      bytes.push(combined & 0xff);
    }
  }

  return bytes;
}

function sfloatToNumber(bytes: number[], offset: number) {
  const raw = (bytes[offset] ?? 0) + ((bytes[offset + 1] ?? 0) * 256);
  let mantissa = raw % 4096;
  let exponent = Math.floor(raw / 4096);

  if (mantissa >= 0x0800) {
    mantissa -= 0x1000;
  }
  if (exponent >= 0x0008) {
    exponent -= 0x0010;
  }

  return mantissa * 10 ** exponent;
}

function decodeMeasurement(profile: BleProfileKey, base64Value: string) {
  const bytes = fromBase64(base64Value);

  if (profile === 'scale') {
    const flags = bytes[0] ?? 0;
    const rawWeight = (bytes[1] ?? 0) + ((bytes[2] ?? 0) * 256);
    const isImperial = flags % 2 === 1;
    const weight = rawWeight * (isImperial ? 0.01 : 0.005);
    return `体重：${weight.toFixed(2)} ${isImperial ? 'lb' : 'kg'}；原始 Base64：${base64Value}`;
  }

  if (profile === 'bloodPressure') {
    const flags = bytes[0] ?? 0;
    const unit = flags % 2 === 1 ? 'kPa' : 'mmHg';
    const systolic = sfloatToNumber(bytes, 1);
    const diastolic = sfloatToNumber(bytes, 3);
    const mean = sfloatToNumber(bytes, 5);
    return `血压：${systolic.toFixed(0)}/${diastolic.toFixed(0)} ${unit}，MAP ${mean.toFixed(0)}；原始 Base64：${base64Value}`;
  }

  if (profile === 'ebike') {
    // [power(1), locked(1), battery(1), speed(1), odometer_lo(1), odometer_hi(1)]
    const power    = (bytes[0] ?? 0) === 1;
    const locked   = (bytes[1] ?? 0) === 1;
    const battery  = bytes[2] ?? 0;
    const speed    = bytes[3] ?? 0;
    const odometer = (bytes[4] ?? 0) + ((bytes[5] ?? 0) * 256);
    return `电源:${power ? '开' : '关'} 车锁:${locked ? '已锁' : '未锁'} 电量:${battery}% 速度:${speed}km/h 里程:${odometer}km`;
  }

  const text = String.fromCharCode(...bytes);
  return text ? `读取到：${text}` : `读取到 Base64：${base64Value}`;
}

async function ensureBlePermissions() {
  if (Platform.OS !== 'android') {
    return true;
  }

  const permissions =
    Platform.Version >= 31
      ? [
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]
      : [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];

  const result = await PermissionsAndroid.requestMultiple(permissions);
  return permissions.every(permission => result[permission] === PermissionsAndroid.RESULTS.GRANTED);
}

export default function BleCodegenScreen() {
  const [colors] = useAtom(themeColorsAtom);
  const [profileKey, setProfileKey] = useState<BleProfileKey>('uart');
  const profile = bleProfiles[profileKey];
  const [deviceId, setDeviceId] = useState(profile.deviceName);
  const [payload, setPayload] = useState(profile.samplePayload);
  const [status, setStatus] = useState('等待连接 BLE 数据源');
  const moduleState = NativeBleTransfer ? '已发现 BleTransfer 原生模块' : 'BleTransfer 原生模块待实现';
  const base64Payload = useMemo(() => toBase64(payload), [payload]);

  // E-Bike resolved device id cache
  const [ebikeDeviceId, setEbikeDeviceId] = useState<string | null>(null);
  const ebikeResolvePromiseRef = useRef<Promise<string | null> | null>(null);

  const selectProfile = (nextProfileKey: BleProfileKey) => {
    const nextProfile = bleProfiles[nextProfileKey];
    setProfileKey(nextProfileKey);
    setDeviceId(nextProfile.deviceName);
    setPayload(nextProfile.samplePayload);
    setStatus(`已切换到 ${nextProfile.label}，请启动对应的 Mac BLE 数据源。`);
  };

  const resolveAndConnect = async (serviceUuid: string, currentDeviceId: string) => {
    let resolvedDeviceId = currentDeviceId.trim();

    if (!isResolvedBleDeviceId(resolvedDeviceId)) {
      setStatus('正在扫描 BLE 数据源...');
      resolvedDeviceId = await NativeBleTransfer!.startScan(serviceUuid);
      setDeviceId(resolvedDeviceId);
      setStatus(`发现设备：${resolvedDeviceId}，正在连接...`);
    } else {
      setStatus(`正在连接 ${resolvedDeviceId}...`);
    }

    const connected = await NativeBleTransfer!.connect(resolvedDeviceId);
    if (!connected) {
      throw new Error('BLE 连接失败');
    }

    return resolvedDeviceId;
  };

  const checkBluetooth = async () => {
    const hasPermissions = await ensureBlePermissions();
    if (!hasPermissions) {
      setStatus('蓝牙权限未授权，请在系统权限弹窗中允许蓝牙/定位权限。');
      return;
    }

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
    const hasPermissions = await ensureBlePermissions();
    if (!hasPermissions) {
      setStatus('蓝牙权限未授权，无法扫描 BLE 数据源。');
      return;
    }

    if (!NativeBleTransfer) {
      setStatus('运行 Mac 数据源后，实现原生 BleTransfer.startScan 即可扫描该 Service UUID。');
      return;
    }

    try {
      const foundDeviceId = await NativeBleTransfer.startScan(profile.serviceUuid);
      setDeviceId(foundDeviceId);
      setStatus(`发现设备：${foundDeviceId}`);
    } catch (error: any) {
      Alert.alert('扫描失败', error.message || '未找到 BLE 数据源');
    }
  };

  const sendPayload = async () => {
    const hasPermissions = await ensureBlePermissions();
    if (!hasPermissions) {
      setStatus('蓝牙权限未授权，无法连接或发送 BLE 数据。');
      return;
    }

    if (!NativeBleTransfer) {
      setStatus(`演示 payload 已转为 Base64：${base64Payload}`);
      return;
    }

    try {
      const resolvedDeviceId = await resolveAndConnect(profile.serviceUuid, deviceId);

      await NativeBleTransfer.write(resolvedDeviceId, profile.serviceUuid, profile.writeUuid, base64Payload);
      setStatus(`已发送 ${payload.length} 个字符到 ${resolvedDeviceId}`);
    } catch (error: any) {
      Alert.alert('发送失败', error.message || 'BLE 写入失败');
    }
  };

  const readMeasurement = async () => {
    const hasPermissions = await ensureBlePermissions();
    if (!hasPermissions) {
      setStatus('蓝牙权限未授权，无法读取 BLE 数据。');
      return;
    }

    if (!NativeBleTransfer) {
      setStatus('当前环境未加载 BleTransfer 原生模块，真机运行后可读取 GATT characteristic。');
      return;
    }

    try {
      const resolvedDeviceId = await resolveAndConnect(profile.serviceUuid, deviceId);

      const base64Value = await NativeBleTransfer.read(resolvedDeviceId, profile.serviceUuid, profile.readUuid);
      setStatus(decodeMeasurement(profileKey, base64Value));
    } catch (error: any) {
      Alert.alert('读取失败', error.message || 'BLE 读取失败');
    }
  };

  // ── E-Bike helpers ──────────────────────────────────────────────────────────

  /** Resolve device, connect if needed, return MAC address */
  const resolveEbike = async (): Promise<string | null> => {
    if (ebikeResolvePromiseRef.current) {
      return ebikeResolvePromiseRef.current;
    }

    if (!NativeBleTransfer) {
      setStatus('BleTransfer 原生模块未加载。');
      return null;
    }
    const hasPermissions = await ensureBlePermissions();
    if (!hasPermissions) {
      setStatus('蓝牙权限未授权。');
      return null;
    }
    const resolvePromise = (async () => {
      let id = ebikeDeviceId;
      if (!id) {
        setStatus('正在扫描电动车...');
        id = await NativeBleTransfer.startScan(EBIKE_SERVICE_UUID);
        setEbikeDeviceId(id);
        setDeviceId(id);
      }
      setStatus(`正在连接 ${id}...`);
      const connected = await NativeBleTransfer.connect(id);
      if (!connected) {
        throw new Error('连接失败，请确认 Mac E-Bike 数据源正在广播。');
      }
      return id;
    })();

    ebikeResolvePromiseRef.current = resolvePromise;
    try {
      return await resolvePromise;
    } catch (error: any) {
      Alert.alert('连接失败', error.message);
      return null;
    } finally {
      ebikeResolvePromiseRef.current = null;
    }
  };

  const sendEbikeCommand = async (cmd: number, label: string) => {
    const id = await resolveEbike();
    if (!id) { return; }
    try {
      // Single-byte command encoded as Base64
      const cmdBase64 = bytesToBase64([cmd]);
      await NativeBleTransfer!.write(id, EBIKE_SERVICE_UUID, EBIKE_CONTROL_UUID, cmdBase64);
      setStatus(`✅ 已发送指令：${label}`);
    } catch (error: any) {
      Alert.alert('指令失败', error.message);
    }
  };

  const readEbikeStatus = async () => {
    const id = await resolveEbike();
    if (!id) { return; }
    try {
      const base64Value = await NativeBleTransfer!.read(id, EBIKE_SERVICE_UUID, EBIKE_STATUS_UUID);
      setStatus(decodeMeasurement('ebike', base64Value));
    } catch (error: any) {
      Alert.alert('读取失败', error.message);
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
          <View style={styles.profileRow}>
            {(Object.keys(bleProfiles) as BleProfileKey[]).map(key => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.profileButton,
                  {
                    backgroundColor: profileKey === key ? colors.primary : colors.card,
                    borderColor: profileKey === key ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => selectProfile(key)}
              >
                <Text
                  style={[
                    styles.profileButtonText,
                    profileKey === key ? styles.profileButtonTextActive : { color: colors.text },
                  ]}
                >
                  {bleProfiles[key].label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.warning }]} onPress={readMeasurement}>
              <Text style={styles.actionButtonText}>读取数据</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.statusBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>状态</Text>
            <Text style={[styles.statusText, { color: colors.text }]}>{status}</Text>
          </View>
        </View>

        {/* E-Bike dedicated control panel */}
        {profileKey === 'ebike' && (
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>🛵 电动车控制</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
              通过 BLE GATT 向电动车发送控制指令，读取实时状态。Mac 端运行 pnpm ebike 启动模拟数据源。
            </Text>

            {/* Power row */}
            <Text style={[styles.label, { color: colors.text }]}>电源</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.ebikeButton, { backgroundColor: '#4CAF50' }]}
                onPress={() => sendEbikeCommand(CMD_POWER_ON, '开机')}>
                <Text style={styles.ebikeButtonIcon}>⚡</Text>
                <Text style={styles.ebikeButtonText}>开机</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ebikeButton, { backgroundColor: '#9E9E9E' }]}
                onPress={() => sendEbikeCommand(CMD_POWER_OFF, '关机')}>
                <Text style={styles.ebikeButtonIcon}>⏻</Text>
                <Text style={styles.ebikeButtonText}>关机</Text>
              </TouchableOpacity>
            </View>

            {/* Lock row */}
            <Text style={[styles.label, { color: colors.text }]}>车锁</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.ebikeButton, { backgroundColor: '#F44336' }]}
                onPress={() => sendEbikeCommand(CMD_LOCK, '锁车')}>
                <Text style={styles.ebikeButtonIcon}>🔒</Text>
                <Text style={styles.ebikeButtonText}>锁车</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ebikeButton, { backgroundColor: '#2196F3' }]}
                onPress={() => sendEbikeCommand(CMD_UNLOCK, '解锁')}>
                <Text style={styles.ebikeButtonIcon}>🔓</Text>
                <Text style={styles.ebikeButtonText}>解锁</Text>
              </TouchableOpacity>
            </View>

            {/* Find & Status row */}
            <Text style={[styles.label, { color: colors.text }]}>其他</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.ebikeButton, { backgroundColor: '#FF9800' }]}
                onPress={() => sendEbikeCommand(CMD_FIND, '寻车')}>
                <Text style={styles.ebikeButtonIcon}>📍</Text>
                <Text style={styles.ebikeButtonText}>寻车</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ebikeButton, { backgroundColor: '#9C27B0' }]}
                onPress={readEbikeStatus}>
                <Text style={styles.ebikeButtonIcon}>📊</Text>
                <Text style={styles.ebikeButtonText}>读取状态</Text>
              </TouchableOpacity>
            </View>

            {/* Protocol note */}
            <View style={[styles.protocolBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.protocolTitle, { color: colors.textSecondary }]}>协议说明</Text>
              <Text style={[styles.protocolText, { color: colors.textSecondary }]}>
                Control (write): 0x01=开机 0x02=关机 0x03=锁车 0x04=解锁 0x05=寻车{'\n'}
                Status (read/notify): [power, locked, battery%, speed, odo_lo, odo_hi]
              </Text>
            </View>
          </View>
        )}

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>UUID 约定</Text>
          <Text style={[styles.uuidText, { color: colors.text }]}>Profile: {profile.label}</Text>
          <Text style={[styles.uuidText, { color: colors.text }]}>Service: {profile.serviceUuid}</Text>
          <Text style={[styles.uuidText, { color: colors.text }]}>Write: {profile.writeUuid}</Text>
          <Text style={[styles.uuidText, { color: colors.text }]}>Read: {profile.readUuid}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Codegen Spec</Text>
          <CodeBlock code={codegenSpec} />
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Mac 通过 brew 创建数据源</Text>
          <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
            Homebrew 负责安装运行环境，BLE 广播由 Node 的 bleno 库完成。可分别模拟 UART、体重秤、血压仪和电动车，macOS 可能需要授予终端蓝牙权限。
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
  profileRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  profileButton: {
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 38,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  profileButtonTextActive: {
    color: '#fff',
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
  // E-Bike control panel
  ebikeButton: {
    flex: 1,
    minWidth: 80,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  ebikeButtonIcon: {
    fontSize: 22,
  },
  ebikeButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  protocolBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginTop: 8,
  },
  protocolTitle: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  protocolText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11,
    lineHeight: 17,
  },
});
