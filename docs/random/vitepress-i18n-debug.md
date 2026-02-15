---
outline: deep
---

# VitePress 国际化问题排查与修复

## 问题描述

在 VitePress 站点中实现多语言切换功能时，遇到了以下问题：

1. **TypeScript 报错**：`找不到模块"./components/LocaleSwitcher.vue"或其相应的类型声明`
2. **语言切换不生效**：点击切换语言按钮无反应
3. **导航栏国际化**：切换语言时顶部菜单文字未翻译

## 排查过程

### 问题一：TypeScript 找不到 .vue 模块

**错误信息**：
```
找不到模块"./components/LocaleSwitcher.vue"或其相应的类型声明。 ts(2307)
```

**原因分析**：
- `docs/.vitepress/theme/env.d.ts` 文件为空，缺少 Vue 模块的类型声明
- TypeScript 无法识别 `.vue` 文件

**解决方案**：
在 `env.d.ts` 中添加 Vue 模块声明：

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

### 问题二：语言切换按钮点击无反应

**排查步骤**：

1. **检查组件注册**
   - 发现 `index.ts` 中虽然使用了 `h(LocaleSwitcher)` 渲染组件
   - 但组件未正确注册到 Vue 应用

2. **修改组件注册方式**
   - 原来使用 `extends: DefaultTheme`，改为展开运算符 `...DefaultTheme`
   - 添加类型声明 `const theme: Theme`
   - 在 `enhanceApp` 中注册全局组件

```typescript
import type { Theme } from 'vitepress'

const theme: Theme = {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LocaleSwitcher)
    })
  },
  enhanceApp({ app }) {
    app.component('LocaleSwitcher', LocaleSwitcher)
  }
}
```

3. **调试日志**
   - 在组件中添加 `console.log` 确认组件是否挂载成功
   - 发现使用 `nav-bar-title-after` slot 不生效，改为 `nav-bar-content-after`

### 问题三：路径处理逻辑错误

**问题场景**：
- 从中文首页 `/` 切换到英文时，跳转到 `/en` 而不是 `/en/`
- 从英文页面切换回中文时，可能跳转回首页

**原因分析**：
- 原代码使用 `route.path` 直接处理，未考虑路径格式一致性
- 移除 `/en` 时使用 `replace('/en', '')` 会错误匹配路径

**修复后的路径处理逻辑**：

```typescript
const switchLocale = (locale) => {
  localStorage.setItem('vitepress-language', locale)
  
  const { pathname, search, hash } = window.location
  const currentPath = pathname.replace(/\/$/, '') || '/'
  
  let newPath = ''
  
  if (locale === 'en') {
    // 切换到英文：添加 /en 前缀
    if (currentPath === '/') {
      newPath = '/en/'
    } else {
      newPath = '/en' + currentPath + '/'
    }
  } else {
    // 切换到中文：移除 /en 前缀
    if (currentPath.startsWith('/en')) {
      newPath = currentPath.replace('/en', '')
      newPath = newPath.startsWith('/') ? newPath : '/' + newPath
    } else {
      newPath = currentPath + '/'
    }
  }
  
  const fullUrl = newPath.replace(/\/+/g, '/') + search + hash
  window.location.href = fullUrl
}
```

### 问题四：顶部导航栏国际化

**问题描述**：
切换语言时，顶部导航栏（nav）的文字没有翻译成对应的语言

**VitePress 限制**：
VitePress 的 `themeConfig.nav` 不支持根据语言自动切换，这是框架本身的限制

**解决方案**：

1. **侧边栏国际化**：使用路径匹配的 sidebar 配置

```typescript
sidebar: {
  '/': [
    { text: '示例', items: [...] },
    { text: '随便写写', items: [...] }
  ],
  '/en/': [
    { text: 'Examples', items: [...] },
    { text: 'Random', items: [...] }
  ]
}
```

2. **顶部导航栏**：保持使用统一的导航菜单，或通过自定义主题完全重写

## 最终效果

- 侧边栏会根据当前语言自动切换
- 自定义语言切换组件可以保留当前页面路径进行语言切换
- TypeScript 类型检查通过

## 相关文件

- `docs/.vitepress/theme/index.ts` - 主题入口文件
- `docs/.vitepress/theme/components/LocaleSwitcher.vue` - 语言切换组件
- `docs/.vitepress/theme/env.d.ts` - 类型声明文件
- `docs/.vitepress/config.mts` - 站点配置文件
