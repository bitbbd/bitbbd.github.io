<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const currentLocale = ref('')
const isOpen = ref(false)

// 获取当前语言
const getCurrentLocale = () => {
  const path = route.path
  if (path.startsWith('/en/')) {
    return 'en'
  }
  return 'zh-CN'
}

// 初始化语言
onMounted(() => {
  console.log('LocaleSwitcher mounted!')
  currentLocale.value = getCurrentLocale()
  
  // 检测浏览器语言并自动切换
  const browserLang = navigator.language || navigator.userLanguage
  if (!localStorage.getItem('vitepress-language')) {
    if (browserLang.startsWith('en') && currentLocale.value === 'zh-CN') {
      switchLocale('en')
    } else if (browserLang.startsWith('zh') && currentLocale.value === 'en') {
      switchLocale('zh-CN')
    }
  }
})

// 切换语言
const switchLocale = (locale) => {
  localStorage.setItem('vitepress-language', locale)
  
  // 获取完整的 URL 信息
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
  
  // 组合完整 URL（移除重复的斜杠）
  const fullUrl = newPath.replace(/\/+/g, '/') + search + hash
  console.log('Current:', pathname, '-> New:', newPath, 'Full:', fullUrl)
  window.location.href = fullUrl
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <div 
    class="locale-switcher" 
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <button 
      class="locale-button"
      :title="currentLocale === 'en' ? '中文' : 'English'"
    >
      <span class="locale-label">{{ currentLocale === 'en' ? 'EN' : '中' }}</span>
    </button>
    
    <Transition name="fade">
      <div v-show="isOpen" class="locale-dropdown">
        <button 
          class="locale-option" 
          :class="{ active: currentLocale === 'zh-CN' }"
          @click="switchLocale('zh-CN')"
        >
          <span>中文</span>
        </button>
        <button 
          class="locale-option" 
          :class="{ active: currentLocale === 'en' }"
          @click="switchLocale('en')"
        >
          <span>English</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.locale-switcher {
  position: relative;
  display: inline-flex;
}

.locale-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
}

.locale-button:hover {
  background: var(--vp-c-hover-bg);
  border-color: var(--vp-c-brand);
}

.locale-label {
  font-weight: 600;
}

.locale-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  padding: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
  z-index: 100;
  min-width: 100px;
}

.locale-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 13px;
  text-align: center;
  transition: background 0.2s ease;
}

.locale-option:hover {
  background: var(--vp-c-hover-bg);
}

.locale-option.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
