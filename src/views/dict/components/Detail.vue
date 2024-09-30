<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col>
          <el-form-item prop="parentId" :label="fields.parentId" :label-width="labelWidth">
            <div>{{ postForm.parentId }}（{{ postForm.parentName }}）</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="label" :label="fields.label" :label-width="labelWidth">
            <el-input v-model="postForm.label" :placeholder="fields.label" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="value" :label="fields.value" :label-width="labelWidth">
            <el-input v-model="postForm.value" :placeholder="fields.value" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="code" :label="fields.code" :label-width="labelWidth">
            <el-input v-model="postForm.code" :placeholder="fields.code" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="sort" :label="fields.sort" :label-width="labelWidth">
            <el-input v-model="postForm.sort" :placeholder="fields.sort" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="submitFrom">{{ submitText }}</el-button>
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
import { rules as ruleForm } from '../modules/rules.js'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import FormMixin from '@/components/Mixins/FormMixin'
// plugins
// settings
export default {
  name: 'DictCDetail',
  components: {},
  mixins: [DetailMixin, MethodsMixin, FormMixin],
  props: {
    parentId: { type: Number, default: 0 },
    parentName: { type: String, default: '1' },
    isUpdate: { type: Boolean, default: false },
    updateNo: { type: Number, default: 0 },
  },
  data() {
    return {
      api,
      fields,
      ruleForm,
      submitText: '',
    }
  },
  methods: {
    // 开始处理
    startHandle() {
      this.submitText = this.isUpdate ? '修改' : '添加'
      const data = {}
      this.postForm = { ...data }
      this.postForm = { ...this.postForm, parentId: this.parentId, parentName: this.parentName }
      // 编辑时获取详情
      if (this.isUpdate) {
        this.updateId = this.updateNo
        this.getDetail()
      }
    },
    // 获取详情
    getDetail() {
      api.dict.detail({ id: this.updateId }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.postForm = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 提交
    submitHandle() {
      if (this.isUpdate) {
        api.dict.update(this.postForm).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.$emit('successCreate', data)
          } else {
            this.$message.error(msg)
          }
        })
        this.submitLoadingClose()
      } else {
        api.dict.create(this.postForm).then(({ code, data, msg }) => {
          if (code === 200) {
            this.$message.success(msg)
            this.$emit('successCreate', data)
          } else {
            this.$message.error(msg)
          }
        })
        this.submitLoadingClose()
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
