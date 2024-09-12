<template>
  <div class="wrap-http404-container">
    <div class="wrap-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="./image/404.png" alt="404" />
        <img class="pic-404__child left" src="./image/404_cloud.png" alt="404" />
        <img class="pic-404__child mid" src="./image/404_cloud.png" alt="404" />
        <img class="pic-404__child right" src="./image/404_cloud.png" alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">{{ message }}</div>
        <a href="" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  computed: {
    message() {
      return '抱歉，未能查找到你所需的页面…'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./common.scss';
</style>
