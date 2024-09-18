import request from '@/libs/axios/request'
import qs from 'qs'
const item = 'user'
export const user = {
  // 用户信息
  info: () => request({ url: `/${item}/info`, method: 'get' }),
  // 用户是否第一次登录
  isFirst: () => request({ url: `/${item}/isFirst`, method: 'get' }),
  // 详情
  detail: (params) => request({ url: `/${item}/detail?${qs.stringify(params)}`, method: 'get' }),
  // 列表
  list: (params) => request({ url: `/${item}/list?${qs.stringify(params)}`, method: 'get' }),
  // 头像列表
  avatarList: (params) => request({ url: `/${item}/avatarList?${qs.stringify(params)}`, method: 'get' }),
  // 登录
  login: (data) => request({ url: `/${item}/login`, method: 'post', data }),
  // 重置token
  refreshToken: (data) => request({ url: `/${item}/refreshToken`, method: 'post', data }),
  // 登出
  logout: () => request({ url: `/${item}/logout`, method: 'post' }),
  // 基本资料
  baseData: (data) => request({ url: `/${item}/baseData`, method: 'post', data }),
  // 修改电子邮件
  email: (data) => request({ url: `/${item}/email`, method: 'post', data }),
  // 修改手机号码
  mobile: (data) => request({ url: `/${item}/mobile`, method: 'post', data }),
  // 修改密码
  password: (data) => request({ url: `/${item}/password`, method: 'post', data }),
  // 创建
  create: (data) => request({ url: `/${item}/create`, method: 'post', data }),
  // 删除
  remove: (data) => request({ url: `/${item}/remove`, method: 'post', data }),
  // 批量删除
  removeBatch: (data) => request({ url: `/${item}/removeBatch`, method: 'post', data }),
  // 更新
  update: (data) => request({ url: `/${item}/update`, method: 'post', data }),
  // 启用&&禁用用户
  isUse: (data) => request({ url: `/${item}/isUse`, method: 'post', data }),
  // 是&&否后台用户
  isAdmin: (data) => request({ url: `/${item}/isAdmin`, method: 'post', data }),
  // 更换头像
  avatar: (data) => request({ url: `/${item}/avatar`, method: 'post', data }),
  // 上传头像
  avatarUpload: (data) => request({ url: `/${item}/avatarUpload`, method: 'post', data }),
  // 删除头像
  avatarRemove: (data) => request({ url: `/${item}/avatarRemove`, method: 'post', data }),
  // 使用头像
  avatarUse: (data) => request({ url: `/${item}/avatarUse`, method: 'post', data }),
}
