import Layout from '@/components/Layout'

export const icons = {
  path: '/svgIcon',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'savIcon',
      component: () => import('@/views/constant/icons'),
      meta: {
        title: '图标浏览',
        icon: 'icon',
        roles: ['admin'],
        noCache: true,
      },
    },
  ],
}
