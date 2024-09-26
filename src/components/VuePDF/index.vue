<template>
  <div class="PdfViewer">
    <div class="showcase">
      <pdf v-for="s in showcaseTotal" :id="'showcase' + s" :key="s" :src="src" class="showcase-page" />
    </div>
    <div class="thumbnail">
      <canvas v-for="t in thumbnailTotal" :id="'thumbnail' + t" :key="t" class="thumbnail-page" />
    </div>
  </div>
</template>
<script>
// api
// components
// data
// filter
// function
// mixin
// plugins
import pdf from 'vue-pdf'
import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
// settings
export default {
  name: 'VuePDFViewer',
  components: { pdf },
  mixins: [],
  data() {
    return {
      pdfSrc: 'http://localhost:20381/1.pdf',
      src: null,
      showcaseTotal: 0,
      pdfDoc: null,
      thumbnailTotal: 0,
      scale: 2,
    }
  },
  mounted() {
    // vue-pdf
    this.src = pdf.createLoadingTask(this.pdfSrc)
    this.src.promise
      .then((pdf) => {
        this.showcaseTotal = pdf.numPages
      })
      .catch((error) => {
        console.log(error)
      })
    // pdfjs
    this.loadFile(this.pdfSrc)
  },
  created() {},
  methods: {
    loadFile(url) {
      PDFJS.getDocument({ url: url, withCredentials: true })
        .promise.then((pdf) => {
          this.pdfDoc = pdf
          this.thumbnailTotal = pdf.numPages
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
        const canvas = document.getElementById('thumbnail' + num)
        const context = canvas.getContext('2d')
        const viewport = page.getViewport({ scale: 0.3 })
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
        if (this.thumbnailTotal > num) {
          this.renderPage(num + 1)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('./modules/index.scss');
</style>
