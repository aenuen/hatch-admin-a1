/**
 * @description 定义角色数组
 * @type {{}}
 */
export const rolesAry = [
  { value: 'admin', label: '超级管理员' },
  { value: 'manager', label: '管理员' },
  { value: 'editor', label: '编辑人员' },
  { value: 'lawyer', label: '律师' },
  { value: 'user', label: '普通用户' }
]

/**
 * @description 处理成object
 * @return {{}}
 */
const rolesHandle = () => {
  const object = {}
  rolesAry.forEach((item) => {
    object[item.value] = item.label
  })
  return object
}

/**
 * @description 定义角色对象
 * @type {{}}
 */
export const rolesObject = rolesHandle()

/**
 * @description 将英文角色转为中文角色
 * @param {string} roles
 * @return {string}
 */
export const rolesParse = (roles) => {
  const ary = []
  const array = roles.split(',')
  array.forEach((value) => {
    ary.push(rolesObject[value])
  })
  return ary.join(',')
}
