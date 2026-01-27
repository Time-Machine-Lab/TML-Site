# TMLab Static Sites

多产品多版本静态页面自动化部署系统，支持子域名路由。

## 功能特性

- **多产品管理**: 每个产品独立目录，支持多版本
- **子域名路由**: `product.tmlab.site` 自动路由到对应产品
- **增量部署**: 只部署有变更的产品，节省时间
- **自动化**: 推送到 master 分支自动触发部署
- **Docker 容器化**: nginx 运行在 Docker 容器中

## 目录结构

```
tmlsite/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 部署工作流
├── docker/
│   ├── docker-compose.yml  # Docker 编排配置
│   └── nginx.conf          # Nginx 动态路由配置
├── products/               # 产品静态文件目录
│   └── demo/
│       └── v1/
│           └── index.html
├── scripts/
│   └── deploy.sh           # 本地部署脚本
└── README.md
```

## 快速开始

### 1. 添加新产品

在 `products/` 目录下创建产品文件夹：

```bash
mkdir -p products/my-product/v1
echo "<h1>My Product v1</h1>" > products/my-product/v1/index.html
```

### 2. 部署

提交并推送到 master 分支，GitHub Actions 会自动部署：

```bash
git add products/my-product
git commit -m "Add my-product v1"
git push origin master
```

### 3. 访问

部署完成后访问: `http://my-product.tmlab.site/v1/`

## GitHub Secrets 配置

在仓库 Settings > Secrets and variables > Actions 中配置：

| Secret | 说明 |
|--------|------|
| `SERVER_HOST` | 服务器地址 |
| `SERVER_USER` | SSH 用户名 |
| `SERVER_PASS` | SSH 密码 |

## 服务器端配置

### 1. 安装依赖

```bash
sudo apt-get install -y rsync docker.io docker-compose
```

### 2. 创建目录

```bash
sudo mkdir -p /var/www/static-sites
sudo mkdir -p /var/www/docker
```

### 3. 上传 Docker 配置

将 `docker/` 目录内容上传到服务器 `/var/www/docker/`

### 4. 启动 nginx 容器

```bash
cd /var/www/docker
docker-compose up -d
```

## 本地部署

使用本地脚本手动部署：

```bash
# 部署所有产品
./scripts/deploy.sh sync all

# 部署单个产品
./scripts/deploy.sh sync my-product

# 重载 nginx
./scripts/deploy.sh reload

# 完整部署（同步 + 重载）
./scripts/deploy.sh full
```

## 手动触发部署

在 GitHub Actions 页面可以手动触发部署：

1. 进入 Actions 页面
2. 选择 "Deploy Static Sites" 工作流
3. 点击 "Run workflow"
4. 勾选 "Force deploy all products" 可强制部署所有产品

## DNS 配置

配置通配符 DNS 记录：

```
*.tmlab.site  A  <服务器IP>
```
