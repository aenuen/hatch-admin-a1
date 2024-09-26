<template>
  <div>
    <canvas v-for="index in pdfPages" :id="'pdfCanvas' + index" :key="index" class="pdfPage" />
  </div>
</template>
<script>
// api
import api from '@/api'
// components
// data
// filter
// function
// mixin
// plugins
import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
// settings
export default {
  name: 'PDFViewer',
  data() {
    return {
      api,
      pdfUrl: 'http://localhost:20381/1.pdf',
      pdfDoc: null,
      pdfPages: 0,
    }
  },
  created() {},
  mounted() {
    this.loadFile(this.pdfUrl)
  },
  methods: {
    loadFile(url) {
      PDFJS.getDocument({ url: url, withCredentials: true })
        .promise.then((pdf) => {
          this.pdfDoc = pdf
          this.pdfPages = pdf.numPages
          this.$nextTick(() => {
            this.renderPage(1)
          })
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    renderPage(num) {
      this.pdfDoc.getPage(num).then((page) => {
        const canvas = document.getElementById('pdfCanvas' + num)
        const context = canvas.getContext('2d')
        const viewport = page.getViewport({ scale: 1 })
        console.log('🚀 ~ this.pdfDoc.getPage ~ viewport', viewport)
        // 计算canvas的宽高
        const width = viewport.width || viewport.viewBox[2]
        const height = viewport.height || viewport.viewBox[3]
        canvas.width = width
        canvas.height = height
        // 重要：修正Y轴方向的颠倒
        const transform = canvas.getContext('2d').getTransform()
        transform.d = -transform.d
        transform.f = height - transform.f
        canvas.getContext('2d').setTransform(transform.a, transform.b, transform.c, transform.d, transform.e, transform.f)
        // 渲染页面
        page.render({ canvasContext: context, viewport })
        if (this.pdfPages > num) {
          this.renderPage(num + 1)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.pdfPage {
  display: block;
  border: 1px solid #ccc;
  margin: 10px;
}
</style>
