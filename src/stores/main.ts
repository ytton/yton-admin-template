import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
const store = defineStore('main', () => {
  const count = ref(0)
  const updateCount = (val: number) => (count.value = val)
  return {
    count,
    updateCount,
  }
})

export const useMainStore = () => {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
