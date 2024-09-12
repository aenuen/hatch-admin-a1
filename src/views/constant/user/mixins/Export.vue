<script>
import { export_json_to_excel as exportJson } from '@/libs/export/ExportToExcel'
import { timeFormat } from 'abbott-methods/import'

export default {
  methods: {
    exportData(suffix) {
      if (this.tableDataLength > 0) {
        const tHeader = ['编号', '用户名', '昵称', '真实姓名', '注册日期']
        const filterVal = ['id', 'username', 'petName', 'realName', 'created']
        const list = this.tableData
        const data = this.exportFormat(filterVal, list)
        const opt = { header: tHeader, data, filename: '用户', bookType: suffix }
        exportJson(opt)
      } else {
        this.$message('暂无数据可导出')
      }
    },
    exportFormat(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return j === 'created' ? timeFormat(v[j]) : v[j]
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
