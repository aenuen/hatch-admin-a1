import { someText } from './fields'
// 登录链接
export const logoLinksAry = [
  { name: someText.toRegister, url: '/register' },
  { name: someText.toFind, url: '/find' },
]
// 注册链接
export const registerLinksAry = [
  { name: someText.toLogin, url: '/login' },
  { name: someText.toFind, url: '/find' },
]
// 找回密码链接
export const findLinksAry = [
  { name: someText.toLogin, url: '/login' },
  { name: someText.toRegister, url: '/register' },
]
