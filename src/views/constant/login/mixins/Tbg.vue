<script>
// api
// components
// data
import bg1 from '@/assets/images/Tbg/1.jpg'
import bg2 from '@/assets/images/Tbg/2.png'
import bg3 from '@/assets/images/Tbg/3.jpg'
import bg4 from '@/assets/images/Tbg/4.jpg'
// filter
// function
// mixin
// plugins
// settings
import { title } from '@/set/site.js'
export default {
  name: 'MixinsTbg',
  data() {
    return {
      nowType: 0,
      useBg: '',
      userRoles: '用户',
      bigTitle: title,
      bgOne: {
        backgroundImage: `url(${bg1})`,
      },
      bgTwo: {
        backgroundImage: `url(${bg2})`,
        backgroundSize: 'cover',
      },
      bgThree: {
        backgroundImage: `url(${bg3})`,
        backgroundSize: 'cover',
      },
      bgFour: {
        backgroundImage: `url(${bg4})`,
      },
    }
  },
  computed: {
    formBg() {
      return {
        backgroundColor: [2, 3, 4].includes(+this.nowType) ? '#fff' : 'none',
        borderRadius: '20px',
      }
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 开始处理
    startHandle() {
      this.selectRoles()
    },
    // 选择角色
    selectRoles() {
      const { t } = this.otherQuery
      if (t) {
        localStorage.setItem('storageType', t)
        this.nowType = t
      } else {
        this.nowType = localStorage.getItem('storageType')
      }
      switch (this.nowType) {
        case '1':
          this.useBg = this.bgOne
          break
        case '2':
          this.useBg = this.bgTwo
          break
        case '3':
          this.useBg = this.bgThree
          break
        case '4':
          this.useBg = this.bgFour
          break
        default:
          this.useBg = this.bgOne
          break
      }
    },
    // 获取其它参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') acc[cur] = query[cur]
        return acc
      }, {})
    },
  },
}
</script>
<style lang="scss" scoped></style>
