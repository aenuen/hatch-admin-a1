// noinspection JSUnresolvedFunction

import router from './router/constant'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/libs/utils/token'
import pageTitle from '@/libs/utils/pageTitle'

NProgress.configure({ showSpinner: false }) // 隐藏右侧旋转的小圆环
const whiteList = ['/login', '/auth-redirect'] // 设置白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = pageTitle(to.meta.title) // 设置title
  const hasToken = getToken() // 从cookie中去拿token
  if (hasToken) { // 有token
    if (to.path === '/login') {
      next({ path: '/' }) // 目标是登录页面直接进入首页
      NProgress.done()
    } else { //
      const hasRoles = store.getters.roles && store.getters.roles.length > 0 // 去拿角色
      if (hasRoles) { // 有角色直接进去
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo') // 没有角色去拿一次角色
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles) // 生成动态路由
          router.addRoutes(accessRoutes) // 添加异步路由，和固定路由进行合并 位置：store/modules/permission/actions
          next({ ...to, replace: true }) // 前往目标页面，replace:true 后面的页面不会再回到login页面，而是空白页面
        } catch (error) {
          await store.dispatch('user/removeToken') // 重置token 位置：store/modules/user/removeToken
          Message.error(error || '有错误') // 提示错误
          next(`/login?redirect=${to.path}`) // 重新回到登录页面
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在白名单中
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则中转带参数跳转到登录页面
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
