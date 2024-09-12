<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin: 30px 50px">
      <el-row>
        <el-col>
          <el-form-item :label="`我的${fields.email}`" :label-width="labelWidth">
            {{ `：${email}` }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newEmail" :label="`新的${fields.email}`" :label-width="labelWidth">
            <el-input v-model.trim="postForm.newEmail" :placeholder="`请输入新的${fields.email}`" maxlength="30" style="width: 300px" clearable @keyup.enter.native="submitAction" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button v-loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitAction"> 修改电子邮箱 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// api
import { userApi } from '@/api/user'
// components
// data
import { fields } from '../modules/fields'
import { EmailRule as rulesForm } from '../modules/rules'
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
      rulesForm
    }
  },
  computed: {
    ...mapGetters(['aid', 'email'])
  },
  methods: {
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.email === this.postForm.newEmail) {
              this.$message.error('新旧密码一致无须修改')
              this.submitLoadingClose()
            } else {
              this.postForm.id = this.aid
              userApi
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
          } else {
            this.validateErrHandle(fields)
          }
        })
      }
    }
  }
}
</script>
