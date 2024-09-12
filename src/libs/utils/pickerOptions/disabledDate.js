/**
 * @description 大于时间
 * @param gtTime
 * @return {function(*): boolean}
 */
export const gtTime = (gtTime) => {
  gtTime = (gtTime ? new Date(gtTime) : new Date()).getTime()
  return (time) => time.getTime() < gtTime.getTime()
}
/**
 * @description 小于时间
 * @param [ltTime]
 * @return {function(*): boolean}
 */
export const ltTime = (ltTime) => {
  ltTime = (ltTime ? new Date(ltTime) : new Date()).getTime()
  return (time) => time.getTime() > ltTime.getTime()
}
/**
 * @description 范围时间
 * @param [gtTime]
 * @param [ltTime]
 * @return {function(*): boolean}
 */
export const scopedTime = (gtTime, ltTime) => {
  gtTime = (gtTime ? new Date(gtTime) : new Date()).getTime()
  ltTime = (ltTime ? new Date(ltTime) : new Date()).getTime()
  return (time) => time.getTime() < gtTime || time.getTime() > ltTime
}
