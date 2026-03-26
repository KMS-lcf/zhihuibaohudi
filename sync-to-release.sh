#!/bin/bash

# 同步代码到发布目录的脚本
# 每次修改代码后执行此脚本

set -e

echo "🔄 开始同步代码到发布目录..."

# 源目录
SRC_DIR="/home/z/my-project"
# 发布目录（远程存储）
RELEASE_DIR="/tmp/my-project"

# 1. 同步源文件
echo "📦 同步源文件..."
rsync -av --exclude='.next' --exclude='node_modules' --exclude='.git' "$SRC_DIR/src/" "$RELEASE_DIR/src/"

# 2. 同步配置文件
echo "📋 同步配置文件..."
cp "$SRC_DIR/next.config.ts" "$RELEASE_DIR/"
cp "$SRC_DIR/package.json" "$RELEASE_DIR/"
cp "$SRC_DIR/.env" "$RELEASE_DIR/"

# 3. 执行构建
echo "🔨 执行构建..."
cd "$SRC_DIR"
bun run build

# 4. 复制构建产物
echo "📦 复制构建产物..."
rm -rf "$RELEASE_DIR/.next/standalone" 2>/dev/null || true
mkdir -p "$RELEASE_DIR/.next/standalone/.next"
cp -r "$SRC_DIR/.next/standalone/"* "$RELEASE_DIR/.next/standalone/"
cp -r "$SRC_DIR/.next/static" "$RELEASE_DIR/.next/standalone/.next/"
cp -r "$SRC_DIR/public" "$RELEASE_DIR/.next/standalone/"
cp "$SRC_DIR/.env" "$RELEASE_DIR/.next/standalone/"

# 5. 强制同步到远程存储
echo "💾 同步到远程存储..."
sync

echo ""
echo "✅ 同步完成！"
echo "📊 构建产物大小:"
du -sh "$RELEASE_DIR/.next/standalone/"
