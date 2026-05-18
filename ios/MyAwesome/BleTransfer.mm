#import "BleTransfer.h"

@interface BleTransfer ()

@property (nonatomic, strong) CBCentralManager *centralManager;
@property (nonatomic, strong) NSMutableDictionary<NSString *, CBPeripheral *> *peripherals;
@property (nonatomic, strong) NSMutableDictionary<NSString *, CBPeripheral *> *connectedPeripherals;
@property (nonatomic, copy, nullable) RCTPromiseResolveBlock scanResolve;
@property (nonatomic, copy, nullable) RCTPromiseRejectBlock scanReject;
@property (nonatomic, copy, nullable) RCTPromiseResolveBlock connectResolve;
@property (nonatomic, copy, nullable) RCTPromiseRejectBlock connectReject;
@property (nonatomic, strong) NSMutableDictionary<NSString *, RCTPromiseResolveBlock> *readResolves;
@property (nonatomic, strong) NSMutableDictionary<NSString *, RCTPromiseRejectBlock> *readRejects;
@property (nonatomic, strong, nullable) CBUUID *scanServiceUUID;
@property (nonatomic, assign) NSUInteger pendingCharacteristicDiscoveries;

@end

@implementation BleTransfer

RCT_EXPORT_MODULE()

- (instancetype)init
{
  if (self = [super init]) {
    _peripherals = [NSMutableDictionary dictionary];
    _connectedPeripherals = [NSMutableDictionary dictionary];
    _readResolves = [NSMutableDictionary dictionary];
    _readRejects = [NSMutableDictionary dictionary];
    _centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:dispatch_get_main_queue()];
  }
  return self;
}

- (void)isBluetoothReady:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject
{
  resolve(@(self.centralManager.state == CBManagerStatePoweredOn));
}

- (void)startScan:(NSString *)serviceUuid
          resolve:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject
{
  if (self.centralManager.state != CBManagerStatePoweredOn) {
    reject(@"BLE_POWERED_OFF", @"Bluetooth is not powered on", nil);
    return;
  }

  CBUUID *uuid = [CBUUID UUIDWithString:serviceUuid];
  if (uuid == nil) {
    reject(@"BLE_INVALID_UUID", [NSString stringWithFormat:@"Invalid UUID: %@", serviceUuid], nil);
    return;
  }

  [self.centralManager stopScan];
  self.scanResolve = resolve;
  self.scanReject = reject;
  self.scanServiceUUID = uuid;
  [self.centralManager scanForPeripheralsWithServices:@[uuid] options:nil];

  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(15 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (self.scanResolve != nil) {
      [self.centralManager stopScan];
      self.scanReject(@"BLE_SCAN_TIMEOUT", [NSString stringWithFormat:@"No BLE device found for service %@", serviceUuid], nil);
      self.scanResolve = nil;
      self.scanReject = nil;
    }
  });
}

- (void)stopScan:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
  [self.centralManager stopScan];
  self.scanResolve = nil;
  self.scanReject = nil;
  resolve(nil);
}

- (void)connect:(NSString *)deviceId
        resolve:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject
{
  if (self.centralManager.state != CBManagerStatePoweredOn) {
    reject(@"BLE_POWERED_OFF", @"Bluetooth is not powered on", nil);
    return;
  }

  CBPeripheral *peripheral = [self peripheralForId:deviceId];
  if (peripheral == nil) {
    reject(@"BLE_DEVICE_NOT_FOUND", @"Scan before connecting, or pass a discovered peripheral identifier", nil);
    return;
  }

  if ([self peripheralIsReadyForTransfer:peripheral]) {
    self.connectedPeripherals[peripheral.identifier.UUIDString] = peripheral;
    if (peripheral.name != nil) {
      self.connectedPeripherals[peripheral.name] = peripheral;
    }
    resolve(@YES);
    return;
  }

  self.connectResolve = resolve;
  self.connectReject = reject;
  self.pendingCharacteristicDiscoveries = 0;
  peripheral.delegate = self;

  if (peripheral.state == CBPeripheralStateConnected) {
    [peripheral discoverServices:nil];
    return;
  }

  [self.centralManager connectPeripheral:peripheral options:nil];
}

