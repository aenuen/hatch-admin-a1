<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="username" :label="fields.username" :label-width="labelWidth">
            <el-input v-model="postForm.username" :placeholder="fields.username" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="password" :label="fields.password" :label-width="labelWidth">
            <el-input v-model="postForm.password" :placeholder="isUpdate ? `${fields.password}，不填写则不修改密码` : fields.password" clearable show-password style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="petName" :label="fields.petName" :label-width="labelWidth">
            <el-input v-model="postForm.petName" :placeholder="fields.petName" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model="postForm.realName" :placeholder="fields.realName" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="email" :label="fields.email" :label-width="labelWidth">
            <el-input v-model="postForm.email" :placeholder="fields.email" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="mobile" :label="fields.mobile" :label-width="labelWidth">
            <el-input v-model="postForm.mobile" :placeholder="fields.mobile" clearable style="width: 500px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="roles" :label="fields.roles" :label-width="labelWidth">
            <el-select v-model="postForm.roles" :placeholder="fields.roles" clearable multiple style="width: 500px">
              <el-option v-for="(item, index) in rolesAry" :key="index" :label="item['label']" :value="item['value']" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="introduction" :label="fields.introduction" :label-width="labelWidth">
            <el-input v-model.trim="postForm.introduction" :placeholder="fields.introduction" type="textarea" clearable :rows="4" resize="none" maxlength="140" style="width: 500px" />
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
import { userApi } from '@/api/user'
// data
import { fields } from '../modules/fields'
import { rolesAry } from '../modules/roles'
import { DetailRule as rulesForm, DetailPasswordRule as rulesPassword } from '../modules/rules'
import { createDefaultData } from '../modules/default'
// function
import { CryptoJsEncode } from '@/libs/cryptojs'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
// plugins
import { mapGetters } from 'vuex'
// settings
import { isDevMode } from '@/settings'

export default {
  name: 'PersonalDetail',
  mixins: [DetailMixin, MethodsMixin],
  props: {
    isUpdate: Boolean
  },
  data() {
    return {
      fields,
      rulesForm,
      rulesPassword,
      postForm: {
        roles: ['user']
      }
    }
  },
  computed: {
    ...mapGetters(['roles']),
    rolesAry() {
      const newAry = []
      for (let index = 0; index < rolesAry.length; index++) {
        let condition
        if (this.roles.includes('admin')) {
          condition = index !== 0
        } else if (this.roles.includes('manager')) {
          condition = index !== 0 && index !== 1
        } else {
          return []
        }
        if (condition) {
          newAry.push(rolesAry[index])
        }
      }
      return newAry
    },
    submitText() {
      return this.isUpdate ? '编辑用户' : '新增用户'
    }
  },
  created() {
    const setDefault = false
    if (isDevMode && setDefault) {
      this.postForm = { ...this.postForm, ...createDefaultData }
    }
  },
  mounted() {
    const updateId = +this.$route.params.id
    if (updateId) {
      this.updateId = updateId
      this.rulesForm.password = this.rulesPassword.updatePassword
      this.getData()
    } else {
      this.rulesForm.password = this.rulesPassword.createPassword
    }
  },
  methods: {
    // 获取数据
    getData() {
      userApi
        .detail({ id: this.updateId })
        .then(({ data, code, msg }) => {
          if (code === 200) {
            this.postForm = data
          } else {
            this.$message.error(msg)
            this.$router.go(-1)
          }
        })
        .catch(() => {
          this.$router.go(-1)
        })
    },
    // 创建、更新的统一处理
    submitHandle(msg) {
      this.$message.success(msg)
      this.submitLoadingClose()
      this.$refs.postForm.resetFields()
    },
    submitFrom() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            let data
            if (this.postForm.password) {
              const password = CryptoJsEncode(this.postForm.password)
              const pJson = { password }
              data = { ...this.postForm, ...pJson }
            } else {
              data = this.postForm
            }
            if (this.isUpdate) {
              userApi
                .update(data)
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.submitHandle(msg)
                    this.backClose()
                  } else {
                    this.submitLoadingClose()
                  }
                })
                .catch(() => {
                  this.submitLoadingClose()
                })
            } else {
              userApi
                .create(data)
                .then(({ code, msg }) => {
                  if (code === 200) {
                    this.submitHandle(msg)
                    this.routerClose('/manager/list')
                  } else {
                    this.submitLoading = false
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
