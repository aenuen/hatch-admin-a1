import { export_json_to_excel as exportJson } from '@/libs/export/ExportToExcel'
import { timeFormat } from 'abbott-methods/import'

export const exportData = (data, header, fields, filename, bookType = 'xlsx') => {
  if (data.length > 0) {
    const newData = exportFormat(fields, data)
    const opt = { header, data: newData, filename, bookType }
    exportJson(opt)
  }
}

const exportFormat = (fields, jsonData) => {
  return jsonData.map((v) =>
    fields.map((j) => {
      return j === 'created' ? timeFormat(v[j]) : j === 'createDate' ? timeFormat(v[j], '{y}-{m}-{d}', true) : v[j]
    })
  )
}
