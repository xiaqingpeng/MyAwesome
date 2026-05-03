#!/bin/bash

echo "🧹 Cleaning Android build..."

# Clean Android
cd android
./gradlew clean
rm -rf app/build/intermediates
cd ..

echo "🔨 Generating Codegen artifacts..."

# Generate Codegen
cd android
./gradlew generateCodegenArtifactsFromSchema
cd ..

echo "📦 Building and installing app..."

# Build and install
pnpm android

echo "✅ Done! App should be running."
echo ""
echo "If you still see errors:"
echo "1. Stop Metro bundler (Ctrl+C)"
echo "2. Run: ./start-metro.sh -- --reset-cache"
echo "3. In another terminal, run: pnpm android"
