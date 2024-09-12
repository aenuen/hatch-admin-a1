<template>
  <div>
    <el-tooltip
      :content="isFullscreen ? '退出全屏' : '打开全屏'"
      effect="dark"
      placement="bottom"
    >
      <svg-icon
        :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="click"
      />
    </el-tooltip>
  </div>
</template>

<script>
import fullscreen from 'screenfull'

export default {
  name: 'ComponentsFullScreen',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    fullscreen.enabled && fullscreen.on('change', this.change)
  },
  beforeDestroy() {
    fullscreen.enabled && fullscreen.off('change', this.change)
  },
  methods: {
    click() {
      if (fullscreen.enabled) {
        fullscreen.toggle()
      } else {
        this.$message({
          message: '您的浏览器无法工作',
          type: 'warning'
        })
      }
    },
    change() {
      this.isFullscreen = fullscreen.isFullscreen
    }
  }
}
</script>
