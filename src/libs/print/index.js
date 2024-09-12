import printJS from 'print-js'

/**
 * @description 打印表格
 * @param {string} tableId 表格id
 * @param {string} headTitle 头部标题
 * @param {string} [style] 表格样式
 * @param {string} [headerStyle] 头部样式
 */
export const printTable = (tableId, headTitle, style, headerStyle) => {
  style = style || 'table tr td,table tr th{border-collapse:collapse;padding:4px;border:1px #000 solid;text-align:center}img {width:30px;height:30px;}'
  headerStyle = headerStyle || 'text-align:center;color:#f00;width:100%;'
  printJS({ printable: tableId, header: headTitle, headerStyle, style, type: 'html', scanStyles: false })
}

export const tablePrintStyle = 'table{width:100%;color:#333;border-width:1px;border-color:#666;border-collapse:collapse;}table td{border-width:1px;padding:10px;border-style:solid;border-color:#666;background-color:#fff;line-height:25px;}'
