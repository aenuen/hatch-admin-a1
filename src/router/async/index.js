// 异步加载

import icons from './modules/icons'
const asyncRoutes = [
  icons,
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
