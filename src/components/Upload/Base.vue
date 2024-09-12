<template>
  <div class="upload-container">
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="false"
      :data="data"
      :limit="fileLimit"
      :file-list="fileList"
      :accept="fileAccept"
      :disabled="fileDisabled"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :on-exceed="onExceed"
      drag
      show-file-list
      class="image-upload"
    >
      <i class="el-icon-upload" />
      <div v-if="fileList.length === 0" class="el-upload__text">
        请将 <em>{{ fileText }} 拖入</em> 或 <em>点击上传</em>
      </div>
      <div v-else class="el-upload__text">{{ fileText }}已上传</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/libs/utils/token'

export default {
  name: 'UploadDefault',
  props: {
    fileList: { type: Array, default: () => [] },
    fileDisabled: { type: Boolean, default: false },
    fileAccept: { type: String, default: '' },
    fileText: { type: String, default: '' },
    fileAction: { type: String, default: '' },
    fileLimit: { type: Number, default: 1 },
    fileData: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      baseUrl: `${process.env.VUE_APP_BASE_API}`,
      action: '',
      data: {}
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  watch: {
    fileData(value) {
      this.data = value
    }
  },
  mounted() {
    this.action = `${this.baseUrl}${this.fileAction}`
  },
  methods: {
    // 上传前事件
    beforeUpload(file) {
      this.$emit('onBeforeUpload', file)
    },
    // 成功事件
    onSuccess(response, file, fileList) {
      const { msg, code, data } = response
      if (code === 0) {
        this.$message.success(msg)
        this.$emit('onSuccess', data)
      } else {
        this.$message.error((msg && `上传失败，失败原因：${msg}`) || '上传失败')
        this.$emit('onError', 'file')
      }
    },
    // 错误事件
    onError(err) {
      const errMsg = err.message && JSON.parse(err.message)
      this.$message.error((errMsg && errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || '上传失败')
      this.$emit('onError', err)
    },
    // 移除事件
    onRemove() {
      this.$message.success(`${this.fileText}移除成功，可重新上传。若无重新上传则已上传的${this.fileText}仍在`)
      this.$emit('onRemove')
    },
    // 列表超出事件
    onExceed() {
      this.$message.warning(`一次只有上传${this.fileLimit}个${this.fileText}，移除队列可重新上传`)
    },
    // 处理预设值
    onPreview(data) {
      this.$emit('onPreview', data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
