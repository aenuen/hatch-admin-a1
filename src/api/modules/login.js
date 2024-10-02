import request from '@/libs/axios/request'
const item = 'login'
export const login = {
  // 用户信息
  info: () => request({ url: `/${item}/info`, method: 'get' }),
  // 用户是否第一次登录
  isFirst: () => request({ url: `/${item}/isFirst`, method: 'get' }),
  // 登录
  login: (data) => request({ url: `/${item}/login`, method: 'post', data }),
  // 重置token
  refreshToken: (data) => request({ url: `/${item}/refreshToken`, method: 'post', data }),
  // 登出
  logout: () => request({ url: `/${item}/logout`, method: 'post' }),
}
