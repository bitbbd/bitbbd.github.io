import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  
  title: "bbd factory",
  description: "bbd factory studio",

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'bbd factory',
      description: 'bbd factory studio',
      label: '中文'
    },
    '/en/': {
      lang: 'en',
      title: 'bbd factory',
      description: 'bbd factory studio',
      label: 'English'
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        "text": '示例',
        "items": [
          { "text": 'Markdown 示例', "link": '/markdown-examples' },
          { "text": '运行时 API 示例', "link": '/api-examples' }
        ]
      },
      { text: '随便写写', link: '/random/' }
    ],
  
    sidebar: {
      '/': [
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
            { text: '今日 Qoder 使用体验', link: '/random/qoder-experience' },
            { text: 'VitePress 国际化排查', link: '/random/vitepress-i18n-debug' }
          ]
        }
      ],
      '/en/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/en/markdown-examples' },
            { text: 'API Examples', link: '/en/api-examples' }
          ]
        },
        {
          text: 'Random',
          items: [
            { text: 'Manual', link: '/en/random/manual' },
            { text: 'Config Guide', link: '/en/random/config-guide' },
            { text: 'Deploy to GitHub Pages', link: '/en/random/deploy-github-pages' },
            { text: 'Qoder Experience', link: '/en/random/qoder-experience' },
            { text: 'VitePress i18n Debug', link: '/en/random/vitepress-i18n-debug' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer:{
        copyright: "&copy; bbd factory",
    }
  }
})
