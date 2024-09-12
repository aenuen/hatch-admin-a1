<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rulesForm">
      <el-row>
        <el-col>
          <el-form-item prop="petName" :label="fields.petName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.petName" :placeholder="fields.petName" maxlength="30" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.realName" :placeholder="fields.realName" maxlength="10" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="introduction" :label="fields.introduction" :label-width="labelWidth">
            <el-input v-model.trim="postForm.introduction" type="textarea" :rows="4" resize="none" :placeholder="fields.introduction" maxlength="140" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label-width="labelWidth">
        <el-button :loading="submitLoading" type="primary" @click="submitAction"> 修改基本资料 </el-button>
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
import { BaseDataRule as rulesForm } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
// settings
export default {
  name: 'PersonalBaseData',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      rulesForm
    }
  },
  computed: {
    ...mapGetters(['aid', 'realName', 'petName', 'introduction'])
  },
  created() {
    this.postForm = {
      ...{
        id: this.aid,
        realName: this.realName,
        petName: this.petName,
        introduction: this.introduction
      }
    }
  },
  methods: {
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            userApi
              .baseData(this.postForm)
              .then((res) => {
                const { msg } = res
                this.$message.success(msg)
                this.submitLoading = false
                this.$store.commit('user/SET_PetNAME', this.postForm.petName)
              })
              .catch(() => {
                this.submitLoading = false
              })
          } else {
            this.validateErrHandle(fields)
          }
        })
      }
    }
  }
}
</script>
