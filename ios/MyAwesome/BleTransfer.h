#import <CoreBluetooth/CoreBluetooth.h>
#import <Foundation/Foundation.h>
#import <MyAwesomeSpec/MyAwesomeSpec.h>

NS_ASSUME_NONNULL_BEGIN

@interface BleTransfer : NSObject <NativeBleTransferSpec, CBCentralManagerDelegate, CBPeripheralDelegate>

@end

NS_ASSUME_NONNULL_END
