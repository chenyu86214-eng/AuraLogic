#!/bin/bash
# AuraLogic 本地服务器 + 公网隧道一键启动
# 用法: bash serve.sh          # 仅本地
#        bash serve.sh tunnel  # 本地 + 公网隧道

PORT=3000

# 结束旧进程
lsof -ti :$PORT 2>/dev/null | xargs kill -9 2>/dev/null
pkill -f serveo 2>/dev/null
sleep 0.5

# 启动 HTTP 服务器（后台）
cd "$(dirname "$0")"
python3 -m http.server $PORT &
SERVER_PID=$!
echo "🌐 本地服务器: http://localhost:$PORT"
echo "   (PID: $SERVER_PID)"

# 启动公网隧道（可选）
if [ "$1" = "tunnel" ]; then
  echo "⏳ 正在建立公网隧道..."
  ssh -o ServerAliveInterval=60 -R 80:localhost:$PORT serveo.net 2>&1 | head -3
fi

wait $SERVER_PID
