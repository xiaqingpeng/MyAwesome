//
//  Calculator.mm
//  MyAwesome
//
//  Turbo Native Module 实现
//

#import "Calculator.h"

@implementation Calculator

RCT_EXPORT_MODULE()

// 加法
RCT_EXPORT_METHOD(add:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSNumber *result = @(a + b);
  resolve(result);
}

// 减法
RCT_EXPORT_METHOD(subtract:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSNumber *result = @(a - b);
  resolve(result);
}

// 乘法
RCT_EXPORT_METHOD(multiply:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSNumber *result = @(a * b);
  resolve(result);
}

// 除法
RCT_EXPORT_METHOD(divide:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  if (b == 0) {
    reject(@"DIVISION_BY_ZERO", @"Cannot divide by zero", nil);
    return;
  }
  NSNumber *result = @(a / b);
  resolve(result);
}

// 导出常量
- (NSDictionary *)getConstants {
  return @{
    @"PI": @(M_PI),
    @"E": @(M_E)
  };
}

// Turbo Module 协议方法
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}

@end
