import Layout from '@/components/Layout'

export const reader = {
  path: '/reader',
  name: 'reader',
  component: Layout,
  redirect: '/reader/list',
  meta: {
    title: '阅读管理',
    icon: 'reader',
    roles: ['manager'],
  },
  children: [
    {
      path: 'list',
      name: 'reader-list',
      component: () => import('@/views/reader/list'),
      meta: {
        title: '阅读列表',
        roles: ['manager'],
      },
    },
  ],
}
