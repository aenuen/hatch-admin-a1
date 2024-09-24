<template>
  <div class="app-container">
    <el-button type="primary" @click="popupCreate(0, '根目录')">根目录添加</el-button>
    <el-table :data="tableData" style="width: 100%; margin: 20px 0" row-key="id" border :default-expand-all="false" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="label" :label="fields.label" align="left" width="300px" />
      <el-table-column prop="id" :label="fields.id" align="center" width="100px" />
      <el-table-column :label="fields.value" align="center" width="100px">
        <template slot-scope="{ row: { value } }">
          <span>{{ value || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fields.code" align="center">
        <template slot-scope="{ row: { code } }">
          <span>{{ code || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" :label="fields.sort" align="center" />
      <el-table-column :label="fields.code" align="center" width="260px">
        <template slot-scope="{ row, row: { id, label } }">
          <el-button class="el-icon-plus" type="success" size="mini" @click="popupCreate(id, label)">添加</el-button>
          <el-button class="el-icon-edit" type="primary" size="mini" @click="popupUpdate(id)">编辑</el-button>
          <el-button class="el-icon-delete" type="danger" size="mini" @click="onRemoveAlone(id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加弹窗 -->
    <el-dialog v-if="popupVisible" :visible.sync="popupVisible" width="800px" title="词典添加" :before-close="popupClose">
      <Detail ref="detail" :parent-id="parent_id" :parent-name="parent_name" :is-update="isUpdate" :update-no="updateId" @successCreate="successCreate" @successUpdate="successUpdate" />
    </el-dialog>
  </div>
</template>
<script>
// api
import api from '@/api'
// components
import Detail from './components/Detail'
// data
import { fields } from './modules/fields'
// filter
// function
// mixin
import MethodsMixin from '@/components/Mixins/MethodsMixin'
import ListMixin from '@/components/Mixins/ListMixin'
import Popup from './mixins/Popup'
// plugins
// settings
export default {
  name: 'DictList',
  components: { Detail },
  mixins: [MethodsMixin, ListMixin, Popup],
  data() {
    return {
      api,
      fields,
      parent_id: 0,
      parent_name: '',
      isUpdate: false,
      updateId: 0,
    }
  },
  created() {},
  methods: {
    // 开始处理
    startHandle() {
      this.gainList()
    },
    removeAlone() {
      console.log('🚀 ~ api.dict.remove ~ this.removeId', this.removeId)
      api.dict.remove({ id: this.removeId }).then(({ code, data, msg }) => {
        if (code === 200) {
          this.$message.success(msg)
          this.gainList()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 获取列表
    gainList() {
      api.dict.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          this.tableData = data
        } else {
          this.$message.error(msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
