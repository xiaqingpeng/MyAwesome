import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';

type ExampleCard = {
  title: string;
  subtitle: string;
  file: string;
  code: string;
  notes: string[];
};

const examples: ExampleCard[] = [
  {
    title: 'Turbo Native Module Spec',
    subtitle: '用 TypeScript 定义跨端原生模块接口，Codegen 会生成 Android/iOS 桥接基类。',
    file: 'src/specs/NativeCalculator.ts',
    code: `import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): Promise<number>;
  divide(a: number, b: number): Promise<number>;
  getConstants(): { PI: number; E: number };
}

export default TurboModuleRegistry.getEnforcing<Spec>('Calculator');`,
    notes: [
      'Spec 文件是新架构模块的单一类型入口。',
      '模块名 Calculator 要和原生实现导出的名称保持一致。',
    ],
  },
  {
    title: 'Fabric Native Component Spec',
    subtitle: '用 codegenNativeComponent 声明原生 UI 组件的 props 和事件。',
    file: 'src/specs/CustomButtonNativeComponent.ts',
    code: `import type { ViewProps } from 'react-native';
import type {
  BubblingEventHandler,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type OnPressEvent = Readonly<{ timestamp: number }>;

interface NativeProps extends ViewProps {
  text?: WithDefault<string, ''>;
  color?: WithDefault<string, '#007AFF'>;
  cornerRadius?: WithDefault<Int32, 8>;
  onPress?: BubblingEventHandler<OnPressEvent>;
}

export default codegenNativeComponent<NativeProps>('CustomButton');`,
    notes: [
      'Fabric 组件通过类型定义获得原生 props 校验。',
      '事件 payload 也会被 Codegen 转成原生侧可用的结构。',
    ],
  },
  {
    title: 'Android Turbo Module',
    subtitle: 'Kotlin 实现继承 Codegen 生成的 NativeCalculatorSpec。',
    file: 'android/app/src/main/java/com/myawesome/CalculatorModule.kt',
    code: `class CalculatorModule(reactContext: ReactApplicationContext) :
    NativeCalculatorSpec(reactContext) {

    companion object {
        const val NAME = "Calculator"
    }

    override fun getName(): String = NAME

    override fun add(a: Double, b: Double, promise: Promise) {
        promise.resolve(a + b)
    }

    override fun getTypedExportedConstants(): Map<String, Any> {
        return mapOf("PI" to Math.PI, "E" to Math.E)
    }
}`,
    notes: [
      '继承生成类后，方法签名会和 TS Spec 自动对齐。',
      'getName 返回值必须匹配 TurboModuleRegistry 里的模块名。',
    ],
  },
  {
    title: 'iOS Turbo Module',
    subtitle: 'Objective-C++ 实现导出方法，并返回 Codegen 生成的 JSI TurboModule。',
    file: 'ios/MyAwesome/Calculator.mm',
    code: `RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(add:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  resolve(@(a + b));
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}`,
    notes: [
      'iOS 侧通过 getTurboModule 接入 JSI。',
      '方法名和参数顺序要与 TS Spec 保持一致。',
    ],
  },
  {
    title: 'Codegen 配置',
    subtitle: 'package.json 中声明 Codegen 名称、类型、Spec 目录和 Android 包名。',
    file: 'package.json',
    code: `"codegenConfig": {
  "name": "MyAwesomeSpec",
  "type": "all",
  "jsSrcsDir": "src/specs",
  "android": {
    "javaPackageName": "com.myawesome.specs"
  },
  "ios": {}
}`,
    notes: [
      'type: all 表示同时生成 Turbo Module 和 Fabric Component。',
      'jsSrcsDir 指向所有 Native* Spec 文件所在目录。',
    ],
  },
];

export default function NewArchitectureExamplesScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.kicker, { color: colors.primary }]}>React Native New Architecture</Text>
          <Text style={[styles.title, { color: colors.text }]}>RN 新架构代码示例</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            这个页面汇总当前项目里的 Turbo Native Module、Fabric Native Component 和 Codegen 配置片段。
          </Text>
        </View>

        {examples.map((example) => (
          <View key={example.title} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{example.title}</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{example.subtitle}</Text>
            <Text style={[styles.filePath, { color: colors.primary }]}>{example.file}</Text>

            <View style={[styles.codeBlock, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.codeText, { color: colors.text }]}>{example.code}</Text>
            </View>

            <View style={styles.noteList}>
              {example.notes.map((note) => (
                <Text key={note} style={[styles.noteText, { color: colors.textSecondary }]}>
                  • {note}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
    marginBottom: 10,
  },
  filePath: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
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
  noteList: {
    marginTop: 12,
    gap: 6,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
