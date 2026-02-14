# 部署到 GitHub Pages 指南

## 概述

本文档将详细介绍如何将 VitePress 项目编译为静态文件，并部署到 GitHub Pages 服务，创建如 `yourusername.github.io` 或 `yourusername.github.io/repository-name` 的网站。

## 准备工作

### 1. 创建 GitHub 仓库

在开始部署之前，您需要准备一个 GitHub 仓库：

- 对于用户/组织页面：创建名为 `username.github.io` 的仓库（其中 username 是您的 GitHub 用户名）
- 对于项目页面：可以使用任意仓库名称

### 2. 设置 GitHub Pages

在 GitHub 仓库设置中启用 GitHub Pages 功能：

1. 进入仓库的 Settings 页面
2. 向下滚动到 "Pages" 部分
3. 在 "Source" 下拉菜单中选择部署源（通常是 "Deploy from a branch"）
4. 选择分支（通常是 `gh-pages` 或 `main` 的 `/docs` 文件夹）

## 配置项目

### 1. 修改配置文件

根据您的部署需求修改 `docs/.vitepress/config.mts` 文件：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 如果部署到子路径，需要设置 base
  base: '/repository-name/', // 替换为您的仓库名，如果是用户名.github.io则设为 '/'
  
  title: "bbd factory",
  description: "bbd factory studio",
  
  themeConfig: {
    // ... 其他配置
  }
})
```

### 2. 设置构建输出目录

默认情况下，VitePress 会将静态文件构建到 `.vitepress/dist` 目录。您也可以在配置中指定输出目录：

```typescript
export default defineConfig({
  // ... 其他配置
  
  outDir: '../dist',  // 设置构建输出目录
  assetsDir: 'assets' // 设置资源文件目录
})
```

## 构建静态文件

### 1. 构建项目

在项目根目录执行以下命令构建静态文件：

```bash
npm run docs:build
```

此命令将在 `.vitepress/dist` 目录生成所有静态文件，包括 HTML、CSS、JavaScript 和静态资源。

### 2. 验证构建结果

您可以使用以下命令预览构建结果：

```bash
npm run docs:preview
```

这将启动一个本地服务器来预览构建后的静态文件。

## 部署方法

### 方法一：使用 GitHub Actions（推荐）

创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run docs:build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 方法二：手动部署

#### 步骤 1：推送代码到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

#### 步骤 2：创建 gh-pages 分支

```bash
git checkout -b gh-pages
npm run docs:build
```

#### 步骤 3：将构建文件提交到 gh-pages 分支

```bash
# 删除除 dist 目录外的所有文件
git add -f docs/.vitepress/dist
git commit -m "Add built site files"

# 将 dist 目录的内容移动到根目录
git filter-branch --prune-empty --subdirectory-filter docs/.vitepress/dist main
git push -u origin gh-pages
```

### 方法三：使用脚本自动化部署

创建 `deploy.sh` 脚本（适用于 Linux/macOS）：

```bash
#!/usr/bin/env sh

# 确保脚本在发生错误时退出
set -e

# 构建
npm run docs:build

# 进入构建输出目录
cd docs/.vitepress/dist

# 如果要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# 将更改推送到 GitHub 上的 gh-pages 分支
git push -f https://github.com/username/repository-name.git master:gh-pages

cd -
```

对于 Windows 用户，可以创建 `deploy.bat`：

```batch
@echo off
call npm run docs:build

cd docs\.vitepress\dist

if exist ".git" rmdir /s /q ".git"
git init
git add -A
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/username/repository-name.git
git push -f origin master:gh-pages

cd ../..
pause
```

## 配置 GitHub Pages

在 GitHub 仓库的 Settings -> Pages 中，确保源设置为 `gh-pages` 分支。

## 自定义域名（可选）

如果您想使用自定义域名：

1. 在项目根目录（或 docs 目录，取决于您的 GitHub Pages 设置）创建 `CNAME` 文件
2. 在文件中添加您的域名，例如：`example.com`
3. 在您的域名注册商处配置 DNS 记录指向 GitHub Pages

## 常见问题

### 1. 资源加载失败

如果部署后图片或其他资源无法加载，请检查：

- 静态资源路径是否正确
- 是否设置了正确的 `base` 路径

### 2. 路由问题

如果页面刷新后出现 404 错误，请确认：

- GitHub Pages 已正确配置
- 没有错误的重定向规则

### 3. 自定义域问题

- 确保 CNAME 文件格式正确（每行一个域名）
- DNS 记录生效可能需要几分钟到几小时

## 维护更新

一旦设置好部署流程，每次更新内容只需：

1. 修改文档
2. 提交更改到 main 分支（如果使用 GitHub Actions）
3. 系统将自动构建并部署

## 总结

通过以上步骤，您可以轻松地将 VitePress 文档站点部署到 GitHub Pages，创建一个免费且可靠的静态网站。推荐使用 GitHub Actions 自动化部署，这样每次提交更改后都会自动更新网站。

祝您部署顺利！