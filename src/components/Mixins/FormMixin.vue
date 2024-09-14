<script>
export default {
  methods: {
    submitHandle() {},
    submitFrom() {
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
