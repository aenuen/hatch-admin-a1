<template>
  <div class="action-container" :style="useBg">
    <div class="logo"></div>
    <div class="title">{{ bigTitle }}</div>
    <el-form ref="postForm" :model="postForm" :rules="ruleForm" class="postForm login-form">
      <!-- 标题 -->
      <div class="title-container">
        <div class="formTitle">{{ userRoles }}注册</div>
      </div>
      <!-- 手机号码 -->
      <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="telephone" v-model="postForm.telephone" :placeholder="fields.telephone" type="text" tabindex="1" autocomplete="off" maxlength="11" @keyup.enter.native="submitForm" />
      </el-form-item>
      <!-- 短信验证码 -->
      <div class="telCode">
        <el-form-item prop="telCode">
          <span class="svg-container">
            <svg-icon icon-class="form" />
          </span>
          <el-input v-model="postForm.telCode" :placeholder="fields.telCode" name="telCode" type="text" tabindex="2" autocomplete="off" maxlength="6" />
        </el-form-item>
        <el-button :disabled="countdownDisable || submitLoading" class="getCode" @click="getTelCode">
          <template v-if="countdownDisable">还有{{ countdownTime }}秒后可再次获取</template>
          <template v-else>获取短信验证码</template>
        </el-button>
      </div>
      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" :content="someText.capsLock" placement="right" manual>
        <el-form-item prop="password" style="position: relative">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="password" v-model="postForm.password" :placeholder="fields.password" :type="passwordType" tabindex="3" autocomplete="off" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" @keyup.enter.native="submitForm" />
          <span class="showPwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 按钮 -->
      <el-button :loading="submitLoading" type="primary" class="submitBtn" @click.native.prevent="submitForm"> {{ someText.submitRegister }} </el-button>
      <!-- 链接 -->
      <div class="link-container">
        <router-link v-for="(item, index) in linkAry" :key="index" :to="item.url">{{ item.name }}</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
// api
import api from '@/api'
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import CountdownMixin from '@/components/Mixins/CountdownMixin'
import Tbg from '../login/mixins/Tbg'
// data
import { fields, someText } from '../login/modules/fields'
import { ruleForm } from '../login/modules/rules.js'
// plugins
import { CryptoJsEncode } from '@/libs/cryptojs'
import { holdNumber, holdLetterNumber, formatMobile } from 'abbott-methods/import'
// settings
export default {
  name: 'LoginIndex',
  mixins: [DetailMixin, MethodsMixin, CountdownMixin, Tbg],
  data() {
    return {
      api,
      fields,
      someText,
      ruleForm,
      postForm: {
        telephone: '13055297726',
        telCode: '123123',
        password: 'ee123123',
      },
      passwordType: 'password',
      capsTooltip: false,
      redirect: undefined,
      authCode: '',
      linkAry: [
        { name: someText.toLogin, url: '/login' },
        { name: someText.toFind, url: '/find' },
      ],
      countdownCookie: 'RegisterCountdownCookie',
    }
  },
  watch: {
    'postForm.telephone': function (value) {
      this.postForm.telephone = holdNumber(value)
    },
    'postForm.telCode': function (value) {
      this.postForm.telCode = holdLetterNumber(value)
    },
  },
  methods: {
    // 获取短信验证码
    getTelCode() {
      this.submitLoadingOpen()
      const { telephone } = this.postForm
      if (telephone.length > 0) {
        if (formatMobile(telephone)) {
          api.user
            .getRegSMS(telephone)
            .then(() => {
              this.$message.success('短信验证码已发达，请在1分钟内进行找回密码')
              this.playCountdown()
              this.submitLoadingClose()
            })
            .catch(() => {
              this.submitLoadingClose()
            })
        } else {
          this.submitLoadingClose()
          this.$message.error('请先输入正确的手机号码')
          this.$refs.telephone.focus()
        }
      } else {
        this.submitLoadingClose()
        this.$message.error('请先输入手机号码')
        this.$refs.telephone.focus()
      }
    },
    // 大写提示
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    // 显示|隐藏密码
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => this.$refs.password.focus()) // 自动聚焦
    },
    // 注册
    submitHandle() {
      const form = {
        telephone: CryptoJsEncode(this.postForm.telephone),
        password: CryptoJsEncode(this.postForm.password),
        telCode: this.postForm.telCode,
      }
      api.user
        .register(form)
        .then(({ msg }) => {
          this.$message.success(msg)
          this.submitLoadingClose()
          this.$router.push('/login')
        })
        .catch(() => {
          this.submitLoadingClose()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('../login/styles/common.scss');
</style>
