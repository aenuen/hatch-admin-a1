import Layout from '@/components/Layout'

const companyRouter = {
  path: '/company', name: 'company', component: Layout, redirect: '/company/list',
  meta: {
    title: '公司管理',
    icon: 'peoples',
    roles: ['company']
  },
  children: [
    {
      path: '', name: 'companyBaseData', component: () => import('@/views/company/index'),
      meta: {
        title: '企业基本资料'
      }
    }
  ]
}

export default companyRouter
