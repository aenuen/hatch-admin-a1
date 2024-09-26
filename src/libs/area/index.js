import { regionData, codeToText } from 'element-china-area-data'

// 区域数据
export const areaData = regionData

/**
 * 根据区域编码和地址获取要保存在数据中的地址
 * @param {Array} area
 * @param {string} address
 * @returns string
 */
export const areaGetSaveByAreaAddress = (area, address) => {
  address = /^[+-]?\d+(\.\d+)?$/.test(address) || typeof address === 'string' ? address : ''
  if (Array.isArray(area)) {
    return area.join('/') + '|' + address
  } else {
    return '|' + address
  }
}

/**
 * 根据保存在数据库中的地址获取区域编码部分
 * @param {string} save
 * @returns {Array}
 */
export const areaGetAreaBySave = (save) => {
  save = areaIsSave(save) ? save : '|'
  const ary = save.split('|')
  return ary[0].join('/') || []
}

/**
 * 根据保存在数据库中的地址获取地址部分
 * @param {string} save
 * @returns {string}
 */
export const areaGetAddressBySave = (save) => {
  save = areaIsSave(save) ? save : '|'
  const ary = save.split('|')
  return ary[1] || ''
}

/**
 * 根据保存在数据库中的地址获取要在页面中显示的完整地址
 * @param {Array} codeAry
 * @returns {string}
 */
export const areaGetShowBySave = (save) => {
  const area = areaGetAreaBySave(save)
  const address = areaGetAddressBySave(save)
  const ary = []
  area.forEach((code) => {
    const name = codeToText[code]
    if (name) {
      ary.push(name)
    }
  })
  return ary.join('') + address
}

/**
 * 判断地址是否是保存在数据库中的地址
 * @param {string} save
 * @returns {boolean}
 */
export const areaIsSave = (save) => {
  return typeof address === 'string' && save.includes('|')
}
