<template>
  <div style="display: inline-block">
    <div :style="{ width: width + 'px', height: height + 'px' }">
      <el-image v-if="classify === 'pic'" :style="{ width: width + 'px', height: height + 'px' }" :src="fileUrl" fit="fit" />
      <el-image v-else-if="classify === 'doc'" :style="{ width: width + 'px', height: height + 'px' }" :src="doc" fit="fit" />
      <el-image v-else-if="classify === 'xls'" :style="{ width: width + 'px', height: height + 'px' }" :src="xls" fit="fit" />
      <el-image v-else-if="classify === 'pdf'" :style="{ width: width + 'px', height: height + 'px' }" :src="pdf" fit="fit" />
    </div>
    <div v-if="desc" class="desc" :style="{ width: width + 'px', height: '40px' }">{{ fileAlt || desc }}</div>
  </div>
</template>
<script>
// api
// components
// data
import { apiBaseUrl } from '@/libs/axios/settings'
// filter
// function
// mixin
// plugins
import { fileClassify } from 'abbott-methods/import'
// settings
export default {
  components: {},
  props: {
    fileUrl: { type: String, default: '' },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    desc: { type: String, default: '' }
  },
  data() {
    return {
      doc: `${apiBaseUrl}/constant/typeImage/word.png`,
      xls: `${apiBaseUrl}/constant/typeImage/excel.png`,
      pdf: `${apiBaseUrl}/constant/typeImage/pdf.png`
    }
  },
  computed: {
    classify() {
      const classify = fileClassify(this.fileUrl)
      return classify
    }
  }
}
</script>
<style lang="scss" scoped>
.desc {
  padding: 10px 0;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  color: #666;
  overflow: hidden;
}
</style>
