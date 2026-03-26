@echo off
chcp 65001 >nul
echo ================================================
echo 🚀 智慧保护地系统 - 每日启动
echo ================================================
echo.

REM 检查服务器是否已经运行
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ℹ️  开发服务器已在运行
) else (
    echo 🔧 启动开发服务器...
    start /min npm run dev
    echo ✅ 开发服务器启动中...
    echo     窗口已最小化到后台
    echo.
    echo ⏳ 等待10秒让服务器启动...
    timeout /t 10 /nobreak >nul
)

echo.
echo 🌐 启动 Cloudflare Tunnel...
echo.

REM 启动 cloudflared
C:\ngrok\cloudflared.exe tunnel --url http://localhost:3000

pause
