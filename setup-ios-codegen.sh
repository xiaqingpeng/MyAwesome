#!/bin/bash

set -e  # 遇到错误立即退出

echo "🍎 iOS Codegen 设置脚本"
echo "======================="
echo ""

# 检查是否安装了 xcodeproj gem
if ! gem list xcodeproj -i > /dev/null 2>&1; then
    echo "📦 Installing xcodeproj gem..."
    gem install xcodeproj
    echo ""
fi

# 检查原生文件是否存在
echo "🔍 Checking native files..."
files=(
    "ios/MyAwesome/Calculator.h"
    "ios/MyAwesome/Calculator.mm"
    "ios/MyAwesome/CustomButtonView.h"
    "ios/MyAwesome/CustomButtonView.mm"
)

all_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_exist=false
    fi
done
echo ""

if [ "$all_exist" = false ]; then
    echo "❌ Some files are missing. Please check the file paths."
    exit 1
fi

# 运行 Ruby 脚本添加文件到 Xcode 项目
echo "📝 Adding files to Xcode project..."
ruby add-ios-files.rb
echo ""

# 清理 iOS 构建
echo "🧹 Cleaning iOS build..."
cd ios
xcodebuild clean -workspace MyAwesome.xcworkspace -scheme MyAwesome > /dev/null 2>&1 || true
rm -rf build
rm -rf ~/Library/Developer/Xcode/DerivedData/MyAwesome-* 2>/dev/null || true
cd ..
echo "✅ Clean complete"
echo ""

# 重新安装 Pods（会触发 Codegen）
echo "📦 Installing Pods (this will run Codegen)..."
cd ios
RCT_NEW_ARCH_ENABLED=1 pod install
cd ..
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Verify in Xcode: open ios/MyAwesome.xcworkspace"
echo "2. Build and run: pnpm ios"
echo ""
echo "If you still see errors, try:"
echo "  - Clean Metro cache: ./start-metro.sh -- --reset-cache"
echo "  - Rebuild in Xcode: Cmd+Shift+K then Cmd+B"
