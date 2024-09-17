import { timeGetDate } from 'abbott-methods/import'
/**
 * @description 空值
 * @param value
 */
export const emptyValueFilter = (value) => {
  return !value || value.toString().toLowerCase() === 'null' || value.toString().toLowerCase() === 'undefined' ? '--' : value
}

/**
 * @description 日期
 * @param {string|number} value
 * @returns
 */
export const dateFilter = (value) => {
  return timeGetDate(value)
}
