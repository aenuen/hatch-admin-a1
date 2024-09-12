<script>
export default {
  methods: {
    backClose() {
      this.$store['dispatch']('tagsView/delView', this.$route)
      this.$router.back()
    },
    routerClose(path, query) {
      this.$store['dispatch']('tagsView/delView', this.$route)
      this.routerGo(path, query)
    },
    routerGo(path, query) {
      const json = { path }
      query && (json.query = query)
      this.$router.push(json)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
