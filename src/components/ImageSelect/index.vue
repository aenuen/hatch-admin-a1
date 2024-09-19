<template>
  <div>
    <el-button type="primary" size="mini" class="button" @click="popupOpen">选择图片</el-button>
    <!-- 添加弹窗 -->
    <el-dialog v-if="popupVisible" :visible.sync="popupVisible" width="830px" title="选择图片" :before-close="popupClose">
      <div class="content">
        <ul>
          <li v-for="(item, index) in tableData" :key="index" @click="toggleSelect(item.file)">
            <div v-if="selectedAry.includes(item.file)" class="area"></div>
            <el-image :src="item.file" :style="image" :title="item.name" fit="cover" />
          </li>
        </ul>
      </div>
      <div class="action">
        <el-upload :headers="headers" :action="action" :accept="accept" multiple :file-list="fileList" :show-file-list="false" :on-success="onSuccess">
          <el-button type="primary" class="el-icon-upload"> 点击上传 </el-button>
        </el-upload>
        <el-button type="success" class="el-icon-check" @click="insertImage"> 插入选中 </el-button>
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
import { getToken } from '@/libs/token'
import { defineAccept, aoDeleteValue } from 'abbott-methods/import'
// settings
import { apiBaseUrl } from '@/settings'
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
        pageSize: 24,
      },
      fileList: [],
      selectedAry: [],
    }
  },
  computed: {
    image() {
      return {
        width: '90px',
        height: '90px',
      }
    },
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      }
    },
    action() {
      return `${apiBaseUrl}/image/upload`
    },
    accept() {
      return defineAccept(['jpg', 'jpeg', 'gif', 'png'])
    },
  },
  created() {
    this.startHandle()
  },
  methods: {
    // 上传成功回调事件
    onSuccess({ code, data }, file) {
      if (code === 200) {
        this.startHandle()
        this.$message.success('上传成功')
      }
    },
    // 切换选中
    toggleSelect(url) {
      if (this.selectedAry.includes(url)) {
        this.selectedAry = aoDeleteValue(this.selectedAry, url)
      } else {
        this.selectedAry.push(url)
      }
    },
    // 插入选中
    insertImage() {
      if (this.selectedAry.length > 0) {
        this.$emit('successCBK', this.selectedAry)
        this.$nextTick(() => {
          this.selectedAry = []
          this.popupVisible = false
        }, 100)
      } else {
        this.$message.error('请选择要插入的图片')
      }
    },
    // 开始处理
    startHandle() {
      api.image.list(this.queryList).then(({ code, data, msg }) => {
        if (code === 200) {
          const { list, count } = data
          this.tableData = list
          this.tableDataLength = count
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 刷新
    refresh(query) {
      this.queryList = { ...this.queryList, page: query.page, pageSize: query.limit }
      this.$nextTick(() => {
        this.startHandle()
      }, 100)
    },
    // 打开弹窗
    popupOpen() {
      this.startHandle()
      this.popupVisible = true
    },
    // 关闭弹窗
    popupClose() {
      this.popupVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.action {
  text-align: center;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  .el-button {
    margin-right: 10px;
  }
}
.pagination-container {
  margin-top: 0;
}
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
    position: relative;
    cursor: pointer;
    .area {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      right: 0;
      top: 0;
      border: 2px solid green;
      text-align: right;
      color: green;
    }
  }
}
</style>
