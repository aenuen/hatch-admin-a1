// 异步加载

import { article } from './modules/article'
import { link } from './modules/link'
import { reader } from './modules/reader'
import { user } from './modules/user'
import { dict } from './modules/dict'
import { icons } from './modules/icons'
const asyncRoutes = [
  article,
  reader,
  link,
  user,
  dict,
  icons,
  { path: '*', redirect: '/404', hidden: true }, // 无页面=404页面
]

export default asyncRoutes
