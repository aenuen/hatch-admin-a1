/**
 * @description 定义角色数组
 * @type {{}}
 */
export const rolesAry = [
  { value: 'admin', label: '超级管理员', code: 9 },
  { value: 'manager', label: '管理员', code: 8 },
  { value: 'user', label: '普通用户', code: 0 },
]

/**
 * @description 定义角色对象
 * @type {{}}
 */
export const rolesObject = () => {
  const object = {}
  rolesAry.forEach((item) => {
    object[item.value] = item.label
  })
  return object
}

/**
 * 根据value获取name
 * @param {*} value
 * @returns
 */
export const rolesNameByValue = (value) => {
  const valAry = value.split(',')
  const name = []
  rolesAry.forEach((item) => {
    if (valAry.includes(item.value)) {
      name.push(item.label)
    }
  })
  return name.join(',')
}
