import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 固定加载
import { home } from './modules/home'
import { login, register, find } from './modules/login'
import { person } from './modules/person'
import { http, auth } from './modules/redirect'
import { ep401, ep404 } from './modules/errorPage'

export const constantRoutes = [
  home, // 首页
  login, // 登录
  register, // 注册
  find, // 找回密码
  person, // 个人中心
  http, // 身份重定向
  auth, // 网址重定向
  ep401, // 401页面
  ep404, // 404页面
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
