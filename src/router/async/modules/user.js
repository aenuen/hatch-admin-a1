import Layout from '@/components/Layout'

export const user = {
  path: '/user',
  name: 'user',
  component: Layout,
  redirect: '/user/list',
  meta: {
    title: '用户管理',
    icon: 'peoples',
    roles: ['user'],
  },
  children: [
    {
      path: 'list',
      name: 'user-list',
      component: () => import('@/views/constant/user/list'),
      meta: {
        title: '用户列表',
        roles: ['user'],
      },
    },
    {
      path: 'create',
      name: 'user-create',
      component: () => import('@/views/constant/user/create'),
      meta: {
        title: '用户添加',
        roles: ['user'],
      },
    },
    {
      path: 'update/:id',
      name: 'user-update',
      component: () => import('@/views/constant/user/update'),
      meta: {
        title: '用户编辑',
        roles: ['user'],
        activeMenu: '/user/list',
      },
      hidden: true,
    },
    {
      path: 'data',
      name: 'user-data',
      component: () => import('@/views/constant/user/data'),
      meta: {
        title: '用户资料',
      },
      hidden: true,
    },
  ],
}
