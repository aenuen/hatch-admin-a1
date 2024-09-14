<template>
  <div class="uploadMulti">
    <div class="uploadList">
      <div v-for="(item, key) in fileList" :key="key" class="item" :style="wha50">
        <div class="line">
          <div class="file" :style="wh">
            <el-image v-if="fileClassify(item.url) === 'pic'" :src="getFullUrl(item.url)" fit="cover" :style="wh" />
            <el-image v-else-if="fileClassify(item.url) === 'doc'" :src="fileClassify(item.url)" fit="fit" :style="wh" />
          </div>
          <div class="mask" :style="wh" />
          <div class="icon">
            <span v-if="fileClassify(item.url) === 'pic'" @click="onUploadPreview(getFullUrl(item.url))">
              <i class="el-icon-zoom-in" />
            </span>
            <span v-else @click="onUploadDownload(item.url)">
              <i class="el-icon-download" />
            </span>
            <span @click="onUploadRemove(item.fileId)">
              <i class="el-icon-delete" />
            </span>
          </div>
        </div>
        <div class="name" :style="whh50">{{ item.fileName }}</div>
      </div>
      <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <div class="load" :style="wha50">
      <el-upload v-if="fileLimit > fileList.length" ref="multi" class="uploaderItem" :limit="fileLimit" :multiple="false" :action="fileAction" :headers="headers" :accept="fileAccept" :data="fileData" :show-file-list="false" :on-success="onSuccess" :before-upload="onBeforeUpload" :on-error="onUploadError" :style="wh" :auto-upload="auto">
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
// data
// filter
// function
// mixin
import FileType from '@/components/Mixins/FileType'
// plugins
import { getToken } from '@/libs/utils/token'
import { fileClassify, fileSave } from 'abbott-methods/import'
// settings
import { serveUrl } from '@/settings'
import { guaranteeApi } from '@/api/guarantee'
export default {
  name: 'ComponentsUploadMulti',
  components: {},
  mixins: [FileType],
  props: {
    fileList: { type: Array, default: () => [] },
    fileAction: { type: String, default: '' },
    fileAccept: { type: String, default: '' },
    fileData: { type: Object, default: () => {} },
    fileExceed: { type: Number, default: 2 },
    fileLimit: { type: Number, default: 5 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    auto: { type: Boolean, default: true },
  },
  data() {
    return {
      fileClassify,
      dialogVisible: '',
      dialogImageUrl: '',
      percentage: 0,
      progress: false,
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `${getToken()}`,
      }
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
    // 获取网址
    getFullUrl(url) {
      const arr = url.split('/')
      return `${serveUrl}/file/images/${arr[arr.length - 1]}`
    },
    // 上传成功
    onSuccess({ code, data }, file) {
      if (code === 200) {
        this.isUpdate = false
        if (typeof data === 'string') {
          data = { url: data }
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
      guaranteeApi.download({ path: url }).then(({ code, data, msg }) => {
        fileSave(Date.now(), 'docx', data)
        this.$message.success('下载成功')
      })
    },
    // 删除
    onUploadRemove(fileId) {
      this.$emit('onUploadRemove', fileId)
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('./styles/Multi.scss');
</style>
