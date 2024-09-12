// 确认
this.$confirm('删除后将无法恢复，确定继续删除吗？', '温馨提示', {
  type: 'warning'
})
.then(() => {
  this.$emit('onUploadRemove', this.fileId)
})
.catch(() => {
this.$message.info('取消删除')
})
