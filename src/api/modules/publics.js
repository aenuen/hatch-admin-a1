import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'publics'
export const publics = {
  // 验证码图片
  captcha: (params) => request({ url: `/${item}/captcha?${qs.stringify(params)}`, method: 'get' }),
}
