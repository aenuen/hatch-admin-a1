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
      capsTooltip: false,
    }
  },
  created() {},
  methods: {
    // 大写提示
    checkCapsLock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
  },
}
</script>
<style lang="scss" scoped></style>
