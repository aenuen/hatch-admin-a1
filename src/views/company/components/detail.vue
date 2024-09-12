<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="company" :label="fields.company" :label-width="labelWidth">
            <el-input v-model="postForm.company" :placeholder="fields.company" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="credit" :label="fields.credit" :label-width="labelWidth">
            <el-input v-model="postForm.credit" :placeholder="fields.credit" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="legal" :label="fields.legal" :label-width="labelWidth">
            <el-input v-model="postForm.legal" :placeholder="fields.legal" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="type" :label="fields.type" :label-width="labelWidth">
            <el-select v-model="postForm.type" class="filter-ele" :placeholder="fields.type" clearable style="width: 100%">
              <el-option v-for="(item, key) in companyTypeAry" :key="key" :value="item" :label="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="industry" :label="fields.industry" :label-width="labelWidth">
            <el-select v-model="postForm.industry" class="filter-ele" :placeholder="fields.industry" clearable style="width: 100%">
              <el-option v-for="(item, key) in companyIndustryAry" :key="key" :value="item" :label="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="number" :label="fields.number" :label-width="labelWidth">
            <el-input v-model="postForm.number" :placeholder="fields.number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="study" :label="fields.study" :label-width="labelWidth">
            <el-input v-model="postForm.study" :placeholder="fields.study" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="income" :label="fields.income" :label-width="labelWidth">
            <el-input v-model="postForm.income" :placeholder="fields.income" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item prop="email" :label="fields.email" :label-width="labelWidth">
            <el-input v-model="postForm.email" :placeholder="fields.email" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="mobile" :label="fields.mobile" :label-width="labelWidth">
            <el-input v-model="postForm.mobile" :placeholder="fields.mobile" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="liaison" :label="fields.liaison" :label-width="labelWidth">
            <el-input v-model="postForm.liaison" :placeholder="fields.liaison" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="address" :label="fields.address" :label-width="labelWidth">
            <el-input v-model="postForm.address" :placeholder="fields.address" clearable />
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
// components
// data
import { fields, companyTypeAry, companyIndustryAry } from '../modules/fields'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
// settings
export default {
  name: 'CompanyBaseData',
  components: {},
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      companyTypeAry,
      companyIndustryAry,
      submitText: '修改企业基本资料'
    }
  },
  methods: {
    submitFrom() {}
  }
}
</script>
<style lang="scss" scoped></style>
