<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col>
          <el-form-item prop="oldPwd" :label="fields.oldPwd" :label-width="labelWidth">
            <el-input ref="oldPwd" v-model.trim="postForm.oldPwd" :placeholder="fields.oldPwd" clearable show-password maxlength="30" style="width: 300px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newPwd" :label="fields.newPwd" :label-width="labelWidth">
            <el-input ref="newPwd" v-model.trim="postForm.newPwd" :placeholder="fields.newPwd" clearable show-password maxlength="30" style="width: 300px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="conPwd" :label="fields.conPwd" :label-width="labelWidth">
            <el-input ref="conPwd" v-model.trim="postForm.conPwd" :placeholder="fields.conPwd" clearable show-password maxlength="30" style="width: 300px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" type="primary" :disabled="submitLoading" @click="submitForm"> 修改登录密码 </el-button>
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
import { CryptoJsEncode } from '@/libs/cryptojs'
// settings
export default {
  name: 'PersonalPassword',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      ruleForm,
      postForm: {},
    }
  },
  computed: {
    ...mapGetters(['aid']),
  },
  methods: {
    submitHandle() {
      if (this.postForm.oldPwd === this.postForm.newPwd) {
        this.$message.error('新旧密码一致，请勿重覆修改！')
        this.$refs.newPwd.focus()
        this.submitLoading = false
      } else if (this.postForm.newPwd !== this.postForm.conPwd) {
        this.$message.error('新密码与确认密码不一致，请重新填写！')
        this.$refs.conPwd.focus()
        this.submitLoading = false
      } else {
        const id = this.aid
        const oldPwd = CryptoJsEncode(this.postForm.oldPwd)
        const newPwd = CryptoJsEncode(this.postForm.newPwd)
        const conPwd = CryptoJsEncode(this.postForm.conPwd)
        const updateData = { id, oldPwd, newPwd, conPwd }
        api.person
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
    },
  },
}
</script>

<style lang="scss" scoped></style>
