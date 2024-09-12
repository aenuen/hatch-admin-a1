// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/libs/utils/token'
import { apiBaseUrl, successCode, tokenCode } from './settings'

const service = axios.create({ // 创建一个axios实例
  baseURL: apiBaseUrl,
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 5000 // 超时时间
})

// 请求拦截器 request interceptor
service.interceptors.request.use(
  config => {
    store.getters.token && (config.headers['authorization'] = `Bearer ${getToken()}`)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 response interceptor
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== successCode) {
    const errMsg = res.msg || '请求失败！'
    Message({ message: errMsg, type: 'error', duration: 5 * 1000 })
    if (res.code === -2) {
      MessageBox.confirm('您已注销，可以取消以停留在此页面，或重新登录', '确认登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/removeToken').then(() => { location.reload() })
      })
    }
    return Promise.reject(new Error(errMsg))
  } else {
    return res
  }
}, error => { // 状态非200才会到这里来
  const { code, msg } = error.response.data
  Message({ message: msg || '', type: 'error', duration: 5 * 1000 })
  if (code === tokenCode) {
    setTimeout(() => { location.reload() }, 1000)
  }
  return Promise.reject(error)
})

export default service
