<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item :label="`我的${fields.mobile}`" :label-width="labelWidth">
            {{ `：${mobile}` }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newMobile" :label="`新的${fields.mobile}`" :label-width="labelWidth">
            <el-input v-model.trim="postForm.newMobile" :placeholder="`请输入新的${fields.mobile}`" maxlength="11" style="width: 300px" clearable @keyup.enter.native="submitAction" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button type="primary" :loading="submitLoading" :disabled="submitLoading" @click="submitAction"> 修改手机号码 </el-button>
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
import { MobileRule as rulesForm } from '../modules/rules'
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
      rulesForm
    }
  },
  computed: {
    ...mapGetters(['aid', 'mobile'])
  },
  methods: {
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            if (this.mobile === this.postForm.newMobile) {
              this.$message.error('新旧新手号码一致无须修改')
              this.submitLoadingClose()
            } else {
              this.postForm.id = this.aid
              userApi
                .mobile(this.postForm)
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.$message.success(msg)
                    this.submitLoadingClose()
                    this.$store.commit('user/SET_MOBILE', this.postForm.newMobile)
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

<style lang="scss" scoped></style>
