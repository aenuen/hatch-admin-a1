import Layout from '@/components/Layout'

const iconsRouter = {
  path: '/svgIcon',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'iconsIndex',
      component: () => import('@/views/constant/icons'),
      meta: {
        title: '图标浏览',
        icon: 'icon',
        roles: ['admin'],
        noCache: true
      }
    }
  ]
}

export default iconsRouter
