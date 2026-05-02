#!/bin/bash

echo "🔄 完全重启应用..."

# 1. 停止所有相关进程
echo "⏹️  停止所有进程..."
pkill -f "react-native" || true
pkill -f "Metro" || true
pkill -f "node.*8081" || true

# 2. 清理所有缓存
echo "🧹 清理缓存..."
rm -rf /tmp/metro-* 2>/dev/null || true
rm -rf /tmp/haste-* 2>/dev/null || true
rm -rf /tmp/react-* 2>/dev/null || true
rm -rf $TMPDIR/react-* 2>/dev/null || true
rm -rf $TMPDIR/metro-* 2>/dev/null || true

# 3. 清理 watchman
echo "📡 重置 Watchman..."
watchman watch-del-all 2>/dev/null || true

# 4. 清理 iOS 构建
echo "🍎 清理 iOS 构建..."
rm -rf ios/build 2>/dev/null || true

# 5. 等待一下
sleep 2

echo ""
echo "✅ 清理完成！"
echo ""
echo "📝 下一步："
echo "1. 在一个终端运行: npm start -- --reset-cache"
echo "2. 等待 Metro 完全启动"
echo "3. 在另一个终端运行: npm run ios"
echo ""
echo "或者直接运行: npm run ios (会自动启动 Metro)"
