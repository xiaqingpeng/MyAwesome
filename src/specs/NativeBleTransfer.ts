import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isBluetoothReady(): Promise<boolean>;
  startScan(serviceUuid: string): Promise<string>;
  stopScan(): Promise<void>;
  connect(deviceId: string): Promise<boolean>;
  disconnect(deviceId: string): Promise<void>;
  write(
    deviceId: string,
    serviceUuid: string,
    characteristicUuid: string,
    base64Payload: string,
  ): Promise<boolean>;
  read(
    deviceId: string,
    serviceUuid: string,
    characteristicUuid: string,
  ): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('BleTransfer');
