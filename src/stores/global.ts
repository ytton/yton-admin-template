import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
const store = defineStore('global', () => {
  const theme = ref<'light' | 'dark'>('light')
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.className = theme.value
    document.body.setAttribute('arco-theme', theme.value)
  }

  const isCollapseMenu = ref(false)
  const toggleCollapseMenu = () => (isCollapseMenu.value = !isCollapseMenu.value)
  const isShowFooter = ref(false) //footer默认50px写死的
  const updateIsShowFooter = (value: boolean) => (isShowFooter.value = value)
  return {
    theme,
    toggleTheme,
    isCollapseMenu,
    toggleCollapseMenu,
    isShowFooter,
    updateIsShowFooter,
  }
})

export default store
export const useGlobalStore = () => {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
