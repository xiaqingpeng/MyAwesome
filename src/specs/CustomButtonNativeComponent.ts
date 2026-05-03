/**
 * Fabric Native Component 示例
 * 一个自定义按钮组件
 */

import type { ViewProps } from 'react-native';
import type {
  BubblingEventHandler,
  Int32,
  Double,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// 事件数据类型
export type OnPressEvent = Readonly<{
  timestamp: Double;
}>;

export interface NativeProps extends ViewProps {
  // 按钮文本
  text?: WithDefault<string, ''>;
  
  // 按钮颜色
  color?: WithDefault<string, '#007AFF'>;
  
  // 是否禁用
  disabled?: WithDefault<boolean, false>;
  
  // 圆角半径
  cornerRadius?: WithDefault<Int32, 8>;
  
  // 点击事件
  onPress?: BubblingEventHandler<OnPressEvent>;
}

export default codegenNativeComponent<NativeProps>('CustomButton');
