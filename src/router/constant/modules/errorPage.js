// 401页面
export const errorPage401Router = {
  path: '/401',
  component: () => import('@/views/constant/errorPage/401'),
  hidden: true
}

// 401页面
export const errorPage404Router = {
  path: '/404',
  component: () => import('@/views/constant/errorPage/404'),
  hidden: true
}
