<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <!-- 标题 -->
      <el-row>
        <el-col>
          <el-form-item prop="title" :label="fields.title" :label-width="labelWidth">
            <el-input v-model="postForm.title" :placeholder="fields.title" clearable maxlength="30" show-word-limit :style="commonFormItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 封面文件 -->
      <el-row>
        <el-col>
          <el-form-item prop="cover" :label="fields.cover" :label-width="labelWidth">
            <Multi ref="Multi" :file-list="fileList" :file-action="fileAction" :file-limit="1" :file-accept="fileAccept" :file-data="fileData" :file-auto="isUpdate" @onUploadCreate="onUploadCreate" @onUploadRemove="onUploadRemove" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 类型 -->
      <el-row>
        <el-col>
          <el-form-item prop="type" :label="fields.type" :label-width="labelWidth">
            <el-select v-model="postForm.type" :placeholder="fields.type" clearable :style="commonFormItem">
              <el-option v-for="(item, key) in newsTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 关键字 -->
      <el-row>
        <el-col>
          <el-form-item prop="keyword" :label="fields.keyword" :label-width="labelWidth">
            <el-input v-model="postForm.keyword" :placeholder="fields.keyword" clearable :style="commonFormItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 描述 -->
      <el-row>
        <el-col>
          <el-form-item prop="desc" :label="fields.desc" :label-width="labelWidth">
            <el-input v-model="postForm.desc" type="textarea" :rows="5" resize="none" :placeholder="fields.desc" clearable :style="commonFormItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 内容 -->
      <el-row>
        <el-col>
          <el-form-item prop="content" :label="fields.content" :label-width="labelWidth" style="position: relative">
            <ImageSelect />
            <TinyMCE v-model="postForm.content" :style="commonFormItem" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交 -->
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
import Multi from '@/components/Upload/Multi'
import ImageSelect from '@/components/ImageSelect'
import TinyMCE from '@/components/TinyMCE'
// data
import { fields } from '../modules/fields.js'
import { rules as rulesForm } from '../modules/rules.js'
// filter
// function
import { gainDictList } from '@/libs/dict'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import FormMixin from '@/components/Mixins/FormMixin'
// plugins
import { defineAccept } from 'abbott-methods/import'
// settings
export default {
  name: 'ArticleDetail',
  components: { Multi, ImageSelect, TinyMCE },
  mixins: [DetailMixin, MethodsMixin, FormMixin],
  props: {
    isUpdate: { type: Boolean, default: false },
  },
  data() {
    return {
      api,
      fields,
      rulesForm,
      newsTypeAry: [],
      fileList: [],
      fileAry: [],
      fileAction: '/article/coverUpload',
      fileAccept: defineAccept(['jpg', 'jpeg', 'gif', 'png']),
    }
  },
  computed: {
    editor() {
      return {
        width: '950px',
        height: '500px',
      }
    },
    fileData() {
      return {
        id: this.updateId,
      }
    },
  },
  created() {},
  methods: {
    async startHandle() {
      this.submitText = this.isUpdate ? '编辑' : '添加'
      this.newsTypeAry = await gainDictList('newsType')
    },
    // 添加一个文件
    onUploadCreate(ary) {
      if (!this.isUpdate) {
        this.fileAry = ary
      }
    },
    // 删除一个文件
    onUploadRemove(ary) {
      if (!this.isUpdate) {
        this.fileAry = ary
      }
    },
    handleImageUpload(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      api.article
        .imageUpload(formData)
        .then(({ code, data, msg }) => {
          if (code === 200) {
            Editor.insertEmbed(cursorLocation, 'image', data)
            resetUploader()
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        })
        .catch(() => {
          resetUploader()
          this.$message.error('上传失败，请稍候再试…')
        })
    },
    handleImageRemove() {},
    // 提交处理
    submitHandle() {
      const formData = new FormData()
      formData.append('title', this.postForm.title)
      formData.append('type', this.postForm.type)
      formData.append('keyword', this.postForm.keyword)
      formData.append('desc', this.postForm.desc)
      formData.append('content', this.postForm.content)
      if (this.isUpdate) {
        //
      } else {
        this.fileAry.forEach((file) => {
          formData.append('files[]', file.raw)
        })
        api.article
          .create(formData)
          .then(({ code, data, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.routerClose('/article/list')
            } else {
              this.$message.error(msg)
            }
            this.submitLoadingClose()
          })
          .catch(() => {
            this.submitLoadingClose()
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
