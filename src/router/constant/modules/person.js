import Layout from '@/components/Layout'

export const person = {
  path: '/person',
  name: 'person',
  component: Layout,
  redirect: '/person/list',
  meta: {
    title: '个人管理',
    icon: 'peoples',
    roles: ['manager'],
  },
  children: [
    {
      path: '',
      name: 'person-data',
      component: () => import('@/views/constant/person'),
      meta: {
        title: '用户资料',
      },
      hidden: true,
    },
  ],
}
