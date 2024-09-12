import Layout from '@/components/Layout'

const approvalRouter = {
  path: '/approval', name: 'approval', component: Layout, redirect: '/approval/list',
  meta: {
    title: '项目立项',
    icon: 'peoples',
    roles: ['approval']
  },
  children: [
    {
      path: 'list', name: 'approvalList', component: () => import('@/views/approval/list'),
      meta: {
        title: '立项列表',
        roles: ['approval']
      }
    },
    {
      path: 'create', name: 'approvalCreate', component: () => import('@/views/approval/create'),
      meta: {
        title: '新建立项',
        roles: ['approval']
      }
    },
    {
      path: 'update/:id', name: 'approvalUpdate', component: () => import('@/views/approval/update'),
      meta: {
        title: '立项编辑',
        roles: ['approval'],
        activeMenu: '/approval/list'
      },
      hidden: true
    }
  ]
}

export default approvalRouter
