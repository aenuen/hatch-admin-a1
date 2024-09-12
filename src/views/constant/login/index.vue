<!--suppress ALL -->
<template>
  <div class="login-container">
    <loginForm :login-form="loginForm" @loginSubmit="loginSubmit" />
  </div>
</template>

<script>
import loginForm from './components/loginForm'

export default {
  name: 'ViewsLoginIndex',
  components: {
    loginForm
  },
  props: { /* 定义传值 */ },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    loginSubmit() {
      this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') acc[cur] = query[cur]
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
}
</style>
