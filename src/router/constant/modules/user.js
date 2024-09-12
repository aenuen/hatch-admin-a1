import Layout from '@/components/Layout'

export const user = {
  path: '/user',
  name: 'user',
  component: Layout,
  redirect: '/user/list',
  meta: {
    title: '用户管理',
    icon: 'peoples',
    roles: ['manager'],
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () => import('@/views/constant/user/list'),
      meta: {
        title: '用户列表',
        roles: ['manager'],
      },
    },
    {
      path: 'create',
      name: 'userCreate',
      component: () => import('@/views/constant/user/create'),
      meta: {
        title: '新建用户',
        roles: ['manager'],
      },
    },
    {
      path: 'update/:id',
      name: 'userUpdate',
      component: () => import('@/views/constant/user/update'),
      meta: {
        title: '用户编辑',
        roles: ['manager'],
        activeMenu: '/user/list',
      },
      hidden: true,
    },
    {
      path: 'data',
      name: 'personalData',
      component: () => import('@/views/constant/user/data'),
      meta: {
        title: '个人资料',
      },
      hidden: true,
    },
  ],
}
