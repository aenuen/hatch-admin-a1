import Layout from '@/components/Layout'

export const link = {
  path: '/link',
  name: 'link',
  component: Layout,
  redirect: '/link/list',
  meta: {
    title: '链接管理',
    icon: 'link',
    roles: ['manager'],
  },
  children: [
    {
      path: 'list',
      name: 'link-list',
      component: () => import('@/views/link/list'),
      meta: {
        title: '链接列表',
        roles: ['manager'],
      },
    },
    {
      path: 'create',
      name: 'link-create',
      component: () => import('@/views/link/create'),
      meta: {
        title: '链接添加',
        roles: ['manager'],
      },
    },
    {
      path: 'update/:id',
      name: 'link-update',
      component: () => import('@/views/link/update'),
      meta: {
        title: '链接编辑',
        roles: ['manager'],
        activeMenu: '/link/list',
      },
      hidden: true,
    },
  ],
}
