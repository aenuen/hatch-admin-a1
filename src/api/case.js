import request from '@/libs/axios/request'
import qs from 'qs'
export const caseApi = {
  // get
  base: () => request({ url: '/case/base', method: 'get' }), // 获取基础数据
  list: params => request({ url: '/case/list?' + qs.stringify(params), method: 'get' }), // 列表
  invoiceList: params => request({ url: '/case/invoiceList?' + qs.stringify(params), method: 'get' }), // 案件发票列表
  year: params => request({ url: '/case/year?' + qs.stringify(params), method: 'get' }), // 年份案件列表
  enterList: params => request({ url: '/case/enterList?' + qs.stringify(params), method: 'get' }), // 案件入账列表
  detail: params => request({ url: '/case/detail?' + qs.stringify(params), method: 'get' }), // 案件详情
  typeCase: params => request({ url: '/case/typeCase?' + qs.stringify(params), method: 'get' }), // 获取类别案件列表
  caseInvoice: params => request({ url: '/case/caseInvoice?' + qs.stringify(params), method: 'get' }), // 获取案件发票列表
  monthList: params => request({ url: '/case/monthList?' + qs.stringify(params), method: 'get' }), // 获取案件发票列表
  insurance: params => request({ url: '/case/insurance?' + qs.stringify(params), method: 'get' }), // 律师医社保列表
  payList: params => request({ url: '/case/payList?' + qs.stringify(params), method: 'get' }), // 支付列表
  // post
  create: (data) => request({ url: '/case/create', method: 'post', data }), // 创建案件
  update: (data) => request({ url: '/case/update', method: 'post', data }), // 更新案件
  remove: (data) => request({ url: '/case/remove', method: 'post', data }), // 删除案件
  isUse: data => request({ url: '/case/isUse', method: 'post', data }), // 案件作废/取消作废
  contractRemove: (data) => request({ url: '/case/contractRemove', method: 'post', data }), // 删除合同
  letterRemove: (data) => request({ url: '/case/letterRemove', method: 'post', data }), // 删除合同
  delivery: (data) => request({ url: '/case/delivery', method: 'post', data }), // 确定原件已经收到
  invoiceCreate: (data) => request({ url: '/case/invoiceCreate', method: 'post', data }), // 发票增加
  invoiceRemove: (data) => request({ url: '/case/invoiceRemove', method: 'post', data }), // 发票删除
  invoiceEnter: (data) => request({ url: '/case/invoiceEnter', method: 'post', data }), // 发票入账
  enterRemove: (data) => request({ url: '/case/enterRemove', method: 'post', data }) // 入账删除
}
