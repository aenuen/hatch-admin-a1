import { fields } from './fields'

export const eFields = ['id', 'username', 'petName', 'realName', 'created']

export const eHeader = () => {
  const result = []
  eFields.forEach((item) => {
    result.push(fields[item])
  })
  return result
}
