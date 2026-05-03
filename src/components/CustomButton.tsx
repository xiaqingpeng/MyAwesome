/**
 * CustomButton - Fabric Native Component 包装器
 * 提供类型安全的 TypeScript 接口
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import CustomButtonNativeComponent from '../specs/CustomButtonNativeComponent';

export interface CustomButtonProps {
  text?: string;
  color?: string;
  disabled?: boolean;
  cornerRadius?: number;
  onPress?: (event: { nativeEvent: { timestamp: number } }) => void;
  style?: ViewStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text = '',
  color = '#007AFF',
  disabled = false,
  cornerRadius = 8,
  onPress,
  style,
}) => {
  return (
    <CustomButtonNativeComponent
      text={text}
      color={color}
      disabled={disabled}
      cornerRadius={cornerRadius}
      onPress={onPress}
      style={[{ height: 44 }, style]}
    />
  );
};
