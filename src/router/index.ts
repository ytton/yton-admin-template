import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Layout from '@/layout/Layout.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import dynamicRoutes from './dynamicRoutes'
import { useMenu, userHasRole } from '@/hooks/auth'
import { h } from 'vue'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Layout',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          menu: true,
          title: '仪表盘',
          icon: 'icon-user',
        },
      },
      ...dynamicRoutes,
      {
        path: '/403',
        name: 'Forbidden',
        component: h(ErrorPage, { message: 'Forbidden 403' }),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ErrorPage,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(async (to, from) => {
  const { userInfo } = useAuthStore()
  //认证判断
  if ((!userInfo.value || !userInfo.value.accessToken) && to.name !== 'Login') {
    return '/login?from=' + to.fullPath
  }
  //权限判断
  if (to.meta.roles && !(to.meta.roles as string[]).some(userHasRole)) {
    return '403'
  }
})

export default router
