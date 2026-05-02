# MyAwesome - React Native Navigation 

这是一个展示 React Native 导航功能的示例项目，使用 [`@react-native-community/cli`](https://github.com/react-native-community/cli) 创建。

## ✨ 项目特性

### 🧭 导航系统
- **Bottom Tab Navigator** - 底部标签导航，支持主要功能切换
- **Material Top Tabs** - 顶部滑动标签，用于内容分类浏览
- **Stack Navigator** - 堆栈导航，实现页面层级跳转
- **组合导航** - 三种导航器的完美结合使用

### 🎨 UI 组件
- **SVG 图标系统** - 使用 `react-native-svg` 实现可缩放矢量图标
  - Home 图标（房子）
  - Discover 图标（指南针）
  - Settings 图标（齿轮）
  - 通知图标（铃铛、心形、消息等）
- **自定义 Tab Bar** - 带有选中/未选中状态的图标切换
- **响应式设计** - 适配不同屏幕尺寸

### 📱 功能页面
- **Home** - 主页，展示欢迎信息和导航示例
- **Discover** - 发现页面，包含 Feed、Explore、Notifications 三个子标签
  - Feed - 内容流
  - Explore - 探索网格布局
  - Notifications - 通知列表（带 SVG 图标）
- **Profile** - 个人资料页面
- **Settings** - 设置页面

### 🛠 技术栈
- React Native (最新版本)
- TypeScript - 类型安全
- React Navigation v6 - 导航库
- react-native-svg - SVG 图标支持
- react-native-safe-area-context - 安全区域适配

## 📂 项目结构

```
MyAwesome/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── TabBarIcon.tsx
│   │   └── TabBarIconSvg.tsx
│   ├── navigation/          # 导航配置
│   │   ├── TopTabsNavigator.tsx
│   │   └── types.ts
│   ├── screens/            # 页面组件
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── FeedScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   └── NotificationsScreen.tsx
│   ├── AppCombined.tsx     # 组合导航示例 ⭐
│   └── AppWithTopTabs.tsx  # 顶部标签示例
├── android/                # Android 原生代码
├── ios/                    # iOS 原生代码
└── index.js               # 应用入口
```

## 🚀 快速开始

### 前置要求

确保已完成 [React Native 环境搭建](https://reactnative.dev/docs/set-up-your-environment)。

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 Yarn
yarn install
```

### iOS 额外步骤

```bash
# 安装 Ruby 依赖（首次运行）
bundle install

# 安装 CocoaPods 依赖
cd ios && bundle exec pod install && cd ..
```

### 启动开发服务器

```bash
# 使用 npm
npm start

# 或使用 Yarn
yarn start
```

### 运行应用

#### Android

```bash
npm run android
# 或
yarn android
```

#### iOS

```bash
npm run ios
# 或
yarn ios
```

## 🎯 导航示例切换

在 `index.js` 中可以切换不同的导航示例：

```javascript
// 示例 1: Bottom Tabs + Stack Navigator
// import App from './App';

// 示例 2: Material Top Tabs Navigator
// import App from './AppWithTopTabs';

// 示例 3: 组合导航 (Bottom + Top + Stack) ⭐ 当前使用
import App from './src/AppCombined';
```

## 🎨 自定义 SVG 图标

项目使用 `react-native-svg` 实现自定义图标。查看 `src/components/TabBarIconSvg.tsx` 了解如何添加新图标：

```typescript
const iconPaths = {
  home: {
    filled: '...',    // 选中状态的 SVG 路径
    outline: '...',   // 未选中状态的 SVG 路径
  },
  // 添加更多图标...
};
```

## 🔧 常见问题

### Android NDK 错误

如果遇到 NDK 版本问题，检查 `android/build.gradle` 中的 `ndkVersion` 是否与本地安装的版本匹配：

```groovy
ext {
    ndkVersion = "30.0.14904198"  // 确保与本地 NDK 版本一致
}
```

### Metro 缓存问题

```bash
# 清除缓存并重启
npm start -- --reset-cache
```

### Android 构建清理

```bash
cd android && ./gradlew clean && cd ..
```

## 📖 学习资源

- [React Native 官方文档](https://reactnative.dev)
- [React Navigation 文档](https://reactnavigation.org)
- [react-native-svg 文档](https://github.com/software-mansion/react-native-svg)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

---

**Happy Coding! 🎉**
