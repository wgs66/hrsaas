import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  meta: { id: 'import' },

  hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/import')
      // meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
