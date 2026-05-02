#!/bin/bash

# Ensure we're using the correct Node.js version
export PATH="/Users/xiaqingpeng/.nvm/versions/node/v22.22.2/bin:$PATH"

echo "🔍 Checking Node.js version..."
node --version

echo "🧹 Clearing Metro cache..."
watchman watch-del-all 2>/dev/null || true
rm -rf $TMPDIR/react-* $TMPDIR/metro-* $TMPDIR/haste-* 2>/dev/null || true

echo "🚀 Starting Metro bundler with cache reset..."
npm start -- --reset-cache
