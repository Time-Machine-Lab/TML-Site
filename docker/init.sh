#!/bin/bash
# 初始化脚本：生成自签名证书并启动容器
# 用法: ./init.sh

set -e

CERT_DIR="/etc/ssl/certs/tmlab.site"
CERT_FILE="$CERT_DIR/fullchain.pem"
KEY_FILE="$CERT_DIR/privkey.pem"

echo "=== 初始化 static-sites 服务 ==="

# 步骤1: 创建证书目录并生成自签名证书
if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
    echo "[跳过] 证书已存在: $CERT_DIR"
else
    echo "[执行] 创建证书目录..."
    mkdir -p "$CERT_DIR"

    echo "[执行] 生成自签名证书..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$KEY_FILE" \
        -out "$CERT_FILE" \
        -subj "/CN=*.tmlab.site" \
        2>/dev/null

    echo "[完成] 自签名证书已生成"
fi

# 步骤2: 启动容器
echo "[执行] 启动 Docker 容器..."
docker-compose up -d

echo ""
echo "=== 初始化完成 ==="
echo "服务已启动，可通过 HTTP 访问"
echo ""
echo "下一步: 在 AllinSSL 配置证书部署"
echo "  - 证书路径: $CERT_FILE"
echo "  - 私钥路径: $KEY_FILE"
echo "  - 部署后命令: docker exec static-sites nginx -s reload"
