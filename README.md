# MyAwesome - React Native 全栈示例

这是一个功能完整的 React Native 示例项目，展示了导航、状态管理、网络请求等核心功能，使用 [`@react-native-community/cli`](https://github.com/react-native-community/cli) 创建。

## ✨ 项目特性

### 🧭 导航系统
- **Bottom Tab Navigator** - 底部标签导航，支持主要功能切换
- **Material Top Tabs** - 顶部滑动标签，用于内容分类浏览
- **Stack Navigator** - 堆栈导航，实现页面层级跳转
- **Drawer Navigator** - 抽屉导航，侧边栏菜单（可选）
- **组合导航** - 多种导航器的完美结合使用

### 🌐 网络请求 & 状态管理
- **Jotai** - 轻量级原子化状态管理
  - 全局状态管理
  - 异步状态处理
  - 请求状态跟踪（loading、error、data）
- **Axios** - HTTP 客户端
  - 请求/响应拦截器
  - 自动错误处理
  - 请求取消支持
  - 超时配置
- **网络请求示例**
  - GET 请求（用户、文章、评论、待办事项）
  - POST 请求（创建数据）
  - 请求取消功能
  - 实时状态显示
  - 错误处理演示

### 🎨 UI 组件
- **SVG 图标系统** - 使用 `react-native-svg` 实现可缩放矢量图标
  - Home 图标（房子）
  - Discover 图标（指南针）
  - Network 图标（网络节点）
  - Settings 图标（齿轮）
  - 通知图标（铃铛、心形、消息、用户、下载）
  - 功能图标（用户列表、文章、评论、待办、发送、刷新、取消、删除、状态等）
- **自定义 Tab Bar** - 带有选中/未选中状态的图标切换
- **现代卡片设计** - 渐变背景、阴影效果、圆角卡片
- **响应式设计** - 适配不同屏幕尺寸

### 📱 功能页面
- **Home** - 我的，展示欢迎信息和导航示例
- **Discover** - 发现页面，包含 Feed、Explore、Notifications 三个子标签
  - Feed - 内容流
  - Explore - 探索网格布局
  - Notifications - 通知列表（带 SVG 图标）
- **Network** - 网络请求演示页面 ⭐ 新增
  - 多种 API 请求示例
  - 实时状态显示
  - 数据列表展示
  - 错误处理演示
  - 请求取消功能
- **Profile** - 个人资料页面
- **Settings** - 设置页面
- **Drawer Settings** - 抽屉设置页，支持读取/清空当前 App 缓存，并动态展示真实应用版本号

### 🛠 技术栈
- **React Native** - 跨平台移动应用框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **React Navigation v6** - 强大的导航库
- **Jotai** - 原子化状态管理
- **Axios** - Promise 基础的 HTTP 客户端
- **react-native-svg** - SVG 图标支持
- **react-native-safe-area-context** - 安全区域适配

## 📂 项目结构

```
MyAwesome/
├── src/                                    # 源代码目录
│   ├── components/                         # 可复用组件
│   │   ├── icons/                          # 图标组件目录
│   │   ├── CustomButton.tsx                # 自定义按钮 React 包装组件
│   │   ├── TabBarIcon.tsx                  # Tab 图标组件（旧版）
│   │   └── TabBarIconSvg.tsx               # SVG 图标组件 ⭐
│   │
│   ├── navigation/                         # 导航配置
│   │   ├── DrawerNavigatorExample.tsx      # 抽屉导航示例
│   │   ├── TabNavigator.example.tsx        # Tab 导航示例
│   │   ├── TopTabsNavigator.tsx            # 顶部标签导航
│   │   └── types.ts                        # 导航类型定义
│   │
│   ├── screens/                            # 页面组件
│   │   ├── CodegenDemoScreen.tsx           # Codegen 演示页面 ⭐
│   │   ├── DrawerExampleScreen.tsx         # 抽屉示例页面
│   │   ├── ExploreScreen.tsx               # 探索页面
│   │   ├── FeedScreen.tsx                  # Feed 页面
│   │   ├── HomeScreen.tsx                  # 首页
│   │   ├── NetworkDemoScreen.tsx           # 网络请求演示 ⭐
│   │   ├── NotificationsScreen.tsx         # 通知页面
│   │   ├── ProfileScreen.tsx               # 个人资料页面
│   │   └── SettingsScreen.tsx              # 设置页面
│   │
│   ├── services/                           # 服务层
│   │   └── api.ts                          # Axios 配置和 API 方法
│   │
│   ├── specs/                              # Codegen TypeScript 规范 ⭐
│   │   ├── CustomButtonNativeComponent.ts  # Fabric Component 规范
│   │   ├── NativeCacheManager.ts           # 缓存管理 Turbo Module 规范 ⭐
│   │   ├── NativeCalculator.ts             # Turbo Module 规范
│   │   └── NativeVersionInfo.ts            # 应用版本信息 Turbo Module 规范 ⭐
│   │
│   ├── store/                              # 状态管理
│   │   └── networkAtoms.ts                 # Jotai 原子状态
│   │
│   ├── AppCombined.tsx                     # 组合导航示例 ⭐ 当前使用
│   └── AppWithTopTabs.tsx                  # 顶部标签示例
│
├── android/                                # Android 原生代码
│   ├── app/
│   │   ├── build/
│   │   │   └── generated/                  # Codegen 生成的 Android 代码
│   │   │       └── source/codegen/
│   │   │           ├── java/com/myawesome/specs/
│   │   │           │   ├── NativeCalculatorSpec.java
│   │   │           │   ├── NativeCacheManagerSpec.java
│   │   │           │   └── NativeVersionInfoSpec.java
│   │   │           ├── java/com/facebook/react/viewmanagers/
│   │   │           │   ├── CustomButtonManagerInterface.java
│   │   │           │   └── CustomButtonManagerDelegate.java
│   │   │           └── jni/                # C++ 层代码
│   │   │
│   │   └── src/main/java/com/myawesome/
│   │       ├── CacheManagerModule.kt       # 缓存管理 Turbo Module 实现 ⭐
│   │       ├── CalculatorModule.kt         # Calculator Turbo Module 实现 ⭐
│   │       ├── VersionInfoModule.kt        # 应用版本信息 Turbo Module 实现 ⭐
│   │       ├── CustomButtonManager.kt      # CustomButton ViewManager ⭐
│   │       ├── CustomButtonView.kt         # CustomButton View 实现 ⭐
│   │       ├── MainApplication.kt          # 应用入口
│   │       └── MyAwesomePackage.kt         # 模块注册 Package ⭐
│   │
│   ├── build.gradle                        # Android 项目配置
│   └── settings.gradle                     # Android 设置
│
├── ios/                                    # iOS 原生代码
│   ├── MyAwesome/
│   │   ├── CacheManager.h                  # 缓存管理 Turbo Module 头文件 ⭐
│   │   ├── CacheManager.mm                 # 缓存管理 Turbo Module 实现 ⭐
│   │   ├── Calculator.h                    # Calculator Turbo Module 头文件 ⭐
│   │   ├── Calculator.mm                   # Calculator Turbo Module 实现 ⭐
│   │   ├── VersionInfo.h                   # 应用版本信息 Turbo Module 头文件 ⭐
│   │   ├── VersionInfo.mm                  # 应用版本信息 Turbo Module 实现 ⭐
│   │   ├── CustomButtonView.h              # CustomButton Fabric Component 头文件 ⭐
│   │   ├── CustomButtonView.mm             # CustomButton Fabric Component 实现 ⭐
│   │   ├── AppDelegate.swift               # 应用委托
│   │   ├── Info.plist                      # iOS 配置
│   │   └── Images.xcassets/                # 图片资源
│   │
│   ├── MyAwesome.xcodeproj/                # Xcode 项目文件
│   │   └── project.pbxproj                 # 项目配置
│   │
│   ├── MyAwesome.xcworkspace/              # Xcode 工作空间
│   ├── Podfile                             # CocoaPods 依赖配置
│   └── Podfile.lock                        # CocoaPods 锁定文件
│
├── build/                                  # 构建输出目录
│   └── generated/                          # Codegen 生成的代码
│       ├── android/                        # Android 生成代码
│       └── ios/                            # iOS 生成代码 ⭐
│           ├── MyAwesomeSpec/
│           │   ├── MyAwesomeSpec.h         # ObjC 协议定义
│           │   └── MyAwesomeSpec-generated.mm
│           └── react/renderer/components/MyAwesomeSpec/
│               ├── Props.h/cpp             # Fabric Props 定义
│               ├── EventEmitters.h/cpp     # Fabric 事件发射器
│               └── ComponentDescriptors.h/cpp
│
├── __tests__/                              # 测试文件
│   └── App.test.tsx
│
├── node_modules/                           # npm 依赖
│
├── .vscode/                                # VS Code 配置
│
├── 文档文件/
│   ├── JOTAI_AXIOS_GUIDE.md               # Jotai + Axios 使用指南
│   ├── DRAWER_GUIDE.md                    # 抽屉导航指南
│   ├── NAVIGATION_COMPARISON.md           # 导航方案对比
│   ├── QUICK_START.md                     # 快速开始指南
│   ├── IOS_NATIVE_FILES_SETUP.md          # iOS 原生文件设置指南
│   └── IOS_SETUP_COMPLETE.md              # iOS 设置完成文档
│
├── 脚本文件/
│   ├── rebuild-android.sh                 # Android 重建脚本
│   ├── rebuild-ios-clean.sh               # iOS 清理重建脚本
│   ├── setup-ios-codegen.sh               # iOS Codegen 设置脚本
│   └── add-ios-files.rb                   # iOS 文件添加脚本
│
├── 配置文件/
│   ├── package.json                       # npm 配置（包含 Codegen 配置）⭐
│   ├── tsconfig.json                      # TypeScript 配置
│   ├── babel.config.js                    # Babel 配置
│   ├── metro.config.js                    # Metro 打包配置
│   ├── .eslintrc.js                       # ESLint 配置
│   ├── .prettierrc.js                     # Prettier 配置
│   ├── .gitignore                         # Git 忽略文件
│   ├── .watchmanconfig                    # Watchman 配置
│   ├── .nvmrc                             # Node 版本配置
│   ├── .npmrc                             # npm 配置
│   ├── Gemfile                            # Ruby 依赖
│   ├── Gemfile.lock                       # Ruby 锁定文件
│   └── app.json                           # 应用配置
│
├── index.js                               # 应用入口文件
├── App.tsx                                # 根组件（旧版）
└── README.md                              # 项目说明文档
```

### 📋 目录说明

#### 核心目录

| 目录 | 说明 | 关键文件 |
|------|------|---------|
| `src/components/` | 可复用的 React 组件 | `CustomButton.tsx`, `TabBarIconSvg.tsx` |
| `src/navigation/` | 导航配置和类型定义 | `TopTabsNavigator.tsx`, `types.ts` |
| `src/screens/` | 应用页面组件 | `CodegenDemoScreen.tsx`, `NetworkDemoScreen.tsx` |
| `src/services/` | 业务逻辑和 API 服务 | `api.ts` |
| `src/specs/` | **Codegen TypeScript 规范** ⭐ | `NativeCalculator.ts`, `NativeCacheManager.ts`, `NativeVersionInfo.ts`, `CustomButtonNativeComponent.ts` |
| `src/store/` | 状态管理（Jotai） | `networkAtoms.ts` |

#### Android 原生目录

| 目录 | 说明 | 关键文件 |
|------|------|---------|
| `android/app/src/main/java/com/myawesome/` | Android 原生实现 | `CacheManagerModule.kt`, `CalculatorModule.kt`, `VersionInfoModule.kt`, `CustomButtonManager.kt`, `MyAwesomePackage.kt` |
| `android/app/build/generated/` | **Codegen 生成的 Android 代码** ⭐ | `NativeCalculatorSpec.java`, `NativeCacheManagerSpec.java`, `NativeVersionInfoSpec.java`, `CustomButtonManagerInterface.java` |

#### iOS 原生目录

| 目录 | 说明 | 关键文件 |
|------|------|---------|
| `ios/MyAwesome/` | iOS 原生实现 | `CacheManager.h/mm`, `Calculator.h/mm`, `VersionInfo.h/mm`, `CustomButtonView.h/mm`, `AppDelegate.swift` |
| `build/generated/ios/` | **Codegen 生成的 iOS 代码** ⭐ | `MyAwesomeSpec.h`, `Props.h`, `EventEmitters.h` |

#### 构建和配置

| 文件 | 说明 |
|------|------|
| `package.json` | npm 配置，包含 **Codegen 配置** ⭐ |
| `babel.config.js` | Babel 转译配置 |
| `metro.config.js` | Metro 打包器配置 |
| `tsconfig.json` | TypeScript 编译配置 |

#### 便捷脚本

| 脚本 | 用途 |
|------|------|
| `rebuild-android.sh` | 清理并重建 Android 应用 |
| `rebuild-ios-clean.sh` | 清理并重建 iOS 应用 |
| `setup-ios-codegen.sh` | 设置 iOS Codegen 环境 |
| `add-ios-files.rb` | 自动添加 iOS 文件到 Xcode 项目 |

### 🔑 关键文件说明

#### Codegen 相关文件 ⭐

**TypeScript 规范**（手动编写）:
- `src/specs/NativeCalculator.ts` - Turbo Module 规范
- `src/specs/NativeCacheManager.ts` - 缓存管理 Turbo Module 规范
- `src/specs/NativeVersionInfo.ts` - 应用版本信息 Turbo Module 规范
- `src/specs/CustomButtonNativeComponent.ts` - Fabric Component 规范

**Android 实现**（手动编写）:
- `android/app/src/main/java/com/myawesome/CalculatorModule.kt` - Turbo Module 实现
- `android/app/src/main/java/com/myawesome/CacheManagerModule.kt` - 缓存管理 Turbo Module 实现
- `android/app/src/main/java/com/myawesome/VersionInfoModule.kt` - 应用版本信息 Turbo Module 实现
- `android/app/src/main/java/com/myawesome/CustomButtonManager.kt` - ViewManager
- `android/app/src/main/java/com/myawesome/CustomButtonView.kt` - View 实现
- `android/app/src/main/java/com/myawesome/MyAwesomePackage.kt` - 模块注册

**iOS 实现**（手动编写）:
- `ios/MyAwesome/Calculator.h` - Turbo Module 头文件
- `ios/MyAwesome/Calculator.mm` - Turbo Module 实现
- `ios/MyAwesome/CacheManager.h` - 缓存管理 Turbo Module 头文件
- `ios/MyAwesome/CacheManager.mm` - 缓存管理 Turbo Module 实现
- `ios/MyAwesome/VersionInfo.h` - 应用版本信息 Turbo Module 头文件
- `ios/MyAwesome/VersionInfo.mm` - 应用版本信息 Turbo Module 实现
- `ios/MyAwesome/CustomButtonView.h` - Fabric Component 头文件
- `ios/MyAwesome/CustomButtonView.mm` - Fabric Component 实现

**生成的代码**（自动生成，不要手动修改）:
- `android/app/build/generated/source/codegen/` - Android 生成代码
- `build/generated/ios/` - iOS 生成代码

#### 网络请求相关文件

- `src/services/api.ts` - Axios 配置和 API 方法
- `src/store/networkAtoms.ts` - Jotai 状态管理
- `src/screens/NetworkDemoScreen.tsx` - 网络请求演示界面

#### 导航相关文件

- `src/AppCombined.tsx` - 组合导航（当前使用）
- `src/navigation/TopTabsNavigator.tsx` - 顶部标签导航
- `src/navigation/types.ts` - 导航类型定义

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

// 示例 4: Drawer Navigator (抽屉导航)
// import App from './src/AppWithDrawer';

// 示例 5: Drawer + Bottom Tabs (抽屉+标签组合)
// import App from './src/AppWithDrawerAndTabs';
```

## 🌐 网络请求示例

项目包含完整的网络请求演示，展示了如何使用 Jotai + Axios 进行状态管理和 API 调用：

### 功能特性
- ✅ GET 请求示例（获取用户、文章、评论、待办事项）
- ✅ POST 请求示例（创建新数据）
- ✅ 请求状态管理（loading、success、error）
- ✅ 请求取消功能
- ✅ 错误处理和显示
- ✅ 响应数据展示
- ✅ 美观的 UI 设计（卡片、渐变、SVG 图标）

### 快速体验
1. 启动应用
2. 点击底部 "Network" 标签
3. 尝试不同的 API 请求按钮
4. 查看实时状态和响应数据

### 详细文档
查看 [JOTAI_AXIOS_GUIDE.md](./JOTAI_AXIOS_GUIDE.md) 了解：
- Jotai 状态管理详解
- Axios 配置和使用
- 如何添加新的 API 接口
- 最佳实践和常见问题

## 🎨 自定义 SVG 图标

项目使用 `react-native-svg` 实现自定义图标系统，所有图标都支持选中/未选中状态切换。

### 已实现的图标
- **导航图标**: Home、Discover、Network、Settings
- **通知图标**: Bell、Heart、Message、User、Download
- **功能图标**: Users、Article、Comment、Todo、Send、Refresh、Cancel、Trash
- **状态图标**: CheckCircle、AlertCircle、InfoCircle、File

### 添加新图标

查看 `src/components/TabBarIconSvg.tsx` 了解如何添加新图标：

```typescript
const iconPaths = {
  home: {
    filled: '...',    // 选中状态的 SVG 路径
    outline: '...',   // 未选中状态的 SVG 路径
  },
  // 添加更多图标...
};
```

### 使用图标

```tsx
import { TabBarIconSvg } from './components/TabBarIconSvg';

<TabBarIconSvg 
  name="network" 
  color="#007AFF" 
  size={24} 
  focused={true} 
/>
```

## 📚 项目文档

- **[JOTAI_AXIOS_GUIDE.md](./JOTAI_AXIOS_GUIDE.md)** - Jotai + Axios 完整使用指南
- **[DRAWER_GUIDE.md](./DRAWER_GUIDE.md)** - 抽屉导航实现指南
- **[NAVIGATION_COMPARISON.md](./NAVIGATION_COMPARISON.md)** - 导航方案对比和选择
- **[QUICK_START.md](./QUICK_START.md)** - 快速开始指南

## 🔧 常见问题

### 网络请求相关

**Q: 如何添加新的 API 接口？**

在 `src/services/api.ts` 中添加新方法：

```typescript
export const apiService = {
  // 添加新接口
  getProducts: () => api.get('/products'),
  createProduct: (data: any) => api.post('/products', data),
};
```

**Q: 如何修改 API 基础 URL？**

编辑 `src/services/api.ts` 中的 `baseURL`：

```typescript
const api = axios.create({
  baseURL: 'https://your-api.com/api',
  timeout: 10000,
});
```

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

### iOS Pod 安装问题

```bash
cd ios
bundle exec pod deintegrate
bundle exec pod install
cd ..
```

## 📖 学习资源

### 官方文档
- [React Native 官方文档](https://reactnative.dev)
- [React Navigation 文档](https://reactnavigation.org)
- [Jotai 文档](https://jotai.org)
- [Axios 文档](https://axios-http.com)
- [react-native-svg 文档](https://github.com/software-mansion/react-native-svg)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

### 推荐阅读
- [React Native 性能优化](https://reactnative.dev/docs/performance)
- [React Navigation 最佳实践](https://reactnavigation.org/docs/common-mistakes)
- [Jotai vs Redux](https://jotai.org/docs/basics/comparison)
- [Axios 拦截器详解](https://axios-http.com/docs/interceptors)

## 🎯 下一步计划

- [ ] 添加用户认证示例（JWT）
- [ ] 集成本地存储（AsyncStorage）
- [ ] 添加表单验证示例
- [ ] 实现下拉刷新和上拉加载
- [ ] 添加动画效果（Reanimated）
- [ ] 集成推送通知
- [ ] 添加深色模式支持
- [ ] 单元测试和集成测试

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

---

**Happy Coding! 🎉**


## 🔧 React Native Codegen 完整实现指南

本项目包含 React Native Codegen 的**完整端到端实现**，从 TypeScript 规范到 Android/iOS 原生代码，展示如何创建类型安全的 Turbo Native Modules 和 Fabric Native Components。

### 🎯 实现概览

本项目实现了四个完整的 Codegen 示例：

1. **Calculator Turbo Module** - 原生计算模块
   - ✅ TypeScript 规范定义
   - ✅ Android Kotlin 实现
   - ✅ iOS Objective-C++ 实现
   - ✅ 异步方法和常量导出
   - ✅ 错误处理

2. **CustomButton Fabric Component** - 原生按钮组件
   - ✅ TypeScript 规范定义
   - ✅ Android Kotlin 实现（ViewManager + View）
   - ✅ iOS Objective-C++ 实现（Fabric ComponentView）
   - ✅ Props 属性绑定
   - ✅ 事件发射（onPress）
   - ✅ 完整的 UI 交互

3. **CacheManager Turbo Module** - 当前 App 缓存管理模块
   - ✅ TypeScript 规范定义
   - ✅ Android Kotlin 实现
   - ✅ iOS Objective-C++ 实现
   - ✅ 实时读取 App 缓存目录大小
   - ✅ 清空 App 缓存目录

4. **VersionInfo Turbo Module** - 应用版本信息模块
   - ✅ TypeScript 规范定义
   - ✅ Android Kotlin 实现
   - ✅ iOS Objective-C++ 实现
   - ✅ 读取安装包真实版本号和构建号
   - ✅ 抽屉底部动态展示版本信息

> 说明：移动系统不允许普通 App 读取或清理整台手机的系统缓存。本项目读取和清理的是系统分配给当前 App 的缓存目录。Android 包含 `cacheDir`、`codeCacheDir`、`externalCacheDir`；iOS 包含 `Library/Caches` 和 `tmp`。

### 📊 项目文件结构

```
MyAwesome/
├── src/
│   ├── specs/                                    # TypeScript 规范
│   │   ├── NativeCalculator.ts                   # Calculator Turbo Module 规范
│   │   ├── NativeCacheManager.ts                 # CacheManager Turbo Module 规范
│   │   ├── NativeVersionInfo.ts                  # VersionInfo Turbo Module 规范
│   │   └── CustomButtonNativeComponent.ts        # Fabric Component 规范
│   ├── components/
│   │   └── CustomButton.tsx                      # React 包装组件
│   └── screens/
│       └── CodegenDemoScreen.tsx                 # 完整 Demo 界面
│
├── android/app/src/main/java/com/myawesome/
│   ├── CacheManagerModule.kt                     # CacheManager 实现
│   ├── CalculatorModule.kt                       # Calculator 实现
│   ├── VersionInfoModule.kt                      # VersionInfo 实现
│   ├── CustomButtonManager.kt                    # Button ViewManager
│   ├── CustomButtonView.kt                       # Button View
│   ├── MyAwesomePackage.kt                       # 模块注册
│   └── MainApplication.kt                        # 应用配置
│
├── ios/MyAwesome/
│   ├── CacheManager.h                            # CacheManager 头文件
│   ├── CacheManager.mm                           # CacheManager 实现
│   ├── Calculator.h                              # Calculator 头文件
│   ├── Calculator.mm                             # Calculator 实现
│   ├── VersionInfo.h                             # VersionInfo 头文件
│   ├── VersionInfo.mm                            # VersionInfo 实现
│   ├── CustomButtonView.h                        # Button 头文件
│   └── CustomButtonView.mm                       # Button 实现
│
├── build/generated/                              # Codegen 生成的文件
│   ├── android/                                  # Android 生成代码
│   └── ios/                                      # iOS 生成代码
│
├── package.json                                  # Codegen 配置
├── rebuild-android.sh                            # Android 重建脚本
├── rebuild-ios-clean.sh                          # iOS 清理重建脚本
└── setup-ios-codegen.sh                          # iOS Codegen 设置脚本
```

### 📝 1. TypeScript 规范定义

#### Turbo Native Module - `src/specs/NativeCalculator.ts`

```typescript
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // 异步方法 - 返回 Promise
  add(a: number, b: number): Promise<number>;
  subtract(a: number, b: number): Promise<number>;
  multiply(a: number, b: number): Promise<number>;
  divide(a: number, b: number): Promise<number>;
  
  // 常量导出
  getConstants(): {
    PI: number;
    E: number;
  };
}

