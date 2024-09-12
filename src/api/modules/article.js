import request from '@/libs/axios/request'
import qs from 'qs'
export const article = {
  list: (params) => request({ url: '/article/list?' + qs.stringify(params), method: 'get' }), // 列表
  detail: (params) => request({ url: '/article/detail?' + qs.stringify(params), method: 'get' }) // 详情
}
