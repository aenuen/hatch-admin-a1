import { validateRequire } from 'abbott-methods/import'
import { fields } from './fields'
export const rules = {
  label: [
    {
      validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.label, '填写'),
    },
  ],
}
