<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 类型 -->
      <el-select v-model="queryList.type" class="filter-ele" :placeholder="fields.type" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in linkTypeAry" :key="key" :value="String(item.value)" :label="item.label" />
      </el-select>
      <!-- 标题 -->
      <el-input v-model="queryList.name" :placeholder="fields.name" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 使用状态搜索 -->
      <el-select v-model="queryList.isUse" class="filter-ele" :placeholder="fields.isUse" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in defineIsUseAry" :key="key" :value="String(item.value)" :label="item.label" />
      </el-select>
      <!-- 搜索 -->
      <el-button class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
      <!-- 新增按纽 -->
      <el-button type="success" class="filter-btn el-icon-plus" @click="$router.push('create')"> 新增 </el-button>
      <!-- 批量删除 -->
      <el-button type="danger" class="filter-btn el-icon-delete" style="width: auto" @click="removeBatchConfirm"> 批量删除 </el-button>
      <!-- 批量启用 -->
      <el-button type="warning" class="filter-btn el-icon-check" style="width: auto" @click="isUseOpenBatchConfirm"> 批量启用 </el-button>
      <!-- 批量禁用 -->
      <el-button type="warning" class="filter-btn el-icon-close" style="width: auto" @click="isUseCloseBatchConfirm"> 批量禁用 </el-button>
      <!-- 导出 -->
      <el-dropdown class="avatar-container hover-effect" trigger="click">
        <el-button type="primary" class="filter-btn el-icon-document" style="width: auto"> 导出数据 </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, '链接')"> 导出EXCEL </el-dropdown-item>
          <el-dropdown-item @click.native="exportData(tableData, exportHeader, exportFields, '链接', 'csv')"> 导出CSV </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 打印 -->
      <el-button type="primary" class="filter-btn el-icon-document" style="width: auto" @click="printTable('ListTable', '链接列表')"> 打印列表 </el-button>
    </div>
    <!-- 表格 -->
    <ListTable :table-data="tableData" :table-loading="tableLoading" :table-sort="tableSort" :is-use="tableIsUse" @onSortChange="onSortChange" @onIsUseChange="onIsUseChange" @onRemoveAlone="onRemoveAlone" @onSelectorChange="onSelectorChange" @rowUpdateSort="rowUpdateSort" />
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.page" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
  </div>
</template>
<script>
// api
import api from '@/api'
// components
import ListTable from './components/ListTable'
import Pagination from '@/components/Pagination'
// data
import { cFields } from '@/libs/cFields'
import { fields } from './modules/fields'
// filter
// function
import { gainDictList, gainDictNameByValue, gainDictNameObject } from '@/libs/dict'
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
import Output from '@/components/Mixins/Output'
// plugins
// settings
import { defineIsUseAry, defineBooleanAry, keyLight } from 'abbott-methods/import'
export default {
  name: 'LinkList',
  components: { ListTable, Pagination },
  mixins: [MethodsMixin, ListMixin, Output],
  data() {
    return {
      api,
      fields: { ...cFields, ...fields },
      defineIsUseAry,
      defineBooleanAry,
      linkTypeAry: [],
      tableIsUse: [],
      exportObject: {
        name: '名称',
        typeName: '类型',
        url: '网址',
        remark: '备注',
      },
    }
  },
  created() {},
  methods: {
    setData() {
      return {
        sort: '-id',
      }
    },
    // 开始处理
    async startHandle() {
      this.linkTypeAry = await gainDictList('linkType')
      this.gainArticleList()
    },
    // 使用状态改变
    onIsUseChange(event, id) {
      event = event ? '1' : '0'
      api.link.isUse({ event, id }).then((res) => {
        const { data, msg } = res
        if (+data === 1) {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    },
    // 单个删除
    removeAlone() {
      api.link.remove({ id: this.removeId }).then(({ msg, code }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 批量删除
    removeBatch() {
      api.link.removeBatch({ ids: this.selectorAry }).then(({ msg, code }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.selectorAry = []
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 批量启用
    isUseOpenBatch() {
      api.link.isUseOpenBatch({ ids: this.selectorAry }).then(({ msg, code }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.selectorAry = []
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 批量禁用
    isUseCloseBatch() {
      api.link.isUseCloseBatch({ ids: this.selectorAry }).then(({ msg, code }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.selectorAry = []
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 排序更新
    rowUpdateSort(row) {
      api.link.sort({ id: row.id, sort: row.sort }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 获取链接列表
    gainArticleList() {
      api.link.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { list, count } = data
          this.tableData = list
          this.tableDataLength = count
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            this.tableIsUse[item.id] = +item.isUse === 1
            item.k_name = keyLight(this.queryList, 'name', item.name)
            const typeName = gainDictNameByValue(this.linkTypeAry, String(item.type))
            const newsTypeObj = gainDictNameObject(this.linkTypeAry, String(this.queryList.type), 'type')
            item.k_type = keyLight(newsTypeObj, 'type', typeName)
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
