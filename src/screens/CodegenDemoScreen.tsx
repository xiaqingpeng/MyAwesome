import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';
import NativeCalculator from '../specs/NativeCalculator';
import CustomButton from '../specs/CustomButtonNativeComponent';

export default function CodegenDemoScreen() {
  const [colors] = useAtom(themeColorsAtom);
  // Calculator state
  const [num1, setNum1] = useState('10');
  const [num2, setNum2] = useState('5');
  const [result, setResult] = useState<number | null>(null);
  const [constants, setConstants] = useState<{ PI: number; E: number } | null>(null);

  // CustomButton state
  const [buttonText, setButtonText] = useState('Press Me!');
  const [buttonColor, setButtonColor] = useState('#007AFF');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonCornerRadius, setButtonCornerRadius] = useState(8);
  const [pressCount, setPressCount] = useState(0);

  // Calculator operations
  const performOperation = async (operation: 'add' | 'subtract' | 'multiply' | 'divide') => {
    try {
      const a = parseFloat(num1);
      const b = parseFloat(num2);

      if (isNaN(a) || isNaN(b)) {
        Alert.alert('错误', '请输入有效的数字');
        return;
      }

      let res: number;
      switch (operation) {
        case 'add':
          res = await NativeCalculator.add(a, b);
          break;
        case 'subtract':
          res = await NativeCalculator.subtract(a, b);
          break;
        case 'multiply':
          res = await NativeCalculator.multiply(a, b);
          break;
        case 'divide':
          res = await NativeCalculator.divide(a, b);
          break;
      }
      setResult(res);
    } catch (error: any) {
      Alert.alert('错误', error.message || '计算失败');
    }
  };

  const getCalculatorConstants = () => {
    try {
      const consts = NativeCalculator.getConstants();
      setConstants(consts);
    } catch (error: any) {
      Alert.alert('错误', error.message || '获取常量失败');
    }
  };

  const handleCustomButtonPress = (event: any) => {
    const timestamp = event.nativeEvent.timestamp;
    setPressCount(prev => prev + 1);
    Alert.alert(
      '按钮点击',
      `按钮被点击了！\n点击次数: ${pressCount + 1}\n时间戳: ${new Date(timestamp).toLocaleString()}`
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>🧮 Turbo Native Module</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Calculator Module</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            value={num1}
            onChangeText={setNum1}
            keyboardType="numeric"
            placeholder="数字 1"
            placeholderTextColor={colors.placeholder}
          />
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            value={num2}
            onChangeText={setNum2}
            keyboardType="numeric"
            placeholder="数字 2"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.calcButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => performOperation('add')}
          >
            <Text style={styles.calcButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.calcButton, { backgroundColor: '#FF9800' }]}
            onPress={() => performOperation('subtract')}
          >
            <Text style={styles.calcButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.calcButton, { backgroundColor: '#2196F3' }]}
            onPress={() => performOperation('multiply')}
          >
            <Text style={styles.calcButtonText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.calcButton, { backgroundColor: '#F44336' }]}
            onPress={() => performOperation('divide')}
          >
            <Text style={styles.calcButtonText}>÷</Text>
          </TouchableOpacity>
        </View>

        {result !== null && (
          <View style={[styles.resultBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>结果:</Text>
            <Text style={[styles.resultValue, { color: colors.primary }]}>{result}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.constantsButton, { backgroundColor: '#9C27B0' }]}
          onPress={getCalculatorConstants}
        >
          <Text style={styles.constantsButtonText}>获取数学常量</Text>
        </TouchableOpacity>

        {constants && (
          <View style={[styles.constantsBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.constantText, { color: colors.text }]}>π (PI) = {constants.PI}</Text>
            <Text style={[styles.constantText, { color: colors.text }]}>e (E) = {constants.E}</Text>
          </View>
        )}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>🎨 Fabric Native Component</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Custom Button Component</Text>

        <View style={styles.customButtonContainer}>
          <CustomButton
            style={styles.customButton}
            text={buttonText}
            color={buttonColor}
            disabled={buttonDisabled}
            cornerRadius={buttonCornerRadius}
            onPress={handleCustomButtonPress}
          />
        </View>

        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: colors.text }]}>按钮文本:</Text>
          <TextInput
            style={[styles.controlInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            value={buttonText}
            onChangeText={setButtonText}
            placeholder="输入按钮文本"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: colors.text }]}>按钮颜色:</Text>
          <View style={styles.colorRow}>
            {['#007AFF', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'].map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  buttonColor === color && { borderColor: colors.text, borderWidth: 3 },
                ]}
                onPress={() => setButtonColor(color)}
              />
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: colors.text }]}>圆角半径: {buttonCornerRadius}px</Text>
          <View style={styles.radiusRow}>
            {[0, 4, 8, 16, 24].map(radius => (
              <TouchableOpacity
                key={radius}
                style={[
                  styles.radiusButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  buttonCornerRadius === radius && { borderColor: colors.primary, backgroundColor: colors.primary + '20' },
                ]}
                onPress={() => setButtonCornerRadius(radius)}
              >
                <Text style={[styles.radiusButtonText, { color: colors.text }]}>{radius}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: colors.warning }]}
          onPress={() => setButtonDisabled(!buttonDisabled)}
        >
          <Text style={styles.toggleButtonText}>
            {buttonDisabled ? '启用按钮' : '禁用按钮'}
          </Text>
        </TouchableOpacity>

        <View style={[styles.statsBox, { backgroundColor: colors.success + '20' }]}>
          <Text style={[styles.statsText, { color: colors.success }]}>总点击次数: {pressCount}</Text>
        </View>
      </View>

      <View style={[styles.infoBox, { backgroundColor: colors.primary + '20', borderLeftColor: colors.primary }]}>
        <Text style={[styles.infoTitle, { color: colors.primary }]}>ℹ️ 关于 Codegen</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          这个示例展示了 React Native 0.85 (New Architecture) 中的 Codegen 功能：
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • <Text style={[styles.infoBold, { color: colors.primary }]}>Turbo Native Module</Text>: 高性能的原生模块，使用 JSI 直接通信
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • <Text style={[styles.infoBold, { color: colors.primary }]}>Fabric Native Component</Text>: 新架构的原生 UI 组件
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • <Text style={[styles.infoBold, { color: colors.primary }]}>类型安全</Text>: TypeScript 规范自动生成原生代码接口
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • <Text style={[styles.infoBold, { color: colors.primary }]}>平台支持</Text>: {Platform.OS === 'ios' ? 'iOS' : 'Android'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  calcButton: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resultBox: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
  },
  resultLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  constantsButton: {
    backgroundColor: '#9C27B0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  constantsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  constantsBox: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  constantText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  divider: {
    height: 8,
  },
  customButtonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  customButton: {
    width: 250,
    height: 60,
  },
  controlGroup: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  controlInput: {
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 10,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: '#333',
  },
  radiusRow: {
    flexDirection: 'row',
    gap: 10,
  },
  radiusButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  radiusButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  radiusButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsBox: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoBox: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: '600',
  },
});
