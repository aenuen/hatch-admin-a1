<template>
  <div class="action-container" :style="useBg">
    <div class="logo"></div>
    <div class="title">{{ bigTitle }}</div>
    <el-form ref="postForm" :model="postForm" :rules="ruleForm" class="postForm login-form">
      <!-- 标题 -->
      <div class="title-container">
        <div class="formTitle">{{ userRoles }}登录</div>
      </div>
      <!-- 手机号码 -->
      <el-form-item prop="telephone">
        <span class="svg-container">
          <svg-icon icon-class="mobile" />
        </span>
        <el-input ref="telephone" v-model="postForm.telephone" :placeholder="fields.telephone" type="text" tabindex="1" autocomplete="off" maxlength="11" @keyup.enter.native="submitForm" />
      </el-form-item>
      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" :content="someText.capsLock" placement="right" manual>
        <el-form-item prop="password" style="position: relative">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="password" v-model="postForm.password" :placeholder="fields.password" :type="inputType" tabindex="2" autocomplete="off" maxlength="30" @keyup.native="checkCapsLock" @blur="capsTooltip = false" @keyup.enter.native="submitForm" />
          <span class="showPwd" @click="showPassword">
            <svg-icon :icon-class="inputType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 验证码 -->
      <div class="code">
        <el-form-item prop="code" style="position: relative">
          <span class="svg-container">
            <svg-icon icon-class="form" />
          </span>
          <el-input ref="code" v-model="postForm.code" type="text" :placeholder="fields.code" tabindex="3" autocomplete="off" maxlength="6" @keyup.enter.native="submitForm" />
        </el-form-item>
        <div class="authCode">
          <el-image :src="authCode" @click="refreshCode" />
        </div>
      </div>
      <!-- 按钮 -->
      <el-button :loading="submitLoading" type="primary" class="submitBtn" @click.native.prevent="submitForm"> {{ someText.submitLogin }} </el-button>
      <!-- 链接 -->
      <div class="link-container">
        <router-link v-for="(item, index) in linkAry" :key="index" :to="item.url">{{ item.name }}</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
// mixins
import DetailMixin from '@/components/Mixins/DetailMixin'
import CapsTooltipMixin from '@/components/Mixins/CapsTooltipMixin'
import ShowPasswordMixin from '@/components/Mixins/ShowPasswordMixin'
import Tbg from './mixins/Tbg'
// data
import { fields, someText } from './modules/fields'
import { logoLinksAry as linkAry } from './modules/links.js'
import { ruleForm } from './modules/rules.js'
// plugins
import { CryptoJsEncode } from '@/libs/cryptojs'
import { v4 as uuidV4 } from 'uuid'
import { holdNumber, holdLetterNumber } from 'abbott-methods/import'
// settings
import { baseApi } from '@/set/http.js'
import { isDevMode } from '@/set/mode.js'
export default {
  name: 'LoginIndex',
  mixins: [DetailMixin, CapsTooltipMixin, ShowPasswordMixin, Tbg],
  data() {
    return {
      fields,
      someText,
      ruleForm,
      authCode: '',
      linkAry,
    }
  },
  watch: {
    'postForm.telephone': function (value) {
      this.postForm.telephone = holdNumber(value)
    },
    'postForm.code': function (value) {
      this.postForm.code = holdLetterNumber(value)
    },
  },
  mounted() {
    this.refreshCode()
    if (isDevMode) {
      this.postForm = {
        ...{
          telephone: '13055297726',
          password: 'ee123123',
        },
      }
    }
  },
  methods: {
    // 刷新验证码
    refreshCode() {
      this.uuid = uuidV4()
      this.authCode = `${baseApi}/user/getCode?codeId=${this.uuid}&timestamp=${Date.now()}`
    },
    // 登录
    submitHandle() {
      const form = {
        telephone: CryptoJsEncode(this.postForm.telephone),
        password: CryptoJsEncode(this.postForm.password),
        codeId: this.uuid,
        code: this.postForm.code,
      }
      this.$store
        .dispatch('user/login', form)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.submitLoadingClose()
        })
        .catch(() => {
          this.refreshCode()
          this.submitLoadingClose()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('./styles/common.scss');
</style>
