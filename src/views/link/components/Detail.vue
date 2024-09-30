<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col>
          <el-form-item prop="name" :label="fields.name" :label-width="labelWidth">
            <el-input v-model="postForm.name" :placeholder="fields.name" clearable :style="fws" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 封面文件 -->
      <el-row>
        <el-col>
          <el-form-item prop="cover" :label="fields.cover" :label-width="labelWidth">
            <Multi ref="Multi" :file-list="fileList" :file-action="fileAction" :file-limit="1" :file-accept="fileAccept" :file-data="fileData" :file-auto="isUpdate" :show-name="false" @onUploadCreate="onUploadCreate" @onUploadRemove="onUploadRemove" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="type" :label="fields.type" :label-width="labelWidth">
            <el-select v-model="postForm.type" :placeholder="fields.type" clearable :style="fws">
              <el-option v-for="(item, key) in linkTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="url" :label="fields.url" :label-width="labelWidth">
            <el-input v-model="postForm.url" :placeholder="fields.url" clearable :style="fws" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="remark" :label="fields.remark" :label-width="labelWidth">
            <el-input v-model="postForm.remark" type="textarea" :rows="5" resize="none" :placeholder="fields.remark" clearable :style="fws" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="submitForm">
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
// data
import { cFields } from '@/libs/cFields'
import { fields } from '../modules/fields.js'
import { rules as ruleForm } from '../modules/rules.js'
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
  name: 'LinkDetail',
  components: { Multi },
  mixins: [DetailMixin, MethodsMixin, FormMixin],
  props: {
    isUpdate: { type: Boolean, default: false },
  },
  data() {
    return {
      api,
      fields: { ...fields, ...cFields },
      ruleForm,
      linkTypeAry: [],
      fileList: [],
      fileAry: [],
      fileAction: '/link/coverUpload',
      fileAccept: defineAccept(['jpg', 'jpeg', 'gif', 'png']),
    }
  },
  computed: {
    fileData() {
      return {
        id: this.updateId,
      }
    },
  },
  created() {},
  methods: {
    // 开始处理
    async startHandle() {
      this.submitText = this.isUpdate ? '编辑' : '添加'
      this.linkTypeAry = await gainDictList('linkType')
    },
    // 获取详情
    gainDetail() {
      api.link.detail({ id: this.updateId }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.postForm = data
          this.fileList = data.cover ? [{ url: data.cover, fileId: data.id }] : []
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 添加一个文件
    onUploadCreate(ary) {
      if (!this.isUpdate) {
        this.fileAry = ary
      }
    },
    // 删除一个文件
    onUploadRemove(ary, fileId) {
      if (!this.isUpdate) {
        this.fileAry = ary
      } else {
        api.link.coverRemove({ id: fileId }).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.fileList = []
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
    // 提交表单
    submitHandle() {
      const formData = new FormData()
      formData.append('name', this.postForm.name)
      formData.append('type', this.postForm.type)
      formData.append('url', this.postForm.url)
      formData.append('remark', this.postForm.remark)
      if (this.isUpdate) {
        formData.append('id', this.updateId)
        api.link
          .update(formData)
          .then(({ code, data, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.routerClose('/link/list')
            } else {
              this.$message.error(msg)
            }
          })
          .catch(() => {
            this.submitLoadingClose()
          })
      } else {
        this.fileAry.forEach((file) => {
          formData.append('files[]', file.raw)
        })
        api.link
          .create(formData)
          .then(({ code, data, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.routerClose('/link/list')
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
