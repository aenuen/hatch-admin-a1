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
    // 获得详情
    gainDetail() {},
    // 开始处理
    startHandle() {},
    // 打开加载
    submitLoadingOpen() {
      this.submitLoading = true
    },
    // 关闭加载
    submitLoadingClose() {
      this.submitLoading = false
    },
    // 验证错误处理
    validateErrHandle(fields) {
      const msg = validateErrMsg(fields)
      this.$message.error(msg)
      this.submitLoadingClose()
    },
    // 提交处理
    submitHandle() {},
    // 提交表单
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
