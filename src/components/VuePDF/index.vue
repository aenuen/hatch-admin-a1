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
    this.src = pdf.createLoadingTask(this.pdfSrc)
    this.src.promise
      .then((pdf) => {
        this.showcaseTotal = pdf.numPages
      })
      .catch((error) => {
        console.log(error)
      })
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
@import url('./styles/index.scss');
</style>
