export default {
  path: '/replaceMes',
  name: 'ReplaceMe',
  component: () => import('@/views/replaceMes/ReplaceMe.vue'),
  meta: {
    roles: ['admin', 'user'],
    menu: true,
    title: '标签管理',
    icon: 'icon-replaceMe',
  },
}