- (void)disconnect:(NSString *)deviceId
           resolve:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject
{
  CBPeripheral *peripheral = [self peripheralForId:deviceId];
  if (peripheral != nil) {
    [self.centralManager cancelPeripheralConnection:peripheral];
    [self.connectedPeripherals removeObjectForKey:peripheral.identifier.UUIDString];
    if (peripheral.name != nil) {
      [self.connectedPeripherals removeObjectForKey:peripheral.name];
    }
  }
  resolve(nil);
}

- (void)write:(NSString *)deviceId
  serviceUuid:(NSString *)serviceUuid
characteristicUuid:(NSString *)characteristicUuid
base64Payload:(NSString *)base64Payload
      resolve:(RCTPromiseResolveBlock)resolve
       reject:(RCTPromiseRejectBlock)reject
{
  CBPeripheral *peripheral = [self connectedPeripheralForId:deviceId];
  if (peripheral == nil) {
    reject(@"BLE_NOT_CONNECTED", @"Connect to the BLE device before writing", nil);
    return;
  }

  CBCharacteristic *characteristic = [self characteristicForPeripheral:peripheral
                                                           serviceUuid:serviceUuid
                                                    characteristicUuid:characteristicUuid
                                                                reject:reject];
  if (characteristic == nil) {
    return;
  }

  NSData *payload = [[NSData alloc] initWithBase64EncodedString:base64Payload options:0];
  if (payload == nil) {
    reject(@"BLE_INVALID_PAYLOAD", @"Payload must be Base64 encoded", nil);
    return;
  }

  CBCharacteristicWriteType writeType =
      (characteristic.properties & CBCharacteristicPropertyWriteWithoutResponse)
      ? CBCharacteristicWriteWithoutResponse
      : CBCharacteristicWriteWithResponse;
  [peripheral writeValue:payload forCharacteristic:characteristic type:writeType];
  resolve(@YES);
}

- (void)read:(NSString *)deviceId
 serviceUuid:(NSString *)serviceUuid
characteristicUuid:(NSString *)characteristicUuid
     resolve:(RCTPromiseResolveBlock)resolve
      reject:(RCTPromiseRejectBlock)reject
{
  CBPeripheral *peripheral = [self connectedPeripheralForId:deviceId];
  if (peripheral == nil) {
    reject(@"BLE_NOT_CONNECTED", @"Connect to the BLE device before reading", nil);
    return;
  }

  CBCharacteristic *characteristic = [self characteristicForPeripheral:peripheral
                                                           serviceUuid:serviceUuid
                                                    characteristicUuid:characteristicUuid
                                                                reject:reject];
  if (characteristic == nil) {
    return;
  }

  NSString *key = characteristic.UUID.UUIDString.lowercaseString;
  self.readResolves[key] = resolve;
  self.readRejects[key] = reject;
  [peripheral readValueForCharacteristic:characteristic];
}

- (void)centralManagerDidUpdateState:(CBCentralManager *)central
{
  if (central.state != CBManagerStatePoweredOn && self.scanReject != nil) {
    self.scanReject(@"BLE_POWERED_OFF", @"Bluetooth is not powered on", nil);
    self.scanResolve = nil;
    self.scanReject = nil;
  }
}

- (void)centralManager:(CBCentralManager *)central
 didDiscoverPeripheral:(CBPeripheral *)peripheral
     advertisementData:(NSDictionary<NSString *, id> *)advertisementData
                  RSSI:(NSNumber *)RSSI
{
  NSString *identifier = peripheral.identifier.UUIDString;
  self.peripherals[identifier] = peripheral;
  if (peripheral.name != nil) {
    self.peripherals[peripheral.name] = peripheral;
  }

  if (self.scanResolve != nil) {
    [central stopScan];
    self.scanResolve(identifier);
    self.scanResolve = nil;
    self.scanReject = nil;
  }
}

