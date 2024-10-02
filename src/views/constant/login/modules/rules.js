import { validateMobile, validateRequire, validateIdCard, validateAllCn } from 'abbott-methods/import'
import { fields } from './fields'
export const ruleForm = {
  telephone: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback, fields.telephone) }],
  newTel: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback, fields.newTel) }],
  password: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.password, '', 6, 30) }],
  oldPwd: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.oldPwd, '', 6, 30) }],
  newPwd: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.newPwd, '', 6, 30) }],
  conPwd: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.conPwd, '', 6, 30) }],
  code: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.code) }],
  name: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.name) }],
  telCode: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.telCode) }],
  cardNo: [{ validator: (rule, value, callback) => validateIdCard(rule, value, callback, fields.cardNo) }],
}
