<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="title" :label="fields.title" :label-width="labelWidth">
            <el-input v-model="postForm.title" :placeholder="fields.title" clearable maxlength="30" show-word-limit :style="commonFormItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="type" :label="fields.type" :label-width="labelWidth">
            <el-select v-model="postForm.type" :placeholder="fields.type" clearable :style="commonFormItem">
              <el-option v-for="(item, key) in newsTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="keyword" :label="fields.keyword" :label-width="labelWidth">
            <el-input v-model="postForm.keyword" :placeholder="fields.keyword" clearable :style="commonFormItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="desc" :label="fields.desc" :label-width="labelWidth">
            <el-input v-model="postForm.desc" type="textarea" :rows="5" resize="none" :placeholder="fields.desc" clearable :style="commonFormItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="submitFrom">
          {{ submitText }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// api
import api from '@/api'
// components
// data
import { fields } from '../modules/fields.js'
// filter
// function
import { gainDictList } from '@/libs/dict'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
// settings
export default {
  name: 'ArticleDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin],
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
    submitFrom() {},
  },
}
</script>
<style lang="scss" scoped></style>
