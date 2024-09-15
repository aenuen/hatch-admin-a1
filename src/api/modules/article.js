import request from '@/libs/axios/request'
import qs from 'qs'
export const article = {
  list: (params) => request({ url: '/article/list?' + qs.stringify(params), method: 'get' }), // 列表
  detail: (params) => request({ url: '/article/detail?' + qs.stringify(params), method: 'get' }), // 详情
  imageUpload: (data) => request({ url: '/article/imageUpload', method: 'post', data }), // 上传图片
  imageList: (data) => request({ url: '/article/imageList', method: 'post', data }), // 图片列表
  imageRemove: (data) => request({ url: '/article/imageRemove', method: 'post', data }), // 删除图片
  coverRemove: (data) => request({ url: '/article/coverRemove', method: 'post', data }), // 删除封面
}
