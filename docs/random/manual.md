# BitDDD 项目操作手册

## 项目概述

BitDDD 是一个基于 VitePress 构建的文档站点项目，主要用于展示和管理各类文档内容。项目采用模块化设计，便于扩展和维护。

## 项目结构

```
docs/
├── .vitepress/          # VitePress 配置文件
├── api-examples.md      # API 示例文档
├── index.md            # 主页
├── markdown-examples.md # Markdown 示例
├── random/             # 随笔文档目录
│   ├── index.md        # 随笔主页
│   ├── post1.md        # 第一篇随笔
│   ├── post2.md        # 第二篇随笔
│   └── manual.md       # 本操作手册
└── ...
```

## 常规操作

### 1. 启动开发服务器

```bash
npm install  # 安装依赖
npm run docs:dev  # 启动开发服务器
```

开发服务器默认运行在 http://localhost:5173

### 2. 构建静态文件

```bash
npm run docs:build  # 构建生产版本
```

构建后的文件会存放在 `.vitepress/dist` 目录

### 3. 预览构建结果

```bash
npm run docs:preview  # 预览构建后的静态文件
```

## 添加新文档

### 1. 创建新页面

在适当目录下创建 `.md` 文件，例如：

```bash
# 在 random 目录下创建新文档
touch docs/random/new-post.md
```

### 2. 页面头部配置

每个页面可以包含 YAML frontmatter 配置：

```yaml
---
title: 页面标题
description: 页面描述
outline: deep  # 显示深度大纲
---
```

### 3. 更新导航菜单

编辑 `docs/.vitepress/config.mts` 文件以添加新的导航项：

```typescript
nav: [
  // 其他导航项...
  { text: '新菜单', link: '/new-path/' },
],

sidebar: [
  // 其他侧边栏项...
  {
    text: '新分类',
    items: [
      { text: '新页面', link: '/new-path/page' }
    ]
  }
]
```

## Markdown 语法

### 标题

使用 `#` 符号创建标题：

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 文本样式

```markdown
*斜体*
**粗体**
***粗斜体***
~~删除线~~
==高亮==
```

### 列表

有序列表：

```markdown
1. 第一项
2. 第二项
3. 第三项
```

无序列表：

```markdown
- 项目一
- 项目二
  - 子项目
```

### 代码块

行内代码：`console.log('Hello World')`

代码块：

````markdown
```javascript
function hello() {
  console.log('Hello World');
}
```
````

### 自定义容器

```markdown
::: info
这是一条信息
:::

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块
:::
```

## 项目维护

### 修改主题配置

编辑 `docs/.vitepress/config.mts` 文件来修改网站标题、描述、导航等配置。

### 添加自定义样式

可以在 `docs/.vitepress/theme` 目录下创建自定义组件和样式。

### 部署

构建完成后，将 `.vitepress/dist` 目录下的文件部署到静态服务器即可。

## 故障排除

### 本地无法启动

如果启动失败，请尝试：

1. 清除缓存：删除 `.vitepress/cache` 目录
2. 重新安装依赖：`npm install`
3. 使用不同端口：`npx vitepress dev docs --port 3000`

注意：在生产环境中，请使用实际域名而非 localhost 地址。

### 构建失败

检查是否有语法错误，特别是 YAML frontmatter 的格式是否正确。

### 热重载不生效

重启开发服务器通常能解决问题。

## 版本更新

当 VitePress 有新版本时，可通过以下命令更新：

```bash
npm update vitepress
```

然后检查配置文件是否需要相应调整。