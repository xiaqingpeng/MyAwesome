#!/bin/bash

echo "🍎 Rebuilding iOS..."

# Clean build
echo "🧹 Cleaning build..."
cd ios
xcodebuild clean -workspace MyAwesome.xcworkspace -scheme MyAwesome > /dev/null 2>&1
rm -rf build
cd ..

# Clean DerivedData
echo "🗑️  Cleaning DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/MyAwesome-* 2>/dev/null || true

echo "✅ Clean complete!"
echo ""
echo "Now run: pnpm ios"
