import Layout from '@/components/Layout'

const managerRouter = {
  path: '/manager', name: 'manager', component: Layout, redirect: '/manager/list',
  meta: {
    title: '用户管理',
    icon: 'peoples',
    roles: ['manager']
  },
  children: [
    {
      path: 'list', name: 'managerList', component: () => import('@/views/aConstant/manager/list'),
      meta: {
        title: '用户列表',
        roles: ['manager']
      }
    },
    {
      path: 'create', name: 'managerCreate', component: () => import('@/views/aConstant/manager/create'),
      meta: {
        title: '新建用户',
        roles: ['manager']
      }
    },
    {
      path: 'update/:id', name: 'managerUpdate', component: () => import('@/views/aConstant/manager/update'),
      meta: {
        title: '用户编辑',
        roles: ['manager'],
        activeMenu: '/manager/list'
      },
      hidden: true
    },
    {
      path: 'data', name: 'personalData', component: () => import('@/views/aConstant/manager/data'),
      meta: {
        title: '个人资料'
      },
      hidden: true
    }
  ]
}

export default managerRouter
