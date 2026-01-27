#!/bin/bash
# 本地部署脚本

set -e

ACTION=${1:-"sync"}
PRODUCT=${2:-"all"}

SERVER_HOST="${SERVER_HOST:-your-server.com}"
SERVER_USER="${SERVER_USER:-deploy}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/static-sites}"

case $ACTION in
  sync)
    if [ "$PRODUCT" == "all" ]; then
      echo "Syncing all products..."
      rsync -avz --delete --exclude='.git*' \
        products/ ${SERVER_USER}@${SERVER_HOST}:${DEPLOY_PATH}/
    else
      echo "Syncing product: $PRODUCT"
      rsync -avz --delete --exclude='.git*' \
        products/${PRODUCT}/ ${SERVER_USER}@${SERVER_HOST}:${DEPLOY_PATH}/${PRODUCT}/
    fi
    ;;
  reload)
    echo "Reloading nginx..."
    ssh ${SERVER_USER}@${SERVER_HOST} "docker exec static-sites nginx -s reload"
    ;;
  full)
    $0 sync all
    $0 reload
    ;;
  *)
    echo "Usage: $0 {sync|reload|full} [product]"
    exit 1
    ;;
esac

echo "Done!"
