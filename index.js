/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

// 选择一个导航示例（取消注释你想使用的）:
// import App from './App';              // 示例 1: Bottom Tabs + Stack Navigator
// import App from './AppWithTopTabs';   // 示例 2: Material Top Tabs Navigator
import App from './src/AppCombined';      // 示例 3: 组合导航 (Bottom + Top + Stack) ⭐

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
