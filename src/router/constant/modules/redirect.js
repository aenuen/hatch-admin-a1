import Layout from '@/components/Layout'

export const http = {
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('@/views/constant/redirect/http'),
    },
  ],
}
export const auth = {
  path: '/auth-redirect',
  component: () => import('@/views/constant/redirect/auth'),
  hidden: true,
}
