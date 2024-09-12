import { roles as rolesAry } from '@/views/aConstant/manager/modules/roles'

export const rolesCn = (roles) => {
  const ary = []
  rolesAry.forEach((value) => {
    ary.push(rolesAry[value].label)
  })
  this.rolesCn = ary.join(',')
}
