<!--suppress JSUnresolvedVariable, JSCheckFunctionSignatures -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, step) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || step === levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { pathToRegexp } from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null,
      homeEnText: 'home',
      homeCnText: '首页'
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) return
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        // 不是首页则前面加入首页
        const meta = { title: this.homeCnText }
        matched = [{ path: '/', meta }].concat(matched)
      }
      this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      // 是否首页
      const name = route && route.name
      if (!name) return false
      return name.trim().toLocaleLowerCase() === this.homeEnText.toLocaleLowerCase()
    },
    pathCompile(path) {
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
