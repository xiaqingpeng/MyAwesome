//
//  CacheManager.mm
//  MyAwesome
//

#import "CacheManager.h"

@implementation CacheManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getCacheSize:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  @try {
    resolve(@([self cacheSize]));
  } @catch (NSException *exception) {
    reject(@"CACHE_SIZE_ERROR", @"Failed to get cache size", nil);
  }
}

RCT_EXPORT_METHOD(clearCache:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    for (NSString *path in [self cacheDirectories]) {
      NSArray<NSString *> *children = [fileManager contentsOfDirectoryAtPath:path error:nil];
      for (NSString *child in children) {
        NSString *childPath = [path stringByAppendingPathComponent:child];
        [fileManager removeItemAtPath:childPath error:nil];
      }
    }
    resolve(@([self cacheSize]));
  } @catch (NSException *exception) {
    reject(@"CACHE_CLEAR_ERROR", @"Failed to clear cache", nil);
  }
}

- (NSArray<NSString *> *)cacheDirectories
{
  NSMutableArray<NSString *> *directories = [NSMutableArray array];
  NSArray<NSString *> *cachePaths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
  NSString *temporaryPath = NSTemporaryDirectory();

  if (cachePaths.firstObject != nil) {
    [directories addObject:cachePaths.firstObject];
  }

  if (temporaryPath != nil) {
    [directories addObject:temporaryPath];
  }

  return directories;
}

- (double)cacheSize
{
  double totalSize = 0;
  NSFileManager *fileManager = [NSFileManager defaultManager];

  for (NSString *path in [self cacheDirectories]) {
    totalSize += [self sizeOfPath:path fileManager:fileManager];
  }

  return totalSize;
}

- (double)sizeOfPath:(NSString *)path fileManager:(NSFileManager *)fileManager
{
  BOOL isDirectory = NO;
  BOOL exists = [fileManager fileExistsAtPath:path isDirectory:&isDirectory];

  if (!exists) {
    return 0;
  }

  if (!isDirectory) {
    NSDictionary<NSFileAttributeKey, id> *attributes = [fileManager attributesOfItemAtPath:path error:nil];
    return [attributes[NSFileSize] doubleValue];
  }

  double totalSize = 0;
  NSDirectoryEnumerator<NSString *> *enumerator = [fileManager enumeratorAtPath:path];
  for (NSString *item in enumerator) {
    NSString *itemPath = [path stringByAppendingPathComponent:item];
    BOOL itemIsDirectory = NO;
    [fileManager fileExistsAtPath:itemPath isDirectory:&itemIsDirectory];
    if (!itemIsDirectory) {
      NSDictionary<NSFileAttributeKey, id> *attributes = [fileManager attributesOfItemAtPath:itemPath error:nil];
      totalSize += [attributes[NSFileSize] doubleValue];
    }
  }

  return totalSize;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeCacheManagerSpecJSI>(params);
}

@end
