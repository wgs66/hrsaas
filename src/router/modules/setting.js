import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  meta: {
    id: 'settings' // 用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      name: 'settings',
      component: () => import('@/views/setting'),
      meta: { title: 'setting', icon: 'setting' }
    }
  ]
}
