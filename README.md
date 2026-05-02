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
├── src/
│   ├── components/          # 可复用组件
│   │   ├── TabBarIcon.tsx
│   │   └── TabBarIconSvg.tsx      # SVG 图标组件
│   ├── navigation/          # 导航配置
│   │   ├── TopTabsNavigator.tsx
│   │   └── types.ts
│   ├── screens/            # 页面组件
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── FeedScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   └── NetworkDemoScreen.tsx   # 网络请求演示 ⭐
│   ├── services/           # 服务层
│   │   └── api.ts                  # Axios 配置和 API 方法
│   ├── store/              # 状态管理
│   │   └── networkAtoms.ts         # Jotai 原子状态
│   ├── AppCombined.tsx     # 组合导航示例 ⭐ 当前使用
│   ├── AppWithTopTabs.tsx  # 顶部标签示例
│   ├── AppWithDrawer.tsx   # 抽屉导航示例
│   └── AppWithDrawerAndTabs.tsx # 抽屉+标签组合
├── android/                # Android 原生代码
├── ios/                    # iOS 原生代码
├── JOTAI_AXIOS_GUIDE.md   # Jotai + Axios 使用指南
├── DRAWER_GUIDE.md        # 抽屉导航指南
├── NAVIGATION_COMPARISON.md # 导航方案对比
├── QUICK_START.md         # 快速开始指南
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
