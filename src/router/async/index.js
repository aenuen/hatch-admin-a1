// 异步加载

import { article } from './modules/article'
import { dict } from './modules/dict'
import { icons } from './modules/icons'
const asyncRoutes = [
  article,
  dict,
  icons,
  { path: '*', redirect: '/404', hidden: true }, // 无页面=404页面
]

export default asyncRoutes
