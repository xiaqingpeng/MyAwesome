import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getVersionName(): Promise<string>;
  getBuildNumber(): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('VersionInfo');
