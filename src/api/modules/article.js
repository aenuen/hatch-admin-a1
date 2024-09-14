import request from '@/libs/axios/request'
import qs from 'qs'
export const article = {
  list: (params) => request({ url: '/article/list?' + qs.stringify(params), method: 'get' }), // 列表
  detail: (params) => request({ url: '/article/detail?' + qs.stringify(params), method: 'get' }), // 详情
  image: (data) => request({ url: '/article/image', method: 'post', data }), // 上传图片
  imageList: (data) => request({ url: '/article/imageList', method: 'post', data }), // 详情
}
