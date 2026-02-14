# VitePress Config.mts 配置详解

## 文件概述

`docs/.vitepress/config.mts` 是 VitePress 项目的核心配置文件，使用 ES 模块语法（.mts 扩展名表示 TypeScript 模块），用于定义站点的全局设置、主题配置、导航菜单等。

## 基础结构

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点基础配置
  title: "站点标题",
  description: "站点描述",
  
  // 主题配置
  themeConfig: {
    // 导航栏配置
    nav: [],
    
    // 侧边栏配置
    sidebar: [],
    
    // 社交链接
    socialLinks: [],
    
    // 页脚配置
    footer: {}
  }
})
```

## 站点基础配置

### title（站点标题）

定义站点的标题，显示在浏览器标签页和页面头部。

```typescript
title: "bbd factory"
```

### description（站点描述）

定义站点的描述，用于 SEO 优化。

```typescript
description: "bbd factory studio"
```

### base（基础路径）

如果站点部署在子路径下，需要配置此项：

```typescript
base: '/sub-path/'
```

### appearance（外观设置）

控制是否启用深色模式切换：

```typescript
appearance: true  // 默认值，启用深色模式
appearance: false // 禁用深色模式
```

## 主题配置详解

### 导航栏（nav）

导航栏位于页面顶部，支持单级和多级菜单：

#### 单级菜单

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '文档', link: '/guide/' }
]
```

#### 多级菜单

```typescript
nav: [
  {
    text: '示例',
    items: [
      { text: 'Markdown 示例', link: '/markdown-examples' },
      { text: 'API 示例', link: '/api-examples' }
    ]
  }
]
```

#### 混合菜单

```typescript
nav: [
  { text: '首页', link: '/' },
  {
    text: '文档',
    items: [
      { text: '入门指南', link: '/guide/start' },
      { text: '进阶配置', link: '/guide/advanced' }
    ]
  },
  { text: '外部链接', link: 'https://example.com' }
]
```

### 侧边栏（sidebar）

侧边栏提供页面导航，可按目录分组：

#### 简单侧边栏

```typescript
sidebar: [
  { text: '介绍', link: '/introduction' },
  { text: '快速开始', link: '/quick-start' }
]
```

#### 分组侧边栏

```typescript
sidebar: [
  {
    text: '指南',
    items: [
      { text: '介绍', link: '/guide/introduction' },
      { text: '安装', link: '/guide/install' }
    ]
  },
  {
    text: '配置',
    items: [
      { text: '基本配置', link: '/config/basic' },
      { text: '高级配置', link: '/config/advanced' }
    ]
  }
]
```

#### 基于路径的侧边栏

```typescript
sidebar: {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/guide/introduction' },
        { text: '安装', link: '/guide/install' }
      ]
    }
  ],
  '/config/': [
    {
      text: '配置',
      items: [
        { text: '基本配置', link: '/config/basic' },
        { text: '高级配置', link: '/config/advanced' }
      ]
    }
  ]
}
```

### 社交链接（socialLinks）

在侧边栏底部显示社交图标链接：

```typescript
socialLinks: [
  { icon: 'github', link: 'https://github.com/username/repo' },
  { icon: 'twitter', link: 'https://twitter.com/username' },
  { icon: 'discord', link: 'https://discord.gg/invite-code' },
  { 
    icon: {
      svg: '<svg>...</svg>'  // 自定义 SVG 图标
    },
    link: 'https://example.com'
  }
]
```

### 页脚配置（footer）

```typescript
footer: {
  message: 'Released under the MIT License.',
  copyright: 'Copyright © 2023-present bbd factory'
}
```

## 高级配置选项

### markdown 配置

```typescript
markdown: {
  // 配置代码块语言别名
  langs: ['ts', 'js', 'html'],
  
  // 启用行号
  lineNumbers: true,
  
  // 配置代码块主题
  theme: {
    light: 'github-light',
    dark: 'github-dark'
  },
  
  // 自定义锚点配置
  anchor: {
    permalink: false  // 禁用标题锚点
  }
}
```

### vite 配置

```typescript
vite: {
  // 自定义 Vite 配置
  server: {
    host: true
  },
  build: {
    minify: 'terser'
  }
}
```

### sitemap 配置

```typescript
sitemap: {
  hostname: 'https://yoursite.com'
}
```

## 实际配置示例

以下是当前项目的完整配置示例：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "bbd factory",
  description: "bbd factory studio",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: "示例",
        items: [
          {
            text: "Markdown 示例",
            link: "/markdown-examples"
          },
          {
            text: "运行时 API 示例",
            link: "/api-examples"
          }
        ]
      },
      { text: '随便写写', link: '/random/' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: '运行时 API 示例', link: '/api-examples' }
        ]
      },
      {
        text: '随便写写',
        items: [
          { text: '项目操作手册', link: '/random/manual' },
          { text: '第一篇随笔', link: '/random/post1' },
          { text: '第二篇随笔', link: '/random/post2' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
    footer: {
      copyright: "&copy; bbd factory"
    }
  }
})
```

## 注意事项

1. 配置文件修改后需要重启开发服务器才能生效
2. 确保所有链接路径正确，避免出现 404 错误
3. 在多语言站点中，可能需要根据语言配置不同的导航结构
4. 使用 TypeScript 时，IDE 会提供类型检查和自动补全功能
5. 可以使用环境变量来区分开发和生产环境的配置

## 常见问题

### 配置不生效

检查配置文件语法是否正确，确保 export default 语句没有错误。

### 路径问题

确保所有链接路径以 `/` 开头，并且目标文件确实存在。

### 热重载失效

有时配置文件更改可能不会立即反映，需要手动重启开发服务器。