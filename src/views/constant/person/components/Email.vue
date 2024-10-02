<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col>
          <el-form-item :label="fields.email" :label-width="labelWidth">
            {{ `：${email}` }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newEmail" :label="fields.newEmail" :label-width="labelWidth">
            <el-input v-model.trim="postForm.newEmail" :placeholder="fields.newEmail" maxlength="30" :style="fws" clearable @keyup.enter.native="submitForm" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitForm"> {{ submitText }} </el-button>
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
  name: 'Email',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      ruleForm,
    }
  },
  computed: {
    ...mapGetters(['aid', 'email']),
  },
  mounted() {
    this.submitText = '修改电子邮箱'
  },
  methods: {
    submitHandle() {
      if (this.email === this.postForm.newEmail) {
        this.$message.error('新旧密码一致无须修改')
        this.submitLoadingClose()
      } else {
        this.postForm = { ...this.postForm, id: this.aid, email: this.email }
        api.person
          .email(this.postForm)
          .then(({ code, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.submitLoadingClose()
              this.$store.commit('user/SET_EMAIL', this.postForm.newEmail)
              this.$refs.postForm.resetFields()
            } else {
              this.$message.error(msg)
              this.submitLoadingClose()
            }
          })
          .catch(() => {
            this.submitLoadingClose()
          })
      }
    },
  },
}
</script>
