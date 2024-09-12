import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 固定加载
import homeRouter from './modules/home'
import { loginRouter, httpRedirectRouter, authRedirectRouter } from './modules/login'
import { errorPage401Router, errorPage404Router } from './modules/errorPage'
import managerRouter from './modules/manager'

export const constantRoutes = [
  loginRouter, // 登录
  authRedirectRouter, // 身份重定向
  httpRedirectRouter, // 网址重定向
  errorPage401Router, // 401页面
  errorPage404Router, // 404页面
  homeRouter, // 首页
  managerRouter // 管理员
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
