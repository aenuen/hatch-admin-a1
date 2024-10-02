<template>
  <div class="file" :style="wh">
    <!-- blob模式 -->
    <el-image v-if="/^blob/.test(url)" :src="url" fit="cover" :style="wh" class="hasView" @click="viewImageOpen">
      <div slot="error">
        <img :src="noneImage" :style="wh" />
      </div>
    </el-image>
    <!-- 无后缀名时 -->
    <el-image v-else-if="!fileSuffixName(url)" fit="cover" :style="wh">
      <div slot="error">
        <img :src="noneImage" :style="wh" />
      </div>
    </el-image>
    <!-- 图片类型 -->
    <el-image v-else-if="fileType(url) === 'pic'" :src="url" fit="cover" :style="wh" class="hasView" @click="viewImageOpen" />
    <!-- 图标类型 -->
    <el-image v-else :src="require('@/assets/images/fileType/' + fileType(url) + '.png')" fit="fit" :style="wh" />
    <el-dialog v-if="isView" :visible.sync="isView">
      <img width="100%" :src="image" style="max-width: 950px" />
    </el-dialog>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
import { fileType, fileSuffixName } from 'abbott-methods/import'
// settings
export default {
  name: 'ComponentsImageType',
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    url: { type: String, default: '' },
  },
  data() {
    return {
      fileType,
      fileSuffixName,
      noneImage: require('@/assets/images/noneImage.png'),
      image: '',
      isView: false,
    }
  },
  computed: {
    wh() {
      return { width: this.width + 'px', height: this.height + 'px' }
    },
  },
  methods: {
    viewImageOpen() {
      this.isView = true
      this.image = this.url
    },
  },
}
</script>
<style lang="scss" scoped>
.el-image {
  border-radius: 5px;
}
.hasView {
  cursor: pointer;
}
</style>
