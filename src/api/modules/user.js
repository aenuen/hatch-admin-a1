import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'user'
export const user = {
  // 详情
  detail: (params) => request({ url: `/${item}/detail?${qs.stringify(params)}`, method: 'get' }),
  // 列表
  list: (params) => request({ url: `/${item}/list?${qs.stringify(params)}`, method: 'get' }),
  // 创建
  create: (data) => request({ url: `/${item}/create`, method: 'post', data }),
  // 删除
  remove: (data) => request({ url: `/${item}/remove`, method: 'post', data }),
  // 批量删除
  removeBatch: (data) => request({ url: `/${item}/removeBatch`, method: 'post', data }),
  // 更新
  update: (data) => request({ url: `/${item}/update`, method: 'post', data }),
}
