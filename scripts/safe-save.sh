#!/bin/bash
# 安全保存脚本 - 防止代码丢失
# 使用方法: ./scripts/safe-save.sh "提交说明"

PROJECT_DIR="/home/z/my-project"
BACKUP_DIR="/home/z/my-project-backups"

# 1. 同步文件系统，确保所有写入操作完成
echo "📁 同步文件系统..."
sync
sync

# 2. 创建本地备份（带时间戳）
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
fi

echo "💾 创建本地备份..."
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='dev.log' \
    -C "$PROJECT_DIR" .

# 保留最近10个备份
ls -t "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | tail -n +11 | xargs -r rm

# 3. Git提交（如果提供了提交说明）
if [ -n "$1" ]; then
    echo "📝 Git提交: $1"
    cd "$PROJECT_DIR"
    git add -A
    git commit -m "$1"
    git push origin master 2>/dev/null || echo "⚠️ 无法推送到远程仓库"
fi

# 4. 再次同步
sync

echo "✅ 安全保存完成！"
echo "   - 本地备份: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
echo "   - 备份数量: $(ls -1 "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | wc -l)"
