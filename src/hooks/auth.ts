import { routes } from '@/router/index'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
export function useMenu() {
  return computed(() => {
    const menus = routes[0].children?.filter((route) => route.meta && route.meta.menu) ?? []
    const filterAuthMenu = menus.filter(
      (route: any) => !route.meta!.roles || route.meta!.roles.some(userHasRole)
    )
    return filterAuthMenu
  })
}
export function userHasRole(role: string) {
  const { userInfo } = useAuthStore()
  const userRoles = userInfo.value?.user.roles
  return userRoles!.findIndex((x) => x.name === role) !== -1
}
