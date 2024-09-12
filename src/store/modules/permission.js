import { constantRoutes } from '@/router/constant'
import asyncRoutes from '@/router/async'

// 使用元角色确定当前用户是否有权限
function hasPermission(roles, route) {
  // 没有填写则默认就有权限，要有meta.roles的话，只要命中任何一个就有权限
  return route.meta && route.meta.roles ? roles.some(role => route.meta.roles.includes(role)) : true
}

// 递归过滤异步路由表
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route } // 进行前拷贝
    if (hasPermission(roles, tmp)) {
      tmp.children && (tmp.children = filterAsyncRoutes(tmp.children, roles)) // 循环筛选子目录
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes // 备份
    state.routes = constantRoutes.concat(routes) // 固定和异步路由进行合并
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 要是admin直接赋权限，否则去循环筛选
      const accessedRoutes = roles.includes('admin') ? (asyncRoutes || []) : filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
