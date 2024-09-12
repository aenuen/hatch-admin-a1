<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm" style="margin: 30px 50px">
      <el-row>
        <el-col>
          <el-form-item prop="passwordOld" :label="`旧${fields.password}`" :label-width="labelWidth">
            <el-input ref="passwordOld" v-model.trim="postForm.passwordOld" :placeholder="`旧${fields.password}`" clearable show-password maxlength="30" style="width: 300px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="passwordNew" :label="`新${fields.password}`" :label-width="labelWidth">
            <el-input ref="passwordNew" v-model.trim="postForm.passwordNew" :placeholder="`新${fields.password}`" clearable show-password maxlength="30" style="width: 300px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="passwordRep" :label="`确认${fields.password}`" :label-width="labelWidth">
            <el-input ref="passwordRep" v-model.trim="postForm.passwordRep" :placeholder="`确认${fields.password}`" clearable show-password maxlength="30" style="width: 300px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitPassword"> 修改登录密码 </el-button>
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
import { PasswordRule as rulesForm } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
import { CryptoJsEncode } from '@/libs/cryptojs'
// settings
export default {
  name: 'PersonalPassword',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      rulesForm,
      postForm: {
        passwordOld: '',
        passwordNew: '',
        passwordRep: ''
      }
    }
  },
  computed: {
    ...mapGetters(['aid'])
  },
  methods: {
    submitPassword() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.postForm.passwordOld === this.postForm.passwordNew) {
              this.$message.error('新旧密码一致，请勿重覆修改！')
              this.$refs.passwordNew.focus()
              this.submitLoading = false
            } else if (this.postForm.passwordNew !== this.postForm.passwordRep) {
              this.$message.error('新密码与确认密码不一致，请重新填写！')
              this.$refs.passwordRep.focus()
              this.submitLoading = false
            } else {
              const id = this.aid
              const passwordOld = CryptoJsEncode(this.postForm.passwordOld)
              const passwordNew = CryptoJsEncode(this.postForm.passwordNew)
              const passwordRep = CryptoJsEncode(this.postForm.passwordRep)
              const updateData = { id, passwordOld, passwordNew, passwordRep }
              userApi
                .password(updateData)
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.$message.success(msg)
                    this.submitLoading = false
                    this.$refs.postForm.resetFields()
                  } else {
                    this.$message.error(msg)
                    this.submitLoading = false
                  }
                })
                .catch(() => {
                  this.submitLoading = false
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

<style lang="scss" scoped></style>
