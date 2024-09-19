import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'image'
export const image = {
  // 上传
  upload: (data) => request({ url: `/${item}/upload`, method: 'post', data }),
  // 列表
  list: (params) => request({ url: `/${item}/list?${qs.stringify(params)}`, method: 'get' }),
}
