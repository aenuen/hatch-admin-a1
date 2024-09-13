<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 类型 -->
      <el-select v-model="queryList.type" class="filter-ele" :placeholder="fields.type" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in newsTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
      </el-select>
    </div>
  </div>
</template>
<script>
// api
import api from '@/api'
// components
// data
import { fields } from './modules/fields'
// filter
// function
import { gainDictList } from '@/libs/dict'
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'ArticleList',
  components: {},
  mixins: [MethodsMixin, ListMixin],
  data() {
    return {
      api,
      fields,
      newsTypeAry: [],
    }
  },
  created() {},
  methods: {
    async startHandle() {
      this.newsTypeAry = await gainDictList('newsType')
    },
  },
}
</script>
<style lang="scss" scoped></style>
