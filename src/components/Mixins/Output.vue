<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
// settings
import { exportData } from '@/libs/export'
import { printTable } from '@/libs/print'
import { objectGetKeyAndValue } from 'abbott-methods/import'
export default {
  components: {},
  data() {
    return {
      printTable,
      exportData,
      exportFields: [],
      exportHeader: [],
      exportObject: {}
    }
  },
  mounted() {
    const { key, value } = objectGetKeyAndValue(this.exportObject)
    this.exportFields = key
    this.exportHeader = value
  },
  created() {
    this.getExportData()
  },
  methods: {
    getExportData() {}
  }
}
</script>
<style lang="scss" scoped></style>
