import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'article'
export const article = {
  // 列表
  list: (params) => request({ url: `/${item}/list?${qs.stringify(params)}`, method: 'get' }),
  // 详情
  detail: (params) => request({ url: `/${item}/detail?${qs.stringify(params)}`, method: 'get' }),
  // 添加
  create: (data) => request({ url: `/${item}/create`, method: 'post', data }),
  // 编辑
  update: (data) => request({ url: `/${item}/update`, method: 'post', data }),
  // 删除
  remove: (data) => request({ url: `/${item}/remove`, method: 'post', data }),
  // 批量删除
  removeBatch: (data) => request({ url: `/${item}/removeBatch`, method: 'post', data }),
  // 启用&&禁用
  isUse: (data) => request({ url: `/${item}/isUse`, method: 'post', data }),
  // 批量启用
  isUseOpenBatch: (data) => request({ url: `/${item}/isUseOpenBatch`, method: 'post', data }),
  // 批量禁用
  isUseCloseBatch: (data) => request({ url: `/${item}/isUseCloseBatch`, method: 'post', data }),
  // 上传图片
  imageUpload: (data) => request({ url: `/${item}/imageUpload`, method: 'post', data }),
  // 图片列表
  imageList: (data) => request({ url: `/${item}/imageList`, method: 'post', data }),
  // 删除图片
  imageRemove: (data) => request({ url: `/${item}/imageRemove`, method: 'post', data }),
  // 删除封面
  coverRemove: (data) => request({ url: `/${item}/coverRemove`, method: 'post', data }),
}