export default TurboModuleRegistry.getEnforcing<Spec>('Calculator');
```

#### Turbo Native Module - `src/specs/NativeCacheManager.ts`

```typescript
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getCacheSize(): Promise<number>;
  clearCache(): Promise<number>;
}

export default TurboModuleRegistry.get<Spec>('CacheManager');
```

#### Turbo Native Module - `src/specs/NativeVersionInfo.ts`

```typescript
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getVersionName(): Promise<string>;
  getBuildNumber(): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('VersionInfo');
```

**关键点**：
- 文件名必须以 `Native` 开头（如 `NativeCalculator.ts`）
- 接口必须继承 `TurboModule`
- 使用 `TurboModuleRegistry.getEnforcing` 注册
- 异步方法返回 `Promise<T>`
- 同步方法直接返回值

#### Fabric Native Component - `src/specs/CustomButtonNativeComponent.ts`

```typescript
import type { ViewProps } from 'react-native';
import type {
  BubblingEventHandler,  // ⚠️ 使用 BubblingEventHandler，不是 DirectEventHandler
  Int32,
  Double,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// 事件数据类型
export type OnPressEvent = Readonly<{
  timestamp: Double;  // ⚠️ 必须使用 Codegen 类型（Double），不能用 number
}>;

export interface NativeProps extends ViewProps {
  // 属性定义
  text?: WithDefault<string, ''>;              // 默认值为空字符串
  color?: WithDefault<string, '#007AFF'>;      // 默认颜色
  disabled?: WithDefault<boolean, false>;      // 默认启用
  cornerRadius?: WithDefault<Int32, 8>;        // 默认圆角
  
  // 事件定义
  onPress?: BubblingEventHandler<OnPressEvent>;
}

export default codegenNativeComponent<NativeProps>('CustomButton');
```

**关键点**：
- 文件名必须以 `NativeComponent` 结尾
- Props 接口必须继承 `ViewProps`
- 使用 `WithDefault<Type, DefaultValue>` 设置默认值
- 事件数据必须使用 Codegen 类型：`Int32`、`Double`、`Float`、`string`、`boolean`
- 使用 `BubblingEventHandler` 而非 `DirectEventHandler`（避免 "Event cannot be both direct and bubbling" 错误）
- 使用 `codegenNativeComponent` 注册组件

### ⚙️ 2. Codegen 配置

在 `package.json` 中配置 Codegen：

```json
{
  "name": "MyAwesome",
  "version": "0.0.1",
  "codegenConfig": {
    "name": "MyAwesomeSpec",           // 生成的规范名称
    "type": "all",                     // 生成所有类型（modules + components）
    "jsSrcsDir": "src/specs",          // TypeScript 规范文件目录
    "android": {
      "javaPackageName": "com.myawesome.specs"  // Android 包名
    },
    "ios": {}                          // iOS 配置（使用默认值）
  },
  "scripts": {
    "codegen": "react-native codegen --path . --platform all",
    "codegen:ios": "react-native codegen --path . --platform ios",
    "codegen:android": "react-native codegen --path . --platform android"
  }
}
```

**配置说明**：
- `name`: 生成的 C++ 命名空间和类名前缀
- `type`: `"all"` | `"modules"` | `"components"`
- `jsSrcsDir`: 相对于项目根目录的规范文件路径
- `android.javaPackageName`: Android 生成代码的 Java 包名
- `ios`: iOS 配置（通常为空对象）

### 🚀 3. 生成 Codegen 代码

#### 方法 1: 使用 npm 脚本（推荐）

```bash
# 为所有平台生成代码
npm run codegen

# 只为 iOS 生成
npm run codegen:ios

# 只为 Android 生成
npm run codegen:android
```

#### 方法 2: Android 自动生成

Android 在构建时会自动运行 Codegen：

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema
cd ..
```

生成的文件位于：`android/app/build/generated/source/codegen/`

#### 方法 3: iOS 手动生成

```bash
# 使用 React Native 脚本
node node_modules/react-native/scripts/generate-codegen-artifacts.js \
  --path . \
  --outputPath ios/ \
  --targetPlatform ios

# 或使用 Pod install（推荐）
cd ios
RCT_NEW_ARCH_ENABLED=1 pod install
cd ..
```

生成的文件位于：`build/generated/ios/`

### 📦 4. 生成的文件详解

#### Android 生成文件

```
android/app/build/generated/source/codegen/
├── java/com/myawesome/specs/
│   ├── NativeCalculatorSpec.java          # ✅ Turbo Module 抽象基类
│   ├── NativeCacheManagerSpec.java        # ✅ 缓存管理 Module 抽象基类
│   └── NativeVersionInfoSpec.java         # ✅ 版本信息 Module 抽象基类
│       - 定义所有方法签名
│       - 继承自 ReactContextBaseJavaModule
│       - 需要在 Kotlin 中实现
│
├── java/com/facebook/react/viewmanagers/
│   ├── CustomButtonManagerInterface.java  # ✅ Component ViewManager 接口
│   │   - 定义所有 Props setter 方法
│   │   - 需要在 ViewManager 中实现
│   │
│   └── CustomButtonManagerDelegate.java   # ✅ Component 代理类
│       - 自动处理 Props 分发
│       - 连接 React 和原生代码
│
└── jni/                                   # C++ 层代码
    ├── MyAwesomeSpec.h                    # C++ 头文件
    ├── MyAwesomeSpec-generated.cpp        # C++ 实现
    └── react/renderer/components/MyAwesomeSpec/
        ├── Props.h/cpp                    # Fabric Props 定义
        ├── EventEmitters.h/cpp            # Fabric 事件发射器
        ├── ShadowNodes.h/cpp              # Fabric Shadow 节点
        └── ComponentDescriptors.h/cpp     # Fabric 组件描述符
```

#### iOS 生成文件

```
build/generated/ios/
├── MyAwesomeSpec/
│   ├── MyAwesomeSpec.h                    # ✅ ObjC 协议定义
│   │   - 定义 Calculator / CacheManager / VersionInfo 方法签名
│   │   - 需要在 .mm 文件中实现
│   │
│   └── MyAwesomeSpec-generated.mm         # ✅ ObjC 实现
│       - 自动生成的桥接代码
│
├── MyAwesomeSpecJSI.h                     # C++ JSI 头文件
├── MyAwesomeSpecJSI-generated.cpp         # C++ JSI 实现
│
└── react/renderer/components/MyAwesomeSpec/
    ├── Props.h/cpp                        # ✅ Fabric Props 定义
    │   - CustomButtonProps 类
    │   - 包含 text, color, disabled, cornerRadius
    │
    ├── EventEmitters.h/cpp                # ✅ Fabric 事件发射器
    │   - CustomButtonEventEmitter 类
    │   - onPress 事件定义
    │
    ├── ShadowNodes.h/cpp                  # Fabric Shadow 节点
    ├── ComponentDescriptors.h/cpp         # Fabric 组件描述符
    └── RCTComponentViewHelpers.h          # ✅ 组件协议
        - RCTCustomButtonViewProtocol
        - 需要在 CustomButtonView 中实现
```

**重要文件说明**：

| 文件 | 用途 | 是否需要手动编写 |
|------|------|------------------|
| `NativeCalculatorSpec.java` | Android Module 基类 | ❌ 自动生成，继承实现 |
| `NativeCacheManagerSpec.java` | Android 缓存 Module 基类 | ❌ 自动生成，继承实现 |
| `NativeVersionInfoSpec.java` | Android 版本信息 Module 基类 | ❌ 自动生成，继承实现 |
| `CustomButtonManagerInterface.java` | Android ViewManager 接口 | ❌ 自动生成，实现接口 |
| `MyAwesomeSpec.h` | iOS Module 协议 | ❌ 自动生成，实现协议 |
| `Props.h/cpp` | Fabric 属性定义 | ❌ 自动生成，直接使用 |
| `EventEmitters.h/cpp` | Fabric 事件定义 | ❌ 自动生成，直接使用 |
| `RCTComponentViewHelpers.h` | iOS 组件协议 | ❌ 自动生成，实现协议 |

### 📝 5. 命名约定和常见陷阱

#### ✅ 正确的命名

**Turbo Modules**:
```
✅ NativeCalculator.ts
✅ NativeCacheManager.ts
✅ NativeVersionInfo.ts
✅ NativeStorage.ts
✅ NativeImagePicker.ts
❌ Calculator.ts          # 不会被 Codegen 识别
❌ StorageModule.ts       # 不会被 Codegen 识别
```

**Fabric Components**:
```
✅ CustomButtonNativeComponent.ts
✅ VideoPlayerNativeComponent.ts
✅ MapViewNativeComponent.ts
❌ CustomButton.ts        # 不会被 Codegen 识别
❌ VideoPlayer.ts         # 不会被 Codegen 识别
```

#### ⚠️ 事件类型陷阱

**错误示例** - 会导致运行时错误：
```typescript
// ❌ 错误 1: 使用 number 而不是 Double
type OnPressEvent = Readonly<{
  timestamp: number;  // Codegen 不支持 number
}>;

// ❌ 错误 2: 使用 DirectEventHandler
onPress?: DirectEventHandler<OnPressEvent>;
// 会导致: "Event cannot be both direct and bubbling: topPress"
```

**正确示例**：
```typescript
// ✅ 正确: 使用 Codegen 类型
import type { Double, BubblingEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

type OnPressEvent = Readonly<{
  timestamp: Double;  // 使用 Double
}>;

// ✅ 正确: 使用 BubblingEventHandler
onPress?: BubblingEventHandler<OnPressEvent>;
```

#### 📋 Codegen 支持的类型

| TypeScript 类型 | Codegen 类型 | 用途 |
|----------------|-------------|------|
| `number` (整数) | `Int32` | 32位整数 |
| `number` (浮点) | `Double` | 双精度浮点数 |
| `number` (浮点) | `Float` | 单精度浮点数 |
| `string` | `string` | 字符串 |
| `boolean` | `boolean` | 布尔值 |
| `T \| undefined` | `WithDefault<T, default>` | 带默认值的可选属性 |

#### 🔄 事件处理器类型

| 类型 | 行为 | 使用场景 |
|------|------|---------|
| `BubblingEventHandler<T>` | 事件会冒泡到父组件 | 大多数交互事件（press, change） |
| `DirectEventHandler<T>` | 事件不冒泡 | 特殊场景（scroll, layout） |

### 🤖 6. Android 原生实现

#### 6.1 Calculator Turbo Module

**文件**: `android/app/src/main/java/com/myawesome/CalculatorModule.kt`

```kotlin
package com.myawesome

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.myawesome.specs.NativeCalculatorSpec

class CalculatorModule(reactContext: ReactApplicationContext) :
    NativeCalculatorSpec(reactContext) {

    companion object {
        const val NAME = "Calculator"
    }

    override fun getName(): String = NAME

    // 实现加法
    override fun add(a: Double, b: Double, promise: Promise) {
        promise.resolve(a + b)
    }

    // 实现减法
    override fun subtract(a: Double, b: Double, promise: Promise) {
        promise.resolve(a - b)
    }

    // 实现乘法
    override fun multiply(a: Double, b: Double, promise: Promise) {
        promise.resolve(a * b)
    }

    // 实现除法（带错误处理）
    override fun divide(a: Double, b: Double, promise: Promise) {
        if (b == 0.0) {
            promise.reject("DIVISION_BY_ZERO", "Cannot divide by zero")
            return
        }
        promise.resolve(a / b)
    }

    // 导出常量
    override fun getTypedExportedConstants(): Map<String, Any> {
        return mapOf(
            "PI" to Math.PI,
            "E" to Math.E
        )
    }
}
```

**关键点**：
- 继承自 `NativeCalculatorSpec`（Codegen 生成）
- 实现所有抽象方法
- 使用 `Promise` 处理异步结果
- `promise.resolve()` 返回成功结果
- `promise.reject()` 返回错误
- `getTypedExportedConstants()` 导出常量

#### 6.2 CacheManager Turbo Module

**文件**: `android/app/src/main/java/com/myawesome/CacheManagerModule.kt`

用于读取和清空当前 App 的缓存目录：

- `getCacheSize()`：递归统计 `cacheDir`、`codeCacheDir`、`externalCacheDir`
- `clearCache()`：删除上述缓存目录下的文件，并返回清理后的实时大小
- 返回值单位为 bytes，前端负责格式化为 B / KB / MB / GB

该模块只处理当前 App 自己的缓存目录，不读取其他 App 或系统全局缓存。

#### 6.3 VersionInfo Turbo Module

**文件**: `android/app/src/main/java/com/myawesome/VersionInfoModule.kt`

用于读取 Android 安装包中的真实版本信息：

- `getVersionName()`：读取 `android/app/build.gradle` 中配置的 `versionName`
- `getBuildNumber()`：读取 `versionCode`
- 前端抽屉底部展示格式为 `版本 {versionName} ({versionCode})`

注意：Android Codegen 生成的基类是 `com.myawesome.specs.NativeVersionInfoSpec`。如果误导入 `com.facebook.fbreact.specs.NativeVersionInfoSpec`，会导致 `Unresolved reference 'NativeVersionInfoSpec'` 和 `MyAwesomePackage.kt` 返回类型异常。

#### 6.4 CustomButton Fabric Component

##### ViewManager - `android/app/src/main/java/com/myawesome/CustomButtonManager.kt`

```kotlin
package com.myawesome

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.CustomButtonManagerInterface

@ReactModule(name = CustomButtonManager.NAME)
class CustomButtonManager(private val reactContext: ReactApplicationContext) :
    SimpleViewManager<CustomButtonView>(),
    CustomButtonManagerInterface<CustomButtonView> {

    companion object {
        const val NAME = "CustomButton"
    }

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): CustomButtonView {
        return CustomButtonView(reactContext)
    }

    // Props 设置方法
    @ReactProp(name = "text")
    override fun setText(view: CustomButtonView, text: String?) {
        view.setText(text ?: "")
    }

    @ReactProp(name = "color")
    override fun setColor(view: CustomButtonView, color: String?) {
        view.setButtonColor(color ?: "#007AFF")
    }

    @ReactProp(name = "disabled", defaultBoolean = false)
    override fun setDisabled(view: CustomButtonView, disabled: Boolean) {
        view.setDisabled(disabled)
    }

    @ReactProp(name = "cornerRadius", defaultInt = 8)
    override fun setCornerRadius(view: CustomButtonView, cornerRadius: Int) {
        view.setCornerRadius(cornerRadius.toFloat())
    }

    // 注册事件
    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
            "topPress" to mapOf("registrationName" to "onPress")
        )
    }
}
```

##### View - `android/app/src/main/java/com/myawesome/CustomButtonView.kt`

```kotlin
package com.myawesome

import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import android.view.Gravity
import android.widget.Button
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class CustomButtonView(private val reactContext: ReactContext) : Button(reactContext) {
    private var buttonColor: String = "#007AFF"
    private var cornerRadiusValue: Float = 8f
    private var isDisabled: Boolean = false

    init {
        // 初始化按钮样式
        gravity = Gravity.CENTER
        setTextColor(Color.WHITE)
        textSize = 16f
        setPadding(32, 24, 32, 24)
        
        // 设置点击监听
        setOnClickListener {
            if (!isDisabled) {
                // 发送事件到 JavaScript
                val event = Arguments.createMap()
                event.putDouble("timestamp", System.currentTimeMillis().toDouble())
                
                reactContext
                    .getJSModule(RCTEventEmitter::class.java)
                    .receiveEvent(id, "topPress", event)
            }
        }
        
        updateButtonStyle()
    }

    fun setText(text: String) {
        this.text = text
    }

    fun setButtonColor(color: String) {
        this.buttonColor = color
        updateButtonStyle()
    }

    fun setDisabled(disabled: Boolean) {
        this.isDisabled = disabled
        isEnabled = !disabled
        alpha = if (disabled) 0.5f else 1.0f
    }

    fun setCornerRadius(radius: Float) {
        this.cornerRadiusValue = radius
        updateButtonStyle()
    }

    private fun updateButtonStyle() {
        val drawable = GradientDrawable()
        drawable.shape = GradientDrawable.RECTANGLE
        drawable.setColor(parseColor(buttonColor))
        drawable.cornerRadius = cornerRadiusValue * resources.displayMetrics.density
        background = drawable
    }

    private fun parseColor(colorString: String): Int {
        return try {
            Color.parseColor(colorString)
        } catch (e: IllegalArgumentException) {
            Color.parseColor("#007AFF")
        }
    }
}
```

**关键点**：
- ViewManager 实现 `CustomButtonManagerInterface`（Codegen 生成）
- 使用 `@ReactProp` 注解绑定属性
- `getExportedCustomDirectEventTypeConstants()` 注册事件
- View 使用 `RCTEventEmitter.receiveEvent()` 发送事件
- 事件名称必须以 `top` 开头（如 `topPress`）

#### 6.5 注册模块和组件

##### Package - `android/app/src/main/java/com/myawesome/MyAwesomePackage.kt`

```kotlin
package com.myawesome

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class MyAwesomePackage : TurboReactPackage() {
    
    // 注册 Turbo Modules
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            CalculatorModule.NAME -> CalculatorModule(reactContext)
            CacheManagerModule.NAME -> CacheManagerModule(reactContext)
            VersionInfoModule.NAME -> VersionInfoModule(reactContext)
            else -> null
        }
    }

    // 提供模块信息
    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            mapOf(
                CalculatorModule.NAME to ReactModuleInfo(
                    _name = CalculatorModule.NAME,
                    _className = "CalculatorModule",
                    _canOverrideExistingModule = false,
                    _needsEagerInit = false,
                    isCxxModule = false,
                    isTurboModule = true  // ⚠️ 标记为 Turbo Module
                ),
                CacheManagerModule.NAME to ReactModuleInfo(
                    _name = CacheManagerModule.NAME,
                    _className = "CacheManagerModule",
                    _canOverrideExistingModule = false,
                    _needsEagerInit = false,
                    isCxxModule = false,
                    isTurboModule = true  // ⚠️ 标记为 Turbo Module
                ),
                VersionInfoModule.NAME to ReactModuleInfo(
                    _name = VersionInfoModule.NAME,
                    _className = "VersionInfoModule",
                    _canOverrideExistingModule = false,
                    _needsEagerInit = false,
                    isCxxModule = false,
                    isTurboModule = true  // ⚠️ 标记为 Turbo Module
                )
            )
        }
    }

    // 注册 Fabric Components
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            CustomButtonManager(reactContext)
        )
    }
}
```

##### 在 MainApplication 中注册

**文件**: `android/app/src/main/java/com/myawesome/MainApplication.kt`

```kotlin
override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
        context = applicationContext,
        packageList = PackageList(this).packages.apply {
            add(MyAwesomePackage())  // ⚠️ 添加自定义包
        },
    )
}
```

**关键点**：
- 继承 `TurboReactPackage`（支持 Turbo Modules）
- `getModule()` 返回 Turbo Module 实例
- `getReactModuleInfoProvider()` 中设置 `isTurboModule = true`
- `createViewManagers()` 返回 ViewManager 列表
- 在 `MainApplication` 中添加到 `packageList`

### 🍎 7. iOS 原生实现

#### 7.1 Calculator Turbo Module

##### Header - `ios/MyAwesome/Calculator.h`

```objective-c
#import <React/RCTBridgeModule.h>
#import <React/RCTTurboModule.h>
#import <MyAwesomeSpec/MyAwesomeSpec.h>

NS_ASSUME_NONNULL_BEGIN

@interface Calculator : NSObject <NativeCalculatorSpec>
@end

NS_ASSUME_NONNULL_END
```

##### Implementation - `ios/MyAwesome/Calculator.mm`

```objective-c
#import "Calculator.h"

@implementation Calculator

RCT_EXPORT_MODULE()

// 实现加法
RCT_EXPORT_METHOD(add:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  resolve(@(a + b));
}

// 实现减法
RCT_EXPORT_METHOD(subtract:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  resolve(@(a - b));
}

// 实现乘法
RCT_EXPORT_METHOD(multiply:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  resolve(@(a * b));
}

// 实现除法（带错误处理）
RCT_EXPORT_METHOD(divide:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  if (b == 0) {
    reject(@"DIVISION_BY_ZERO", @"Cannot divide by zero", nil);
    return;
  }
  resolve(@(a / b));
}

// 导出常量
- (NSDictionary *)getConstants {
  return @{
    @"PI": @(M_PI),
    @"E": @(M_E)
  };
}

// Turbo Module 支持
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}

@end
```

**关键点**：
- 实现 `<NativeCalculatorSpec>` 协议（Codegen 生成）
- 使用 `RCT_EXPORT_MODULE()` 导出模块
- 使用 `RCT_EXPORT_METHOD` 导出方法
- `resolve` 返回成功结果，`reject` 返回错误
- `getConstants` 导出常量
- `getTurboModule` 返回 Turbo Module 实例

#### 7.2 CacheManager Turbo Module

**文件**:

- `ios/MyAwesome/CacheManager.h`
- `ios/MyAwesome/CacheManager.mm`

用于读取和清空当前 App 的缓存目录：

- `getCacheSize()`：递归统计 `Library/Caches` 和 `tmp`
- `clearCache()`：删除上述缓存目录下的文件，并返回清理后的实时大小
- 返回值单位为 bytes，前端负责格式化为 B / KB / MB / GB

该模块需要实现 `<NativeCacheManagerSpec>`，并在 `getTurboModule` 中返回 `NativeCacheManagerSpecJSI`。

#### 7.3 VersionInfo Turbo Module

**文件**:

- `ios/MyAwesome/VersionInfo.h`
- `ios/MyAwesome/VersionInfo.mm`

用于读取 iOS 安装包中的真实版本信息：

- `getVersionName()`：读取 `CFBundleShortVersionString`
- `getBuildNumber()`：读取 `CFBundleVersion`
- 前端抽屉底部展示格式为 `版本 {CFBundleShortVersionString} ({CFBundleVersion})`

该模块需要实现 `<NativeVersionInfoSpec>`，并在 `getTurboModule` 中返回 `NativeVersionInfoSpecJSI`。

#### 7.4 CustomButton Fabric Component

##### Header - `ios/MyAwesome/CustomButtonView.h`

```objective-c
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface CustomButtonView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END
```

##### Implementation - `ios/MyAwesome/CustomButtonView.mm`

```objective-c
#import "CustomButtonView.h"
#import <react/renderer/components/MyAwesomeSpec/ComponentDescriptors.h>
#import <react/renderer/components/MyAwesomeSpec/EventEmitters.h>
#import <react/renderer/components/MyAwesomeSpec/Props.h>
#import <react/renderer/components/MyAwesomeSpec/RCTComponentViewHelpers.h>

using namespace facebook::react;

@interface CustomButtonView () <RCTCustomButtonViewProtocol>
@end

@implementation CustomButtonView {
  UIButton *_button;
  NSString *_text;
  UIColor *_color;
  BOOL _disabled;
  CGFloat _cornerRadius;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const CustomButtonProps>();
    _props = defaultProps;
    
    // 创建 UIButton
    _button = [UIButton buttonWithType:UIButtonTypeSystem];
    _button.translatesAutoresizingMaskIntoConstraints = NO;
    [_button addTarget:self
                action:@selector(handleButtonPress:)
      forControlEvents:UIControlEventTouchUpInside];
    
    [self addSubview:_button];
    
    // 设置约束
    [NSLayoutConstraint activateConstraints:@[
      [_button.topAnchor constraintEqualToAnchor:self.topAnchor],
      [_button.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [_button.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      [_button.bottomAnchor constraintEqualToAnchor:self.bottomAnchor]
    ]];
    
    // 默认值
    _text = @"";
    _color = [UIColor systemBlueColor];
    _disabled = NO;
    _cornerRadius = 8.0;
    
    [self updateButton];
  }
  return self;
}

// 更新 Props
- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<CustomButtonProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomButtonProps const>(props);
  
  // 更新文本
  if (oldViewProps.text != newViewProps.text) {
    _text = [NSString stringWithUTF8String:newViewProps.text.c_str()];
  }
  
  // 更新颜色
  if (oldViewProps.color != newViewProps.color) {
    NSString *colorString = [NSString stringWithUTF8String:newViewProps.color.c_str()];
    _color = [self colorFromHexString:colorString];
  }
  
  // 更新禁用状态
  if (oldViewProps.disabled != newViewProps.disabled) {
    _disabled = newViewProps.disabled;
  }
  
  // 更新圆角
  if (oldViewProps.cornerRadius != newViewProps.cornerRadius) {
    _cornerRadius = newViewProps.cornerRadius;
  }
  
  [super updateProps:props oldProps:oldProps];
  [self updateButton];
}

// 更新按钮样式
- (void)updateButton
{
  // 设置文本
  [_button setTitle:_text forState:UIControlStateNormal];
  
  // 设置颜色
  _button.backgroundColor = _color;
  [_button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  
  // 设置禁用状态
  _button.enabled = !_disabled;
  _button.alpha = _disabled ? 0.5 : 1.0;
  
  // 设置圆角
  _button.layer.cornerRadius = _cornerRadius;
  _button.clipsToBounds = YES;
}

// 处理按钮点击
- (void)handleButtonPress:(UIButton *)sender
{
  if (_eventEmitter != nullptr) {
    // 发送事件到 JavaScript
    std::dynamic_pointer_cast<const CustomButtonEventEmitter>(_eventEmitter)
        ->onPress(CustomButtonEventEmitter::OnPress{
            .timestamp = [[NSDate date] timeIntervalSince1970]
        });
  }
}

// 解析颜色字符串
- (UIColor *)colorFromHexString:(NSString *)hexString
{
  unsigned rgbValue = 0;
  NSScanner *scanner = [NSScanner scannerWithString:hexString];
  if ([hexString hasPrefix:@"#"]) {
    [scanner setScanLocation:1];
  }
  [scanner scanHexInt:&rgbValue];
  
  return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0
                         green:((rgbValue & 0xFF00) >> 8)/255.0
                          blue:(rgbValue & 0xFF)/255.0
                         alpha:1.0];
}

// 提供组件描述符
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomButtonComponentDescriptor>();
}

@end

// 导出组件类
Class<RCTComponentViewProtocol> CustomButtonCls(void)
{
  return CustomButtonView.class;
}
```

**关键点**：
- 继承 `RCTViewComponentView`（Fabric 基类）
- 实现 `<RCTCustomButtonViewProtocol>` 协议（Codegen 生成）
- 在 `updateProps` 中处理属性更新
- 使用 `CustomButtonProps` 访问属性（Codegen 生成）
- 使用 `CustomButtonEventEmitter` 发送事件（Codegen 生成）
- `componentDescriptorProvider` 提供组件描述符
- 导出 `CustomButtonCls` 函数供 React Native 使用

#### 7.5 添加文件到 Xcode 项目

**⚠️ 重要**: iOS 原生文件必须手动添加到 Xcode 项目中。

##### 方法 1: 使用 Xcode GUI（推荐）

1. 打开 Xcode 项目：
   ```bash
   open ios/MyAwesome.xcworkspace
   ```

2. 在左侧项目导航器中，右键点击 `MyAwesome` 文件夹

3. 选择 **"Add Files to MyAwesome..."**

4. 选择以下文件：
   - `CacheManager.h`
   - `CacheManager.mm`
   - `Calculator.h`
   - `Calculator.mm`
   - `VersionInfo.h`
   - `VersionInfo.mm`
   - `CustomButtonView.h`
   - `CustomButtonView.mm`

5. 确保勾选：
   - ✅ **"Copy items if needed"**
   - ✅ **"Create groups"**
   - ✅ **Target: MyAwesome**

6. 点击 **"Add"**

##### 方法 2: 修改 project.pbxproj（高级）

编辑 `ios/MyAwesome.xcodeproj/project.pbxproj`，添加文件引用。

**注意**: 本项目已经修复了文件路径问题，确保路径为：
```
path = MyAwesome/Calculator.h;
path = MyAwesome/Calculator.mm;
path = MyAwesome/CacheManager.h;
path = MyAwesome/CacheManager.mm;
path = MyAwesome/VersionInfo.h;
path = MyAwesome/VersionInfo.mm;
path = MyAwesome/CustomButtonView.h;
path = MyAwesome/CustomButtonView.mm;
```

##### 验证文件已添加

在 Xcode 中：
1. 选择项目根节点
2. 选择 **MyAwesome** target
3. 点击 **"Build Phases"** 标签
4. 展开 **"Compile Sources"**
5. 确认看到：
   - ✅ `CacheManager.mm`
   - ✅ `Calculator.mm`
   - ✅ `VersionInfo.mm`
   - ✅ `CustomButtonView.mm`

#### 7.6 安装 Pods 和构建

```bash
cd ios

# 清理旧的 Pods（可选）
rm -rf Pods Podfile.lock

# 安装 Pods（会自动运行 Codegen）
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

cd ..
```

**关键点**：
- `RCT_NEW_ARCH_ENABLED=1` 启用新架构
- Pod install 会自动运行 Codegen
- 生成的文件在 `build/generated/ios/`

### 🎨 8. React 包装组件和 Demo 界面

#### 8.1 CustomButton React 组件

**文件**: `src/components/CustomButton.tsx`

```typescript
import React from 'react';
import type { ViewProps } from 'react-native';
import CustomButtonNativeComponent from '../specs/CustomButtonNativeComponent';

interface CustomButtonProps extends ViewProps {
  text?: string;
  color?: string;
  disabled?: boolean;
  cornerRadius?: number;
  onPress?: (event: { nativeEvent: { timestamp: number } }) => void;
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <CustomButtonNativeComponent {...props} />;
};
```

#### 8.2 完整 Demo 界面

**文件**: `src/screens/CodegenDemoScreen.tsx`

包含完整的交互式 Demo，展示：

- **Calculator 测试**
  - 加减乘除运算
  - 错误处理（除以零）
  - 获取数学常量（PI、E）
  - 实时结果显示

- **CustomButton 测试**
  - 动态修改文本
  - 颜色选择器（6种预设颜色）
  - 圆角调节（0-20）
  - 禁用状态切换
  - 点击事件处理
  - 点击次数统计
  - 时间戳显示

- **美观 UI**
  - 现代化卡片布局
  - 渐变背景
  - 阴影效果
  - 响应式设计
  - 交互式控件

在应用中导航到 **"Codegen"** 标签页即可查看和测试。

### 🚀 9. 运行和测试

#### 9.1 Android

```bash
# 1. 清理旧的构建（可选）
cd android
./gradlew clean
cd ..

# 2. 生成 Codegen 文件（可选，构建时会自动生成）
cd android
./gradlew generateCodegenArtifactsFromSchema
cd ..

# 3. 运行应用
npm run android
# 或
yarn android
# 或
pnpm android
```

**使用便捷脚本**：

```bash
# 完整重建（清理 + 构建 + 运行）
./rebuild-android.sh
```

#### 9.2 iOS

```bash
# 1. 安装 Ruby 依赖（首次运行）
bundle install

# 2. 清理旧的构建（可选）
cd ios
rm -rf Pods Podfile.lock
rm -rf ~/Library/Developer/Xcode/DerivedData/MyAwesome-*
cd ..

# 3. 安装 Pods（会自动运行 Codegen）
cd ios
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
cd ..

# 4. 运行应用
npm run ios
# 或
yarn ios
# 或
pnpm ios
```

**使用便捷脚本**：

```bash
# 完整清理重建
./rebuild-ios-clean.sh

# 或使用 setup 脚本
./setup-ios-codegen.sh
```

#### 9.3 验证 Codegen 是否成功

##### Android

检查生成的文件：

```bash
# 检查 Turbo Module 规范
ls android/app/build/generated/source/codegen/java/com/myawesome/specs/
# 应该看到: NativeCalculatorSpec.java, NativeCacheManagerSpec.java, NativeVersionInfoSpec.java

# 检查 Fabric Component 接口
ls android/app/build/generated/source/codegen/java/com/facebook/react/viewmanagers/
# 应该看到: CustomButtonManagerInterface.java, CustomButtonManagerDelegate.java

# 检查 C++ 代码
ls android/app/build/generated/source/codegen/jni/
# 应该看到: MyAwesomeSpec.h, MyAwesomeSpec-generated.cpp
```

##### iOS

检查生成的文件：

```bash
# 检查 Codegen 输出
ls build/generated/ios/
# 应该看到: MyAwesomeSpec/, Package.swift, ReactCodegen/

# 检查 Turbo Module 规范
ls build/generated/ios/MyAwesomeSpec/
# 应该看到: MyAwesomeSpec.h, MyAwesomeSpec-generated.mm

# 检查 Fabric Component
ls build/generated/ios/react/renderer/components/MyAwesomeSpec/
# 应该看到: Props.h, EventEmitters.h, ComponentDescriptors.h
```

#### 9.4 测试功能

1. **启动应用**
2. **导航到 "Codegen" 标签页**
3. **测试 Calculator**：
   - 点击 "Add 5 + 3" → 应显示结果 8
   - 点击 "Divide 10 / 2" → 应显示结果 5
   - 点击 "Divide 10 / 0" → 应显示错误信息
   - 点击 "Get PI" → 应显示 3.14159...
4. **测试 CustomButton**：
   - 修改文本 → 按钮文字应更新
   - 选择颜色 → 按钮颜色应改变
   - 调节圆角 → 按钮圆角应变化
   - 切换禁用 → 按钮应变灰且不可点击
   - 点击按钮 → 应显示点击次数和时间戳
5. **测试缓存管理**：
   - 打开抽屉导航的设置页
   - 缓存区域应显示当前 App 缓存大小和更新时间
   - 点击 "清空缓存" → 缓存大小应重新读取并更新
6. **测试版本信息**：
   - 打开抽屉导航
   - 抽屉底部应显示真实应用版本，例如 `版本 1.0 (1)`
   - Android 版本来自 `versionName/versionCode`
   - iOS 版本来自 `CFBundleShortVersionString/CFBundleVersion`

> 新增或修改原生模块后，需要重新编译并安装 App。仅刷新 Metro 不会把新的 Android/iOS 原生代码加载到手机上。

### ✅ 10. 验证清单

在提交代码前，确保完成以下步骤：

#### TypeScript 层
- [x] TypeScript spec 文件已创建（`src/specs/`）
- [x] 文件命名符合规范（`Native*.ts` 或 `*NativeComponent.ts`）
- [x] CacheManager 规范已创建（`NativeCacheManager.ts`）
- [x] VersionInfo 规范已创建（`NativeVersionInfo.ts`）
- [x] 使用正确的 Codegen 类型（`Double`、`Int32` 等）
- [x] 事件使用 `BubblingEventHandler`（避免 direct/bubbling 冲突）
- [x] Codegen 配置已添加到 `package.json`

#### Android 层
- [x] Turbo Module 实现已创建（继承 `*Spec`）
- [x] CacheManager Module 已创建并注册
- [x] VersionInfo Module 已创建并注册
- [x] Fabric Component ViewManager 已创建（实现 `*Interface`）
- [x] Fabric Component View 已创建
- [x] Package 已创建（继承 `TurboReactPackage`）
- [x] Package 已在 `MainApplication.kt` 中注册
- [x] Codegen 文件已生成（`build/generated/`）

#### iOS 层
- [x] Turbo Module 实现已创建（`.h` 和 `.mm`）
- [x] CacheManager 原生文件已添加到 Xcode 项目
- [x] VersionInfo 原生文件已添加到 Xcode 项目
- [x] Fabric Component 实现已创建（`.h` 和 `.mm`）
- [x] **原生文件已添加到 Xcode 项目**
- [x] 文件路径正确（`MyAwesome/Calculator.mm` 等）
- [x] Pods 已安装（`pod install`）
- [x] Codegen 文件已生成（`build/generated/ios/`）

#### 测试验证
- [x] Android 应用可以成功构建和运行
- [x] iOS 应用可以成功构建和运行
- [x] Calculator 模块功能正常
- [x] CacheManager 模块可通过 Codegen 生成
- [x] VersionInfo 模块可通过 Codegen 生成
- [x] CustomButton 组件功能正常
- [x] 事件处理正常工作
- [x] 错误处理正常工作
- [x] Demo 界面显示正常

### � 11. 故障排除

#### 问题 1: "Event cannot be both direct and bubbling: topPress"

**原因**: 使用了 `DirectEventHandler` 而不是 `BubblingEventHandler`

**解决方案**:
```typescript
// ❌ 错误
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
onPress?: DirectEventHandler<OnPressEvent>;

// ✅ 正确
import type { BubblingEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
onPress?: BubblingEventHandler<OnPressEvent>;
```

然后重新生成 Codegen：
```bash
rm -rf build
npm run codegen
```

#### 问题 2: iOS 构建错误 "Build input file cannot be found"

**原因**: 原生文件未添加到 Xcode 项目，或路径不正确

**解决方案**:

1. 检查 `project.pbxproj` 中的文件路径：
   ```
   path = MyAwesome/Calculator.mm;  // ✅ 正确
   path = Calculator.mm;            // ❌ 错误
   ```

2. 在 Xcode 中重新添加文件：
   - 打开 `ios/MyAwesome.xcworkspace`
   - 右键点击 MyAwesome 文件夹 → Add Files
   - 选择 `.h` 和 `.mm` 文件
   - 确保勾选 "Copy items if needed" 和正确的 Target

3. 验证文件在 Build Phases 中：
   - 选择 MyAwesome target
   - Build Phases → Compile Sources
   - 确认看到 `.mm` 文件

#### 问题 3: Android 构建错误 "Cannot find symbol: NativeCalculatorSpec"

**原因**: Codegen 未运行或生成的文件未被识别

**解决方案**:

```bash
# 1. 清理构建
cd android
./gradlew clean

# 2. 手动生成 Codegen
./gradlew generateCodegenArtifactsFromSchema

# 3. 检查生成的文件
ls app/build/generated/source/codegen/java/com/myawesome/specs/

# 4. 重新构建
./gradlew assembleDebug
cd ..
```

#### 问题 4: Android 构建错误 "Unresolved reference: NativeVersionInfoSpec"

**原因**: `VersionInfoModule.kt` 导入了错误的 Codegen 包，或者 Codegen 输出还没有刷新。

**解决方案**:

1. 检查导入路径：
   ```kotlin
   // ✅ 正确
   import com.myawesome.specs.NativeVersionInfoSpec

   // ❌ 错误
   import com.facebook.fbreact.specs.NativeVersionInfoSpec
   ```

2. 重新生成 Codegen 并清理 Android 构建：
   ```bash
   npm run codegen
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. 确认生成文件存在：
   ```bash
   ls android/app/build/generated/source/codegen/java/com/myawesome/specs/
   # 应看到 NativeVersionInfoSpec.java
   ```

#### 问题 5: "Module 'Calculator' is not registered"

**原因**: 模块未在 Package 中注册

**解决方案**:

检查 `MyAwesomePackage.kt`:
```kotlin
override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
        CalculatorModule.NAME -> CalculatorModule(reactContext)  // ✅ 确保这行存在
        else -> null
    }
}
```

检查 `MainApplication.kt`:
```kotlin
packageList = PackageList(this).packages.apply {
    add(MyAwesomePackage())  // ✅ 确保这行存在
}
```

#### 问题 6: iOS Codegen 文件未生成

**原因**: Pod install 未启用新架构

**解决方案**:

```bash
cd ios

