<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 签标切换 -->
      <el-tabs v-model="queryList.tabCode" type="border-card" style="width: 100%" @tab-click="tabClick">
        <el-tab-pane label="大乐透" name="lottery">
          <Lottery />
        </el-tab-pane>
        <el-tab-pane label="福建31选7" name="thirtyOne">
          <ThirtyOne />
        </el-tab-pane>
        <el-tab-pane label="七星彩" name="seven">
          <Seven />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// api
// components
import Lottery from './components/Lottery'
import ThirtyOne from './components/ThirtyOne'
import Seven from './components/Seven'
// data
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
// plugins
// settings
export default {
  name: 'LotteryList',
  components: { Lottery, ThirtyOne, Seven },
  mixins: [ListMixin],
  data() {
    return {}
  },
  computed: {
    tabCode() {
      return this.queryList.tabCode || 'lottery'
    },
    tabName() {
      return this.queryList.tabName || '大乐透'
    }
  },
  methods: {
    // 设置数据
    setData() {
      return {
        tabCode: 'lottery',
        tabName: '大乐透'
      }
    },
    // 标签切换
    tabClick(tab) {
      this.queryList.tabName = tab.label
      this.queryList.tabCode = tab.name
      this.tabName = tab.label
      this.tabCode = tab.name
      this.refreshStrong()
    }
  }
}
</script>
<style lang="scss" scoped></style>
