# 防止代码丢失 - 完整指南

## 问题回顾

**症状：**
- 修改任务完成后，界面渲染失败（502错误）
- 重启服务器后，之前修改的内容全部丢失
- 从Git或OSS恢复也无法彻底恢复

**根本原因：**
1. 文件写入后未同步到磁盘（停留在内存缓存）
2. 服务器崩溃/重启时，内存中的修改丢失
3. Git未能及时commit，导致没有历史记录
4. 缺乏实时备份机制

---

## 预防措施

### 1. 关键修改后立即执行"安全保存"

在每次重要修改完成后，执行：

```bash
# 方法1: 使用安全保存脚本
bash /home/z/my-project/scripts/safe-save.sh "修改说明"

# 方法2: 手动执行
sync && sync                                    # 同步文件系统
git add -A && git commit -m "修改说明"           # Git提交
```

### 2. AI助手操作规范

**要求AI助手在以下时机执行安全保存：**
- ✅ 每完成一个功能模块
- ✅ 每次文件写入操作后
- ✅ 任务切换前
- ✅ 预感可能有问题时

### 3. 定期备份策略

```bash
# 查看本地备份
ls -la /home/z/my-project-backups/

# 恢复最新备份
tar -xzf /home/z/my-project-backups/backup_最新时间戳.tar.gz -C /home/z/my-project/
```

### 4. 检查文件是否真正写入

```bash
# 检查文件是否存在
ls -la src/components/你的模块/

# 检查文件内容
cat src/components/你的模块/组件.tsx

# 检查Git状态
git status
```

---

## 紧急恢复流程

### 情况1: 文件丢失但Git有记录
```bash
git log --oneline                    # 查看提交历史
git checkout 提交hash -- 文件路径     # 恢复特定文件
```

### 情况2: Git也无记录，使用本地备份
```bash
ls -lt /home/z/my-project-backups/   # 查看备份列表
tar -tzf 备份文件.tar.gz              # 查看备份内容
tar -xzf 备份文件.tar.gz -C /临时目录/  # 解压到临时目录
# 然后复制需要的文件
```

### 情况3: 完全丢失
需要重新创建文件，并立即执行安全保存。

---

## 502错误排查

当遇到502错误时：

1. **不要立即重启服务器**
   ```bash
   # 先检查错误日志
   tail -100 /home/z/my-project/dev.log
   
   # 检查服务器进程
   ps aux | grep next
   ```

2. **定位错误原因**
   ```bash
   # 运行代码检查
   bun run lint
   
   # 查看具体错误
   cat /home/z/my-project/dev.log | grep -i error
   ```

3. **修复错误后再重启**
   ```bash
   # 确保文件已保存
   sync
   
   # 重启服务器
   pkill -f "next dev"
   bun run dev &
   ```

---

## 最佳实践总结

| 操作 | 命令 | 时机 |
|------|------|------|
| 同步文件系统 | `sync` | 每次写入后 |
| Git提交 | `git add -A && git commit -m "说明"` | 每个功能完成后 |
| 创建备份 | `bash scripts/safe-save.sh "说明"` | 重要修改后 |
| 检查状态 | `git status && ls -la 目录` | 修改验证时 |

---

## 给AI助手的指令模板

在给AI助手下达任务时，可以添加以下要求：

```
请按以下流程执行：
1. 修改文件后，立即执行 `sync` 确保写入磁盘
2. 使用 `ls -la` 和 `cat` 验证文件已正确创建
3. 完成后执行 `git add -A && git commit -m "说明"`
4. 再次执行 `sync`
5. 检查服务器日志确认无错误
```

---

## 技术说明

### 为什么需要 `sync`？

- Linux文件系统有写入缓存机制
- 文件写入先到内存缓存，再异步写入磁盘
- 如果在缓存刷新前崩溃/重启，修改会丢失
- `sync` 命令强制将缓存写入磁盘

### 为什么Git提交也可能丢失？

- Git commit只更新了Git仓库数据库
- 如果在磁盘同步前重启，commit可能不完整
- 因此需要 `sync` + `git commit` + `sync` 三步确保安全

---

*文档版本: 1.0*
*最后更新: 2024年3月25日*
