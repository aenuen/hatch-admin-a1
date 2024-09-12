<script>
import { validateErrMsg } from 'abbott-methods/import'

export default {
  data() {
    return {
      postForm: {},
      rulesForm: {},
      labelWidth: '120px',
      submitLoading: false,
      updateId: 0
    }
  },
  created() {
    const updateId = +this.$route.params.id
    if (this.isUpdate && updateId > 0) {
      this.updateId = updateId
      this.getDetail()
    }
    this.startHandle()
  },
  methods: {
    getDetail() {},
    startHandle() {},
    submitLoadingOpen() {
      this.submitLoading = true
    },
    submitLoadingClose() {
      this.submitLoading = false
    },
    validateErrHandle(fields) {
      const msg = validateErrMsg(fields)
      this.$message.error(msg)
      this.submitLoadingClose()
    }
  }
}
</script>
