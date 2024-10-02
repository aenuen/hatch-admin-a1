import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'person'
export const person = {
  // 头像列表
  avatarList: (params) => request({ url: `/${item}/avatarList?${qs.stringify(params)}`, method: 'get' }),
  // 基本资料
  baseData: (data) => request({ url: `/${item}/baseData`, method: 'post', data }),
  // 修改电子邮件
  email: (data) => request({ url: `/${item}/email`, method: 'post', data }),
  // 修改手机号码
  mobile: (data) => request({ url: `/${item}/mobile`, method: 'post', data }),
  // 修改密码
  password: (data) => request({ url: `/${item}/password`, method: 'post', data }),
  // 更换头像
  avatar: (data) => request({ url: `/${item}/avatar`, method: 'post', data }),
  // 上传头像
  avatarUpload: (data) => request({ url: `/${item}/avatarUpload`, method: 'post', data }),
  // 删除头像
  avatarRemove: (data) => request({ url: `/${item}/avatarRemove`, method: 'post', data }),
  // 使用头像
  avatarUse: (data) => request({ url: `/${item}/avatarUse`, method: 'post', data }),
}