# 清理
rm -rf Pods Podfile.lock

# 启用新架构安装
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

cd ..
```

或在 `Podfile` 中设置：
```ruby
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
```

#### 问题 7: TypeScript 类型错误

**原因**: 使用了 Codegen 不支持的类型

**解决方案**:

```typescript
// ❌ 错误
timestamp: number;

// ✅ 正确
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';
timestamp: Double;
```

#### 问题 8: Metro bundler 缓存问题

**解决方案**:

```bash
# 清除 Metro 缓存
npm start -- --reset-cache

# 或
yarn start --reset-cache
```

#### 问题 9: Android NDK 版本不匹配

**解决方案**:

检查 `android/build.gradle`:
```groovy
ext {
    ndkVersion = "26.1.10909125"  // 确保与本地 NDK 版本一致
}
```

查看本地 NDK 版本：
```bash
ls $ANDROID_HOME/ndk/
```

#### 问题 10: iOS 链接错误 "Undefined symbols"

**原因**: Codegen 生成的文件未被链接

**解决方案**:

```bash
cd ios

# 清理 DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/MyAwesome-*

# 重新安装 Pods
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

# 在 Xcode 中 Clean Build Folder (Cmd + Shift + K)

cd ..
```

#### 问题 11: 事件数据类型错误

**原因**: 事件数据使用了错误的类型

**解决方案**:

```typescript
// ❌ 错误 - 使用 number
type OnPressEvent = Readonly<{
  timestamp: number;
  count: number;
}>;

