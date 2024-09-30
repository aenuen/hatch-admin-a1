<script>
import { validateErrMsg } from 'abbott-methods/import'

export default {
  data() {
    return {
      postForm: {},
      ruleForm: {},
      labelWidth: '120px',
      submitLoading: false,
      updateId: 0,
      submitText: '提交',
    }
  },
  computed: {
    fws() {
      return {
        width: '580px',
      }
    },
  },
  created() {
    const updateId = +this.$route.params.id
    if (this.isUpdate && updateId > 0) {
      this.updateId = updateId
      this.gainDetail()
    }
    this.startHandle()
  },
  methods: {
    gainDetail() {},
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
    },
    submitHandle() {},
    submitForm() {
      this.$refs.postForm.validate((valid, fields) => {
        this.submitLoadingOpen()
        if (valid) {
          this.submitHandle()
        } else {
          this.validateErrHandle(fields)
        }
      })
    },
  },
}
</script>
