import Layout from '@/components/Layout'

export const dict = {
  path: '/dict',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'dict-list',
      component: () => import('@/views/dict/list'),
      meta: {
        title: '词典管理',
        icon: 'dict',
        roles: ['admin'],
        noCache: true,
      },
    },
  ],
}
