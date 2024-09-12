import { validateRequire, validateAllCn, validateEmail, validateMobile, validateUsername } from 'abbott-methods/import'
import { fields } from '@/views/aConstant/manager/modules/fields'

export const BaseDataRule = {
  petName: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.petName, '填写', 3, 20) }],
  realName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.realName, 2, 20) }]
}

export const PasswordRule = {
  passwordOld: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `旧${fields.password}`, '填写', 6, 20) }],
  passwordNew: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `新${fields.password}`, '填写', 6, 20) }],
  passwordRep: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, `确认${fields.password}`, '填写', 6, 20) }]
}

export const EmailRule = {
  newEmail: [{ validator: (rule, value, callback) => validateEmail(rule, value, callback) }]
}
export const MobileRule = {
  newEmail: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }]
}

export const DetailRule = {
  username: [{ validator: validateUsername }],
  petName: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.petName, '填写', 2, 20) }],
  realName: [{ validator: (rule, value, callback) => validateAllCn(rule, value, callback, fields.realName, 2, 20) }],
  email: [{ validator: (rule, value, callback) => validateEmail(rule, value, callback) }],
  mobile: [{ validator: (rule, value, callback) => validateMobile(rule, value, callback) }],
  roles: [{ validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.roles, '选择') }]
}

export const DetailPasswordRule = {
  updatePassword: [{
    validator: (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (value.length < 6 || value.length > 20) {
          callback(new Error(`密码在6-20个字符之间`))
        } else {
          callback()
        }
      }
    }
  }],
  createPassword: [{
    validator: (rule, value, callback) => validateRequire(rule, value, callback, fields.password, '填写', 6, 20)
  }]
}
