<script>
// 身份验证重定向
export default {
  name: 'ViewsLoginComponentsAuthRedirect',
  created() {
    const hash = window.location.search.slice(1)
    if (window.localStorage) {
      window.localStorage.setItem('x-admin-oauth-code', hash)
      window.close()
    }
  },
  render: function(h) {
    return h() // 避免警告信息
  }
}
</script>
