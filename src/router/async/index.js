// 异步加载
import company from './modules/company'
import approval from './modules/approval'
import lottery from './modules/lottery'
import icons from './modules/icons'
const asyncRoutes = [
  company,
  approval,
  lottery,
  icons,
  { path: '*', redirect: '/404', hidden: true } // 无页面=404页面
]

export default asyncRoutes
