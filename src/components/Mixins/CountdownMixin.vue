<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
import Cookies from 'js-cookie'
// settings
export default {
  name: 'MixinsCd',
  components: {},
  mixins: [],
  data() {
    return {
      countdownDisable: false,
      countdownTime: 60,
      countdownCookie: 'CountdownCookie',
      countdownPlay: null,
    }
  },
  beforeDestroy() {
    this.clearCountdown() // 清除计时器，防止内存泄露
  },
  mounted() {
    const countdownTime = Cookies.get(this.countdownCookie)
    if (countdownTime < this.countdownTime && countdownTime > 0) {
      this.countdownTime = countdownTime
      this.playCountdown()
    }
  },
  methods: {
    // 开始倒计时
    playCountdown() {
      this.countdownDisable = true
      this.startCountdown()
    },
    // 开始倒计时函数
    startCountdown() {
      this.countdownPlay = setInterval(() => {
        if (this.countdownTime > 0) {
          this.countdownTime--
          Cookies.set(this.countdownCookie, this.countdownTime, { expires: this.countdownTime })
        } else {
          this.clearCountdown()
        }
      }, 1000)
    },
    // 清除倒计时函数
    clearCountdown() {
      clearInterval(this.countdownPlay)
      Cookies.remove(this.countdownCookie)
      this.countdownTime = 60
      this.countdownPlay = null
      this.countdownDisable = false
    },
  },
}
</script>
