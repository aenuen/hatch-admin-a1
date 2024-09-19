<template>
  <div class="uploadMulti">
    <div class="uploadList">
      <div v-for="(item, key) in fileList" :key="key" class="item" :style="showName ? wha50 : wh">
        <div class="line">
          <ImageType :width="width" :height="height" :url="item.url" />
          <div class="mask" :style="wh" />
          <div class="icon">
            <span v-if="fileType(item.url) === 'pic' || /^blob/.test(item.url)" @click="onUploadPreview(item.url)">
              <i class="el-icon-zoom-in" />
            </span>
            <span v-else @click="onUploadDownload(item.url, key)">
              <i class="el-icon-download" />
            </span>
            <span @click="onUploadRemove(item.fileId, key)">
              <i class="el-icon-delete" />
            </span>
          </div>
        </div>
        <div v-if="showName" class="name" :style="whh50">{{ item.fileName }}</div>
      </div>
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" style="max-width: 950px" />
      </el-dialog>
    </div>
    <div class="load" :style="wh" :class="showName ? 'has' : 'none'">
      <el-upload
        v-if="fileLimit > fileList.length"
        ref="multiUploader"
        class="uploaderItem"
        :limit="fileLimit"
        :multiple="multiple"
        :action="action"
        :headers="headers"
        :accept="fileAccept"
        :data="fileData"
        :show-file-list="false"
        :on-success="onSuccess"
        :before-upload="onBeforeUpload"
        :on-error="onUploadError"
        :style="wh"
        :auto-upload="fileAuto"
        :on-change="onChange"
      >
        <i class="el-icon-plus uploaderIcon" :style="wh" />
        <div v-if="progress" class="progress">
          <el-progress type="circle" :percentage="percentage" :width="width" />
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
// api
// components
import ImageType from '@/components/ImageType'
// data
// filter
// function
// mixin
// plugins
import { getToken } from '@/libs/token'
import { fileType, formatExternal } from 'abbott-methods/import'
// settings
import { apiBaseUrl } from '@/settings'
export default {
  name: 'ComponentsUploadMulti',
  components: { ImageType },
  props: {
    fileList: { type: Array, default: () => [] },
    fileAction: { type: String, default: '' },
    fileAccept: { type: String, default: '' },
    fileData: { type: Object, default: () => {} },
    fileExceed: { type: Number, default: 2 },
    fileLimit: { type: Number, default: 5 },
    fileAuto: { type: Boolean, default: true },
    showName: { type: Boolean, default: true },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
  },
  data() {
    return {
      fileType,
      fileAry: [],
      dialogVisible: '',
      dialogImageUrl: '',
      percentage: 0,
      progress: false,
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      }
    },
    multiple() {
      return this.fileLimit > 1
    },
    action() {
      return formatExternal(this.fileAction) ? this.fileAction : `${apiBaseUrl}${this.fileAction}`
    },
    wh() {
      return { width: this.width + 'px', height: this.height + 'px' }
    },
    wha50() {
      return { width: this.width + 'px', height: this.height + 50 + 'px' }
    },
    whh50() {
      return { width: this.width + 'px', height: 50 + 'px' }
    },
  },
  created() {},
  methods: {
    // 上传成功
    onSuccess({ code, data }, file) {
      if (code === 200) {
        if (typeof data === 'string') {
          data = { url: data }
        } else {
          data.url = data.fileUrl
          data.fileId = data.id
        }
        this.fileList.push(data)
        this.$message.success('上传成功')
      }
      this.percentage = 100
      setTimeout(() => {
        this.progress = false
        this.percentage = 0
      }, 500)
    },
    // 选中文件
    onChange(file, fileList) {
      if (!this.fileAuto) {
        this.fileAry.push(file)
        this.$emit('onUploadCreate', this.fileAry)
        const url = URL.createObjectURL(file.raw)
        this.fileList.push({ url, fileName: file.name })
      }
    },
    // 上传错误
    onUploadError() {
      this.percentage = 0
      this.progress = false
      this.$message.error('上传失败，请稍候再试…')
    },
    // 上传之前
    onBeforeUpload(file) {
      this.progress = true
      this.percentage = 30
      if (this.fileList.length >= this.limit) {
        this.$message.warning(`上传失败，只能上传 ${this.limit}个文件!`)
        this.percentage = 0
        this.progress = false
        return false
      } else {
        const isSmall = file.size / 1024 / 1024 < this.fileExceed
        if (!isSmall) {
          this.$message.error(`上传失败，文件大小不能超过 ${this.fileExceed}MB!`)
          this.percentage = 0
          this.progress = false
        }
        return isSmall
      }
    },
    // 浏览
    onUploadPreview(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    // 下载
    onUploadDownload(url) {
      this.$emit('onUploadDownload', url)
    },
    // 删除
    onUploadRemove(fileId, index) {
      this.$confirm('删除后将无法恢复，确定继续删除吗？', '温馨提示', {
        type: 'warning',
      })
        .then(() => {
          if (this.fileAuto) {
            this.$emit('onUploadRemove', this.fileAry, fileId)
          } else {
            this.fileList.splice(index, 1)
            this.fileAry.splice(index, 1)
            this.$emit('onUploadRemove', this.fileAry)
          }
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('./styles/Multi.scss');
</style>
