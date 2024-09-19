import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'link'
export const link = {
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
  // 序号
  sort: (data) => request({ url: `/${item}/sort`, method: 'post', data }),
  // 删除封面
  coverRemove: (data) => request({ url: `/${item}/coverRemove`, method: 'post', data }),
}
