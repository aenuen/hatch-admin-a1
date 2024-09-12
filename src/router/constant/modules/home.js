import Layout from '@/components/Layout'
// 首页
export const home = {
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [
    {
      component: () => import('@/views/constant/home'),
      path: 'home',
      name: 'home',
      meta: { title: '首页', icon: 'chart', affix: true }
    }
  ]
}