// ✅ 正确 - 使用 Codegen 类型
import type { Double, Int32 } from 'react-native/Libraries/Types/CodegenTypes';

type OnPressEvent = Readonly<{
  timestamp: Double;
  count: Int32;
}>;
```

### 📚 12. 学习资源和参考文档

#### 官方文档
- [React Native Codegen 官方文档](https://reactnative.dev/docs/the-new-architecture/pillars-codegen)
- [Turbo Native Modules 指南](https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules)
- [Fabric Native Components 指南](https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components)
- [新架构概览](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [Codegen 类型系统](https://reactnative.dev/docs/next/the-new-architecture/cxx-cxxturbomodules)

#### 项目内文档
- [iOS 原生文件设置指南](./IOS_NATIVE_FILES_SETUP.md) - 如何将 iOS 原生文件添加到 Xcode 项目
- [iOS 设置完成文档](./IOS_SETUP_COMPLETE.md) - iOS 配置验证清单
- [快速开始指南](./QUICK_START.md) - 项目快速上手

#### 便捷脚本
- `rebuild-android.sh` - Android 完整重建脚本
- `rebuild-ios-clean.sh` - iOS 清理重建脚本
- `setup-ios-codegen.sh` - iOS Codegen 设置脚本

#### 示例代码位置
- **TypeScript 规范**: `src/specs/`
- **Android 实现**: `android/app/src/main/java/com/myawesome/`
- **iOS 实现**: `ios/MyAwesome/`
- **React 组件**: `src/components/CustomButton.tsx`
- **Demo 界面**: `src/screens/CodegenDemoScreen.tsx`

### 🎓 13. 关键概念总结

#### Codegen 工作流程

```
1. 编写 TypeScript 规范
   ↓
