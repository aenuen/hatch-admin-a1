<template>
  <div>
    <el-dialog v-if="importShow" title="导入数据" width="500px" :visible.sync="importShow">
      <upload :file-text="fileText" :file-list="fileList" :file-limit="fileLimit" :file-accept="fileAccept" :file-action="fileAction" :file-disabled="fileDisable" :file-data="fileData" @onSuccess="onImportSuccess" />
    </el-dialog>
    <el-button @click="controlImport(true)">上传</el-button>
  </div>
</template>

<script>
import Upload from './default'

export default {
  name: 'UploadImport',
  components: { Upload },
  props: {
    fileAction: { type: String, default: '' },
    fileAccept: { type: String, default: 'application/vnd.ms-excel' }
  },
  data() {
    return {
      fileList: [],
      fileLimit: 1,
      fileText: 'Excel文件',
      fileDisable: false,
      fileData: {},
      importShow: false
    }
  },
  methods: {
    controlImport(control) {
      this.importShow = control
    },
    onImportSuccess(data) {
      this.$emit('onImportSuccess', data)
    }
  }
}
</script>
