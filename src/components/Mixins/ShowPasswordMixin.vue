<template>
  <div class="app-container"></div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  components: {},
  mixins: [],
  data() {
    return {
      inputType: 'password',
    }
  },
  created() {},
  methods: {
    // 显示|隐藏密码
    showPassword() {
      this.inputType = this.inputType === 'password' ? '' : 'password'
      this.$nextTick(() => this.$refs.password.focus()) // 自动聚焦
    },
  },
}
</script>
<style lang="scss" scoped></style>
