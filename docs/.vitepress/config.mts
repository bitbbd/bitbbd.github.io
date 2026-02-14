import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  
  title: "bbd factory",
  description: "bbd factory studio",
  themeConfig: {
    outline: {
      label: '本页内容'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
      "text": "示例",
      "items": [
        {
          "text": "Markdown 示例",
          "link": "/markdown-examples"
        },
        {
          "text": "运行时 API 示例",
          "link": "/api-examples"
        }
      ]
    },
    { text: '随便写写', link: '/random/' },
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
          { text: 'Config.mts 配置详解', link: '/random/config-guide' },
          { text: '部署到 GitHub Pages', link: '/random/deploy-github-pages' },
          { text: '今日 Qoder 使用体验', link: '/random/qoder-experience' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer:{
        copyright: "&copy; bbd factory",
}
  }
})
