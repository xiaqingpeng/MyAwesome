/**
 * Turbo Native Module 示例
 * 一个简单的计算器模块
 */

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // 加法
  add(a: number, b: number): Promise<number>;
  
  // 减法
  subtract(a: number, b: number): Promise<number>;
  
  // 乘法
  multiply(a: number, b: number): Promise<number>;
  
  // 除法
  divide(a: number, b: number): Promise<number>;
  
  // 获取常量
  getConstants(): {
    PI: number;
    E: number;
  };
}

export default TurboModuleRegistry.getEnforcing<Spec>('Calculator');
