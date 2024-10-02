<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col>
          <el-form-item :label="fields.mobile" :label-width="labelWidth">
            {{ `：${mobile}` }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newTel" :label="fields.newTel" :label-width="labelWidth">
            <el-input v-model.trim="postForm.newTel" :placeholder="fields.newTel" maxlength="11" :style="fws" clearable @keyup.enter.native="submitForm" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="submitForm">{{ submitText }} </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// api
import api from '@/api'
// components
// data
import { fields } from '../../login/modules/fields'
import { ruleForm } from '../../login/modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
// settings
export default {
  name: 'Mobile',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      ruleForm,
    }
  },
  computed: {
    ...mapGetters(['aid', 'mobile']),
  },
  mounted() {
    this.submitText = '修改手机号码'
  },
  methods: {
    submitHandle() {
      if (this.mobile === this.postForm.newTel) {
        this.$message.error('新旧新手号码一致无须修改')
        this.submitLoadingClose()
      } else {
        this.postForm = { ...this.postForm, id: this.aid, mobile: this.mobile }
        api.person
          .mobile(this.postForm)
          .then(({ code, msg }) => {
            this.$message.success(msg)
            this.submitLoadingClose()
            this.$store.commit('user/SET_MOBILE', this.postForm.newTel)
            this.$refs.postForm.resetFields()
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
