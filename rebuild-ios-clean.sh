#!/bin/bash

echo "🧹 完全清理 iOS 构建..."

# 停止 Metro
echo "停止 Metro bundler..."
pkill -f "node.*metro" 2>/dev/null || true

# 清理 iOS 构建
echo "清理 Xcode 构建..."
cd ios
xcodebuild clean -workspace MyAwesome.xcworkspace -scheme MyAwesome > /dev/null 2>&1
rm -rf build
cd ..

# 清理 DerivedData
echo "清理 DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/MyAwesome-* 2>/dev/null || true

# 清理 Metro 缓存
echo "清理 Metro 缓存..."
rm -rf $TMPDIR/metro-* 2>/dev/null || true
rm -rf $TMPDIR/haste-* 2>/dev/null || true

# 重新安装 Pods
echo "重新安装 Pods..."
cd ios
RCT_NEW_ARCH_ENABLED=1 pod install
cd ..

echo ""
echo "✅ 清理完成！"
echo ""
echo "现在运行: pnpm ios"
echo "或者在 Xcode 中按 Cmd+R"
