import { validateRequire } from 'abbott-methods/import'
import { fields } from './fields'
export const rules = {
  title: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.title, '填写', 3, 30) }],
  type: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.type) }],
  keyword: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.keyword) }],
  desc: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.desc) }],
  content: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.content) }],
}
