import { validateRequire } from 'abbott-methods/import'
import { fields } from './fields'
export const rules = {
  name: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.name, '填写', 3, 30) }],
  type: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.type) }],
  url: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.url) }],
}
