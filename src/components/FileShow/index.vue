<template>
  <div class="fileShow">
    <div v-for="(item, key) in fileList" :key="key" class="item" @click="fileDownload(item.url, '材料')">
      <div class="file">
        <el-image v-if="fileClassify(item.url) === 'pic'" :src="getFullUrl(item.url)" fit="cover" />
        <el-image v-else-if="fileClassify(item.url) === 'doc'" :src="doc" fit="fit" />
        <el-image v-else-if="fileClassify(item.url) === 'xls'" :src="xls" fit="fit" />
        <el-image v-else-if="fileClassify(item.url) === 'pdf'" :src="pdf" fit="fit" />
      </div>
      <div class="name">{{ item.fileName }}</div>
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
import Download from '@/views/mixins/Download.vue'
import FileType from '@/components/Mixins/FileType'
// plugins
import { fileClassify } from 'abbott-methods/import'
// settings
import { serveUrl } from '@/settings'
export default {
  name: 'ComponentsFileShow',
  components: {},
  mixins: [Download, FileType],
  props: {
    fileList: { type: Array, default: () => [] }
  },
  data() {
    return {
      fileClassify
    }
  },
  created() {},
  methods: {
    // 获取网址
    getFullUrl(url) {
      const arr = url.split('/')
      const path = `${serveUrl}/file/images/${arr[arr.length - 1]}`
      return path
    }
  }
}
</script>
<style lang="scss" scoped>
.fileShow {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .item {
    height: 80px;
    width: 300px;
    display: flex;
    border: 1px solid #ddd;
    padding: 14px;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    .file {
      margin-right: 10px;
      .el-image {
        width: 50px;
        height: 50px;
      }
    }
    .name {
      display: flex;
      width: 210px;
      height: 50px;
      line-height: 25px;
      align-items: center; /* 垂直居中 */
      white-space: nowrap; /* 确保文本在一行内显示 */
      overflow: hidden; /* 超出部分隐藏 */
      text-overflow: ellipsis; /* 超出部分显示省略号 */
    }
  }
}
</style>
