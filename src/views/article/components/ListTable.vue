<template>
  <el-table :key="1" :loading="tableLoading" :data="tableData" border fit highlight-current-row style="width: 100%" :default-sort="tableSort" @sort-change="onSortChange" @selection-change="onSelectorChange">
    <el-table-column type="selection" width="50" align="center" />
    <el-table-column :label="fields.id" prop="id" align="center" width="80" sortable="custom" />
    <el-table-column :label="fields.work" align="center" width="120" fixed="left">
      <template slot-scope="{ row: { id } }">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="$router.push({ path: `update/${id}` })" />
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="onRemoveAlone(id)" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.type" prop="type" align="center" width="150">
      <template slot-scope="{ row: { k_type } }">
        <span v-html="k_type" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.cover" prop="cover" align="center" width="56">
      <template slot-scope="{ row: { cover } }">
        <ImageType :width="36" :height="36" :url="cover" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.title" prop="title" align="left">
      <template slot-scope="{ row: { k_title } }">
        <span v-html="k_title" />
      </template>
    </el-table-column>
    <el-table-column :label="fields.isUse" align="center" width="100">
      <template slot-scope="{ row: { id } }">
        <el-switch v-model="isUse[id]" active-color="#13ce66" inactive-color="#ff4949" @change="onIsUseChange($event, id)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// api
// components
import ImageType from '@/components/ImageType'
// data
import { cFields } from '@/libs/cFields'
import { fields } from '../modules/fields'
// filter
// function
// mixin
import TableMixin from '@/components/Mixins/TableMixin'
// plugins
// settings
export default {
  name: 'ListTable',
  components: { ImageType },
  mixins: [TableMixin],
  props: {
    tableLoading: Boolean,
    tableSort: { type: Object, default: () => {} },
    tableData: { type: Array, default: () => [] },
    isAdmin: { type: Array, default: () => [] },
    isUse: { type: Array, default: () => [] },
  },
  data() {
    return {
      fields: { ...cFields, ...fields },
    }
  },
}
</script>
