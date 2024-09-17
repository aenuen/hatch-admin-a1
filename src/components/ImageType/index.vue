<template>
  <div class="file" :style="wh">
    <el-image v-if="/^blob/.test(url)" :src="url" fit="cover" :style="wh" />
    <el-image v-else-if="fileType(url) === 'pic'" :src="url" fit="cover" :style="wh" />
    <el-image v-else-if="fileType(url) === 'doc'" :src="doc" fit="fit" :style="wh" />
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
import { fileType } from 'abbott-methods/import'
// settings
export default {
  name: 'ComponentsImageType',
  mixins: [FileType],
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    url: { type: String, default: '' },
  },
  data() {
    return {
      fileType,
    }
  },
  computed: {
    wh() {
      return { width: this.width + 'px', height: this.height + 'px' }
    },
  },
}
</script>
<style lang="scss" scoped></style>