- (void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral
{
  self.connectedPeripherals[peripheral.identifier.UUIDString] = peripheral;
  if (peripheral.name != nil) {
    self.connectedPeripherals[peripheral.name] = peripheral;
  }
  [peripheral discoverServices:nil];
}

- (void)centralManager:(CBCentralManager *)central
didFailToConnectPeripheral:(CBPeripheral *)peripheral
                 error:(NSError *)error
{
  if (self.connectReject != nil) {
    self.connectReject(@"BLE_CONNECT_FAILED", @"BLE connection failed", error);
    self.connectResolve = nil;
    self.connectReject = nil;
  }
}

- (void)peripheral:(CBPeripheral *)peripheral didDiscoverServices:(NSError *)error
{
  if (error != nil) {
    if (self.connectReject != nil) {
      self.connectReject(@"BLE_SERVICE_DISCOVERY_FAILED", @"Service discovery failed", error);
      self.connectResolve = nil;
      self.connectReject = nil;
    }
    return;
  }

  for (CBService *service in peripheral.services ?: @[]) {
    self.pendingCharacteristicDiscoveries += 1;
    [peripheral discoverCharacteristics:nil forService:service];
  }

  if ((peripheral.services ?: @[]).count == 0 && self.connectResolve != nil) {
    self.connectResolve(@YES);
    self.connectResolve = nil;
    self.connectReject = nil;
  }
}

- (void)peripheral:(CBPeripheral *)peripheral
didDiscoverCharacteristicsForService:(CBService *)service
             error:(NSError *)error
{
  if (error != nil) {
    if (self.connectReject != nil) {
      self.connectReject(@"BLE_CHARACTERISTIC_DISCOVERY_FAILED", @"Characteristic discovery failed", error);
      self.connectResolve = nil;
      self.connectReject = nil;
    }
    self.pendingCharacteristicDiscoveries = 0;
    return;
  }

  if (self.pendingCharacteristicDiscoveries > 0) {
    self.pendingCharacteristicDiscoveries -= 1;
  }

  if (self.pendingCharacteristicDiscoveries == 0 && self.connectResolve != nil) {
    self.connectResolve(@YES);
    self.connectResolve = nil;
    self.connectReject = nil;
  }
}

- (void)peripheral:(CBPeripheral *)peripheral
didUpdateValueForCharacteristic:(CBCharacteristic *)characteristic
             error:(NSError *)error
{
  NSString *key = characteristic.UUID.UUIDString.lowercaseString;
  RCTPromiseResolveBlock resolve = self.readResolves[key];
  RCTPromiseRejectBlock reject = self.readRejects[key];
  if (resolve == nil) {
    return;
  }

  [self.readResolves removeObjectForKey:key];
  [self.readRejects removeObjectForKey:key];

  if (error != nil) {
    reject(@"BLE_READ_FAILED", @"BLE read failed", error);
    return;
  }

  resolve([characteristic.value base64EncodedStringWithOptions:0] ?: @"");
}

- (CBPeripheral *)peripheralForId:(NSString *)deviceId
{
  return self.peripherals[deviceId];
}

- (CBPeripheral *)connectedPeripheralForId:(NSString *)deviceId
{
  return self.connectedPeripherals[deviceId];
}

- (CBCharacteristic *)characteristicForPeripheral:(CBPeripheral *)peripheral
                                      serviceUuid:(NSString *)serviceUuid
                               characteristicUuid:(NSString *)characteristicUuid
                                           reject:(RCTPromiseRejectBlock)reject
{
  CBUUID *serviceId = [CBUUID UUIDWithString:serviceUuid];
  CBUUID *characteristicId = [CBUUID UUIDWithString:characteristicUuid];

  for (CBService *service in peripheral.services ?: @[]) {
    if ([service.UUID isEqual:serviceId]) {
      for (CBCharacteristic *characteristic in service.characteristics ?: @[]) {
        if ([characteristic.UUID isEqual:characteristicId]) {
          return characteristic;
        }
      }
      reject(@"BLE_CHARACTERISTIC_NOT_FOUND", [NSString stringWithFormat:@"Characteristic %@ was not discovered", characteristicUuid], nil);
      return nil;
    }
  }

  reject(@"BLE_SERVICE_NOT_FOUND", [NSString stringWithFormat:@"Service %@ was not discovered", serviceUuid], nil);
  return nil;
}

- (BOOL)peripheralIsReadyForTransfer:(CBPeripheral *)peripheral
{
  NSArray<CBService *> *services = peripheral.services ?: @[];
  if (services.count == 0) {
    return NO;
  }

  for (CBService *service in services) {
    if (service.characteristics == nil) {
      return NO;
    }
  }

  return YES;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeBleTransferSpecJSI>(params);
}

@end
