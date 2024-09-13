<script>
// api
import api from '@/api'
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
      api,
      newsTypeAry: [],
    }
  },
  created() {
    this.gainDict()
  },
  methods: {
    async gainDict(type) {
      const data = localStorage.getItem(type)
      if (data) {
        return JSON.parse(data)
      } else {
        await api.dict.type({ type }).then(({ code, data, msg }) => {
          if (code === 200) {
            localStorage.setItem(type, JSON.stringify(data))
            return data
          } else {
            this.$message.error(msg)
          }
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
