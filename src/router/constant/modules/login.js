import Layout from '@/components/Layout'

export const loginRouter = {
  path: '/login',
  component: () => import('@/views/aConstant/login'),
  hidden: true
}
export const httpRedirectRouter = {
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('@/views/aConstant/redirect/http')
    }
  ]
}
export const authRedirectRouter = {
  path: '/auth-redirect',
  component: () => import('@/views/aConstant/redirect/auth'),
  hidden: true
}
