import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getCacheSize(): Promise<number>;
  clearCache(): Promise<number>;
}

export default TurboModuleRegistry.get<Spec>('CacheManager');
