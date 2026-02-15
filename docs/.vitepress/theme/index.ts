import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
import './style.css'

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

export default theme
