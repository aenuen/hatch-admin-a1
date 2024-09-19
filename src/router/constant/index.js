import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 固定加载
import { home } from './modules/home'
import { login, http, auth } from './modules/login'
import { ep401, ep404 } from './modules/errorPage'

export const constantRoutes = [
  login, // 登录
  http, // 身份重定向
  auth, // 网址重定向
  ep401, // 401页面
  ep404, // 404页面
  home, // 首页
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
