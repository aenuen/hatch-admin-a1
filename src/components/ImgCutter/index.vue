<template>
  <div>
    <img-cutter
      ref="imgCutterModal"
      label="选择图片"
      file-type="jpeg"
      watermark-text="图片剪切"
      watermark-text-font="12px Sans-serif"
      watermark-text-color="#00ff00"
      cross-origin-header="*"
      rate=""
      tool-bgc="none"
      :cross-origin="true"
      :is-modal="false"
      :show-choose-btn="true"
      :lock-scroll="true"
      :box-width="775"
      :box-height="458"
      :cut-width="250"
      :cut-height="250"
      :size-change="true"
      :move-able="true"
      :img-move="true"
      :original-graph="false"
      :watermark-text-x="0.95"
      :watermark-text-y="0.95"
      :small-to-upload="true"
      :save-cut-position="true"
      :scale-able="true"
      :preview-mode="true"
      :tool-box-overflow="true"
      :index="1"
      @cutDown="cutDown"
    />
  </div>
</template>

<script>
import ImgCutter from 'vue-img-cutter'
export default {
  name: 'ComponentsImgCutter',
  components: { ImgCutter },
  methods: {
    cutDown(res) {
      this.$emit('onCutSuccess', res)
    }
  }
}
</script>

<style lang="scss">
.dialogMain {
  .copyright {
    a {
      display: none;
    }
  }
}
</style>
