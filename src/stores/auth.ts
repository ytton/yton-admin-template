import { defineStore, storeToRefs } from 'pinia'
import { shallowRef } from 'vue'
import { login } from '@/api/auth'
import { loginResult } from '@/api/types/auth'
const storeModules = import.meta.glob(['@/stores/*', '!**/index.js'], { eager: true })
const store = defineStore(
  'auth',
  () => {
    const userInfo = shallowRef<loginResult>()

    const loginAction = (user: string, pwd: string) => {
      return login(user, pwd).then((res) => {
        userInfo.value = res
      })
    }
    const logoutAction = () => {
      //重置所有store
      for (const path in storeModules) {
        ;(<any>storeModules)[path].default().$reset()
      }
    }

    return {
      userInfo,
      loginAction,
      logoutAction,
    }
  },
  { persist: true }
)

export default store
export function useAuthStore() {
  const s = store()
  return {
    ...s,
    ...storeToRefs(s),
  }
}
