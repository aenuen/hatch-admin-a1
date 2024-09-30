<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="ruleForm">
      <el-row>
        <el-col>
          <el-form-item prop="petName" :label="fields.petName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.petName" :placeholder="fields.petName" maxlength="30" :style="fws" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="realName" :label="fields.realName" :label-width="labelWidth">
            <el-input v-model.trim="postForm.realName" :placeholder="fields.realName" maxlength="10" :style="fws" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="introduction" :label="fields.introduction" :label-width="labelWidth">
            <el-input v-model.trim="postForm.introduction" type="textarea" :rows="4" resize="none" :placeholder="fields.introduction" maxlength="140" :style="fws" />
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
import api from '@/api'
// components
// data
import { fields } from '../modules/fields'
import { BaseDataRule as ruleForm } from '../modules/rules'
// filter
// function
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { mapGetters } from 'vuex'
// settings
export default {
  name: 'PersonBaseData',
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      ruleForm,
    }
  },
  computed: {
    ...mapGetters(['aid', 'realName', 'petName', 'introduction']),
  },
  created() {
    this.postForm = {
      ...{
        id: this.aid,
        realName: this.realName,
        petName: this.petName,
        introduction: this.introduction,
      },
    }
  },
  methods: {
    submitAction() {
      if (!this.submitLoading) {
        this.submitLoadingOpen()
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            api.user
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
    },
  },
}
</script>
