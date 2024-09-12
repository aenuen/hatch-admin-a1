<!--suppress ALL -->
<template>
  <div>
    <el-dropdown class="avatar-container hover-effect" trigger="click">
      <div class="avatar-wrapper" style="cursor: pointer">
        <el-avatar class="user-avatar" :size="35" :src="`${avatar}`" @error="true">
          <img :src="noneImage">
        </el-avatar>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/manager/data">
          <el-dropdown-item>个人资料</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import noneImage from '@/assets/image/noneImage.png'

export default {
  name: 'LayoutAvatar',
  data() {
    return {
      noneImage
    }
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    width: 35px;
    height: 35px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 35px;
      height: 35px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      left: 50%;
      margin-left: -6px;
      bottom: -9px;
      font-size: 12px;
    }
  }
}
</style>
