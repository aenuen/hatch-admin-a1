import { timeFormat, timeGetDate, H_Y_M_D_H_I } from 'abbott-methods/import'
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

/**
 * @description Y_M_D_H_I
 * @param {string|number} value
 * @returns
 */
export const Y_M_D_H_I_Filter = (value) => {
  return timeFormat(value, H_Y_M_D_H_I)
}
