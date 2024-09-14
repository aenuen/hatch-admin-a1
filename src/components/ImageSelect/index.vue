<template>
  <div>
    <el-button type="primary" size="mini" class="button" @click="popupOpen">选择图片</el-button>
    <!-- 添加弹窗 -->
    <el-dialog v-if="popupVisible" :visible.sync="popupVisible" width="830px" title="图片选择" :before-close="popupClose">
      <div class="content">
        <ul>
          <li v-for="(item, index) in tableData" :key="index">
            <el-image :src="item.file" :style="image" fit="cover" />
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <div style="text-align: center">
        <Pagination :hidden="tableDataLength <= 0" :total="tableDataLength" :page.sync="queryList.page" :limit.sync="queryList.pageSize" :page-sizes="[8, 16, 24]" @pagination="refresh" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
// api
import api from '@/api'
// components
import Pagination from '@/components/Pagination'
// data
// filter
// function
// mixin
// plugins
// settings
export default {
  name: 'ComponentsImageSelect',
  components: { Pagination },
  mixins: [],
  data() {
    return {
      api,
      popupVisible: false,
      tableData: [],
      tableDataLength: 0,
      queryList: {
        page: 1,
        pageSize: 16,
      },
    }
  },
  computed: {
    image() {
      return {
        width: '90px',
        height: '90px',
      }
    },
  },
  created() {
    this.startHandle()
  },
  methods: {
    startHandle() {
      api.article.imageList(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { list, count } = data
          this.tableData = list
          this.tableDataLength = count
        } else {
          this.$message.error(msg)
        }
      })
    },
    refresh(query) {
      this.queryList = { ...this.queryList, page: query.page, pageSize: query.limit }
      this.$nextTick(() => {
        this.startHandle()
      }, 100)
    },
    popupOpen() {
      this.popupVisible = true
    },
    popupClose() {
      this.popupVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.button {
  margin-bottom: 10px;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.content {
  width: 790px;
  overflow: hidden;
  ul {
    width: 800px;
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 90px;
    height: 90px;
    background: #000;
    margin: 10px 10px 0 0;
  }
}
</style>
