#!/bin/bash

# 从备份恢复代码的脚本
# 使用方法: bash scripts/restore-backup.sh [backup_file_name]
# 如果不指定文件名，将使用最新的备份

BACKUP_DIR="/home/z/my-project-backups"
PROJECT_DIR="/home/z/my-project"

echo "=========================================="
echo "         代码恢复工具"
echo "=========================================="

# 列出可用的备份
echo ""
echo "可用的备份文件："
echo "------------------------------------------"
ls -lt "$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -20
echo "------------------------------------------"

if [ -z "$1" ]; then
    # 没有指定备份文件，使用最新的
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.tar.gz 2>/dev/null | head -1)
    if [ -z "$LATEST_BACKUP" ]; then
        echo "❌ 错误：没有找到备份文件！"
        exit 1
    fi
    BACKUP_FILE="$LATEST_BACKUP"
else
    # 使用指定的备份文件
    BACKUP_FILE="$BACKUP_DIR/$1"
    if [ ! -f "$BACKUP_FILE" ]; then
        echo "❌ 错误：备份文件不存在: $BACKUP_FILE"
        exit 1
    fi
fi

echo ""
echo "将使用备份文件: $(basename $BACKUP_FILE)"
echo ""

# 确认恢复
read -p "确定要恢复吗？这将覆盖当前代码！ (y/n): " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "已取消恢复"
    exit 0
fi

echo ""
echo "⏳ 正在恢复..."

# 解压备份
tar -xzf "$BACKUP_FILE" -C "$PROJECT_DIR"

if [ $? -eq 0 ]; then
    echo "✅ 备份已解压到项目目录"
    
    # 同步到磁盘
    sync
    echo "✅ 文件已同步到磁盘"
    
    echo ""
    echo "=========================================="
    echo "🎉 恢复完成！"
    echo "=========================================="
    echo ""
    echo "备份文件: $(basename $BACKUP_FILE)"
    echo "恢复时间: $(date '+%Y-%m-%d %H:%M:%S')"
    echo ""
    echo "注意：开发服务器会自动重启"
else
    echo "❌ 恢复失败！"
    exit 1
fi