2. 配置 package.json
   ↓
3. 运行 Codegen 生成代码
   ↓
4. 实现原生代码（Android/iOS）
   ↓
5. 注册模块/组件
   ↓
6. 在 React 中使用
```

#### Turbo Module vs Fabric Component

| 特性 | Turbo Module | Fabric Component |
|------|-------------|------------------|
| **用途** | 原生功能调用 | 原生 UI 组件 |
| **文件命名** | `Native*.ts` | `*NativeComponent.ts` |
| **基类** | `TurboModule` | `ViewProps` |
| **Android 实现** | 继承 `*Spec` | ViewManager + View |
| **iOS 实现** | 实现 `<*Spec>` 协议 | 继承 `RCTViewComponentView` |
| **示例** | 计算器、存储、网络 | 按钮、视频播放器、地图 |

#### 类型映射

| JavaScript | TypeScript Spec | Android | iOS | C++ |
|-----------|----------------|---------|-----|-----|
| `number` (整数) | `Int32` | `int` | `NSInteger` | `int32_t` |
| `number` (浮点) | `Double` | `double` | `double` | `double` |
| `string` | `string` | `String` | `NSString*` | `std::string` |
| `boolean` | `boolean` | `boolean` | `BOOL` | `bool` |
| `Promise<T>` | `Promise<T>` | `Promise` | `RCTPromise*` | - |
| `Array<T>` | `ReadonlyArray<T>` | `ReadableArray` | `NSArray*` | `std::vector<T>` |
| `Object` | `Readonly<{...}>` | `ReadableMap` | `NSDictionary*` | `std::map` |

#### 事件处理

| 事件类型 | 行为 | Android 注册 | iOS 发射 |
|---------|------|-------------|---------|
| `BubblingEventHandler` | 冒泡到父组件 | `topEventName` | `EventEmitter->onEventName()` |
| `DirectEventHandler` | 不冒泡 | `topEventName` | `EventEmitter->onEventName()` |

**注意**: 大多数情况下使用 `BubblingEventHandler`，避免 "Event cannot be both direct and bubbling" 错误。

### 🎯 14. 最佳实践

#### ✅ 推荐做法

1. **命名规范**
   - Turbo Module: `NativeXxx.ts`
   - Fabric Component: `XxxNativeComponent.ts`
   - 保持命名一致性

2. **类型安全**
   - 始终使用 Codegen 类型（`Int32`、`Double` 等）
   - 不要使用原生 JavaScript 类型（`number`）
   - 使用 `WithDefault<T, default>` 设置默认值

3. **错误处理**
   - 在原生代码中验证输入
   - 使用 `Promise.reject()` 返回错误
   - 提供清晰的错误消息

4. **事件设计**
   - 使用 `BubblingEventHandler` 作为默认选择
   - 事件数据使用 `Readonly<{...}>` 包装
   - 保持事件数据简单和扁平

5. **代码组织**
   - 将规范文件放在 `src/specs/`
   - 为每个平台创建独立的实现文件
   - 使用 Package 统一管理模块注册

#### ❌ 避免的陷阱

1. **不要**直接使用 `number` 类型在事件中
2. **不要**忘记在 Package 中注册模块
3. **不要**在 iOS 中忘记添加文件到 Xcode 项目
4. **不要**混用 `DirectEventHandler` 和 `BubblingEventHandler`
5. **不要**在 Codegen 后忘记重新构建应用

### � 15. 下一步扩展

基于本项目的 Codegen 实现，你可以：

1. **添加更多 Turbo Modules**
   - 文件系统操作
   - 设备信息获取
   - 加密/解密功能
   - 数据库操作

2. **创建更多 Fabric Components**
   - 视频播放器
   - 地图组件
   - 图表组件
   - 自定义输入框

3. **优化性能**
   - 使用 Turbo Module 替代旧的 Native Module
   - 使用 Fabric Component 替代旧的 Native Component
   - 利用新架构的同步调用能力

4. **集成第三方库**
   - 为现有原生库创建 Codegen 规范
   - 迁移旧的 Native Module 到 Turbo Module
   - 迁移旧的 Native Component 到 Fabric Component

---

## �📖 补充文档

- [iOS 原生文件设置指南](./IOS_NATIVE_FILES_SETUP.md) - 如何将 iOS 原生文件添加到 Xcode 项目
- [Jotai + Axios 网络请求指南](./JOTAI_AXIOS_GUIDE.md) - 状态管理和网络请求最佳实践
- [Drawer Navigator 示例](./DRAWER_NAVIGATOR_EXAMPLE.md) - 抽屉导航的完整实现

---

**🎉 恭喜！你已经掌握了 React Native Codegen 的完整实现流程！**
