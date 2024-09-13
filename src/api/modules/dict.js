import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'dict'
export const dict = {
  // 创建
  create: (data) => request({ url: `/${item}/create`, method: 'post', data }),
  // 编辑
  update: (data) => request({ url: `/${item}/update`, method: 'post', data }),
  // 删除
  remove: (data) => request({ url: `/${item}/remove`, method: 'post', data }),
  // 列表
  list: (params) => request({ url: `/${item}/list?${qs.stringify(params)}`, method: 'get' }),
  //
  type: (params) => request({ url: `/${item}/type?${qs.stringify(params)}`, method: 'get' }),
  // 详情
  detail: (params) => request({ url: `/${item}/detail?${qs.stringify(params)}`, method: 'get' }),
}
