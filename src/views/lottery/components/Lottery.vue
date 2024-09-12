<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="beforeAry" class="filter-ele" style="width: 100%" multiple filterable allow-create default-first-option placeholder="前段">
        <el-option v-for="item in beforeData" :key="item" :label="String(item)" :value="String(item)" />
      </el-select>
      <el-select v-model="afterAry" class="filter-ele" style="width: 100%" multiple filterable allow-create default-first-option placeholder="后段">
        <el-option v-for="item in afterData" :key="item" :label="String(item)" :value="String(item)" />
      </el-select>
      <el-input-number v-model="number" :min="1" class="filter-ele" label="请输入数量" />
      <el-button type="success" class="filter-btn" @click="randomMake">随便生成</el-button>
      <el-button class="el-icon-printer filter-btn" @click="printTable('lottery', '大乐透')">打印</el-button>
    </div>
    <el-table id="lottery" :key="1" :data="tableData" border fit highlight-current-row style="width: 500px; margin: auto">
      <template slot="empty">
        <el-empty :image-size="100" description="未能找到符合条件的数据" />
      </template>
      <el-table-column type="index" :label="fields.index" width="65" align="center" />
      <el-table-column prop="before" :label="fields.before" align="center" />
      <el-table-column prop="after" :label="fields.after" align="center" />
    </el-table>
  </div>
</template>
<script>
// api
// components
// data
import { fields } from '../modules/fields'
// filter
// function
import { numberAry } from '../utils/numberAry'
// mixin
import DetailMixin from '@/components/Mixins/DetailMixin'
// plugins
import { aoRandom, arrayOrder } from 'abbott-methods/import'
import { printTable } from '@/libs/print'
// settings
export default {
  name: 'LotteryComponentsLottery',
  components: {},
  mixins: [DetailMixin],
  data() {
    return {
      fields,
      beforeAry: [],
      afterAry: [],
      number: 3,
      tableData: [],
      printTable
    }
  },
  computed: {
    beforeData() {
      const result = []
      for (let index = 1; index <= 35; index++) {
        result.push(String(index).padStart(2, '0'))
      }
      return result
    },
    afterData() {
      const result = []
      for (let index = 1; index < 13; index++) {
        result.push(String(index).padStart(2, '0'))
      }
      return result
    }
  },
  created() {
    this.beforeAry = numberAry(35)
    this.afterAry = numberAry(12)
  },
  methods: {
    randomMake() {
      if (this.beforeAry.length > 5 && this.afterAry.length > 2 && this.number >= 1) {
        const result = []
        for (let index = 1; index <= this.number; index++) {
          const before = arrayOrder(aoRandom(this.beforeAry, 5), true)
          const after = arrayOrder(aoRandom(this.afterAry, 2), true)
          const item = { index, before: before.join(' , '), after: after.join(' , ') }
          result.push(item)
        }
        this.tableData = result
      } else {
        this.tableData = []
        this.$message.warning('前段选择的数据不能少于5，后段选择的数据不能少于2')
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
