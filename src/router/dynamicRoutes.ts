import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/sys',
    name: 'System',
    children: [
      {
        path: '/sys/users',
        name: 'User',
        component: () => import('@/views/users/User.vue'),
        meta: {
          roles: ['root', 'admin'],
          menu: true,
          title: '用户管理',
          icon: 'icon-user',
        },
      },
      {
        path: '/sys/roles',
        name: 'Role',
        component: () => import('@/views/roles/Role.vue'),
        meta: {
          roles: ['root', 'admin'],
          menu: true,
          title: '角色管理',
          icon: 'icon-robot',
        },
      },
      {
        path: '/sys/perms',
        name: 'Perm',
        component: () => import('@/views/perms/Perm.vue'),
        meta: {
          roles: ['root', 'admin'],
          menu: true,
          title: '权限管理',
          icon: 'icon-robot',
        },
      },
    ],
    meta: {
      roles: ['root', 'admin'],
      menu: true,
      title: '系统管理',
      icon: 'icon-tag',
    },
  },
  {
    path: '/tags',
    name: 'Tag',
    component: () => import('@/views/tags/Tag.vue'),
    meta: {
      roles: ['root', 'admin', 'user'],
      menu: true,
      title: '标签管理',
      icon: 'icon-tag',
    },
  },
]

export default routes
