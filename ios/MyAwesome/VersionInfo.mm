//
//  VersionInfo.mm
//  MyAwesome
//

#import "VersionInfo.h"

@implementation VersionInfo

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getVersionName:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSString *version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  resolve(version ?: @"");
}

RCT_EXPORT_METHOD(getBuildNumber:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSString *buildNumber = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
  resolve(buildNumber ?: @"");
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeVersionInfoSpecJSI>(params);
}

@end
