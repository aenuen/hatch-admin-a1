<script>
export default {
  methods: {
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
