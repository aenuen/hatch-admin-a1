<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 使用状态搜索 -->
      <el-select v-model="queryList.isUse" class="filter-ele" :placeholder="fields.isUse" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in defineIsUseAry" :key="key" :value="String(item.value)" :label="item.label" />
      </el-select>
      <!-- 是否管理员搜索 -->
      <el-select v-model="queryList.isAdmin" class="filter-ele" :placeholder="fields.isAdmin" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, key) in defineBooleanAry" :key="key" :value="String(item.value)" :label="item.label" />
      </el-select>
      <!-- 用户名搜索 -->
      <el-input v-model="queryList.username" :placeholder="fields.username" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 昵称搜索 -->
      <el-input v-model="queryList.petName" :placeholder="fields.petName" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 真实姓名搜索 -->
      <el-input v-model="queryList.realName" :placeholder="fields.realName" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 电子邮箱搜索 -->
      <el-input v-model="queryList.email" :placeholder="fields.email" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 手机号码 -->
      <el-input v-model="queryList.mobile" :placeholder="fields.mobile" class="filter-ele" clearable @keyup.enter.native="handleFilter" @clear="handleFilter" @blur="handleFilter" />
      <!-- 角色搜索 -->
      <el-select v-model="queryList.roles" :placeholder="fields.roles" class="filter-ele" clearable @clear="handleFilter" @change="handleFilter">
        <el-option v-for="(item, index) in rolesAry" :key="index" :value="item['value']" :label="item['label']" />
      </el-select>
      <!-- 开始日期搜索 -->
      <el-date-picker v-model="queryList.aheadDate" :placeholder="fields.aheadDate" class="filter-ele" value-format="yyyy-MM-dd" type="date" @change="handleFilter" />
      <!-- 结束日期搜索 -->
      <el-date-picker v-model="queryList.afterDate" :placeholder="fields.afterDate" class="filter-ele" value-format="yyyy-MM-dd" type="date" @change="handleFilter" />
      <!-- 搜索 -->
      <el-button class="filter-btn el-icon-search" @click="handleFilter"> 搜索 </el-button>
      <!-- 新增按纽 -->
      <el-button type="success" class="filter-btn el-icon-plus" @click="$router.push('create')"> 新增 </el-button>
      <!-- 打印 -->
      <!-- <el-button class="filter-btn el-icon-printer" @click="printTable('userListTable', '用户列表')"> 打印 </el-button> -->
      <!-- 批量删除 -->
      <el-button type="danger" class="filter-btn el-icon-delete" style="width: auto" @click="removeBatchConfirm"> 批量删除 </el-button>
    </div>
    <!-- 列表 -->
    <div id="userListTable">
      <ListTable :table-data="tableData" :table-loading="tableLoading" :table-sort="tableSort" :is-use="tableIsUse" :is-admin="tableIsAdmin" @onSelectorChange="onSelectorChange" @onSortChange="onSortChange" @onIsUseChange="onIsUseChange" @onIsAdminChange="onIsAdminChange" @onRemoveAlone="onRemoveAlone" />
    </div>
    <!-- 分页 -->
    <div style="text-align: center">
      <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.page" :limit.sync="queryList.pageSize" @pagination="refresh" />
    </div>
    <!-- 批量编辑 -->
    <Dialog :control="updateBatchShow" title="批量编辑" @controlChange="updateBatchToggle"> 1 </Dialog>
  </div>
</template>

<script>
// api
import api from '@/api'
// components
import Dialog from '@/components/Dialog'
import Pagination from '@/components/Pagination'
import ListTable from './components/ListTable'
// data
import { fields } from './modules/fields'
import { rolesAry, rolesObject, rolesNameByValue } from '@/libs/roles'
// filter
// function
// mixin
import ListMixin from '@/components/Mixins/ListMixin'
import Output from '@/components/Mixins/Output'
// plugins
import { defineIsUseAry, defineBooleanAry, keyLight } from 'abbott-methods/import'
// settings
export default {
  name: 'UserList',
  components: { Dialog, ListTable, Pagination },
  mixins: [ListMixin, Output],
  data() {
    return {
      fields,
      defineIsUseAry,
      defineBooleanAry,
      exportObject: {
        id: '编号',
        username: '用户名',
        petName: '昵称',
        realName: '真实姓名',
        roles: '角色',
        isAdmin: '是否后台管理员',
        isUse: '使用状态',
        created: '创建时间',
      },
      tableIsAdmin: [],
      tableIsUse: [],
    }
  },
  computed: {
    rolesAry() {
      const newAry = []
      rolesAry.forEach((item) => {
        if (item.value !== 'admin') {
          newAry.push(item)
        }
      })
      return newAry
    },
  },
  methods: {
    // 初始设置
    setData() {
      return {
        sort: '-id',
      }
    },
    // 获取列表
    startHandle() {
      api.user.list(this.queryList).then((res) => {
        const { code, data } = res
        const { list, count } = data
        if (code === 200) {
          this.tableData = list
          this.tableDataLength = count
          this.tableData.forEach((item) => {
            this.tableIsUse[item.id] = +item.isUse === 1
            this.tableIsAdmin[item.id] = +item.isAdmin === 1
            item.usernameKeyword = keyLight(this.queryList, 'username', item.username)
            item.petNameKeyword = keyLight(this.queryList, 'petName', item.petName)
            item.realNameKeyword = keyLight(this.queryList, 'realName', item.realName)
            item.emailKeyword = keyLight(this.queryList, 'email', item.email)
            item.mobileKeyword = keyLight(this.queryList, 'mobile', item.mobile)
            const rolesObj = rolesObject()
            const object = { roles: rolesObj[this.queryList.roles] || '' }
            const roles = rolesNameByValue(item.roles)
            item.rolesKeyword = keyLight(object, 'roles', roles)
          })
        }
      })
    },
    // 单个删除
    removeAlone() {
      api.user.remove({ id: this.removeId }).then(({ code, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.removeId = 0
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 批量删除
    removeBatch() {
      api.user.removeBatch({ ids: this.selectorAry }).then(({ msg, code }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.selectorAry = []
          this.refreshStrong()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 状态改变
    onIsUseChange(event, id) {
      event = event ? '1' : '0'
      api.user.isUse({ id, event }).then((res) => {
        const { data, msg } = res
        if (+data === 1) {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    },
    // 管理员切换
    onIsAdminChange(event, id) {
      event = event ? '1' : '0'
      api.user.isAdmin({ id, event }).then((res) => {
        const { data, msg } = res
        if (+data === 1) {
          this.$message.success(msg)
        } else {
          this.$message.info(msg)
        }
      })
    },
  },
}
</script>
