<template>
  <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <ImageSelect color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import ImageSelect from '@/components/ImageSelect'
import plugins from './modules/plugins'
import toolbar from './modules/toolbar'
import loadJs from './modules/loadJs'
const tinymceCDN = '/plugins/tinymce/tinymce.min.js'

export default {
  name: 'Tinymce',
  components: { ImageSelect },
  props: {
    id: { type: String, default: () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '') },
    value: { type: String, default: '' },
    toolbar: { type: Array, required: false, default: () => [] },
    menubar: { type: String, default: 'file edit insert view format table' },
    height: { type: [Number, String], required: false, default: 360 },
    width: { type: [Number, String], required: false, default: 'auto' },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: { en: 'en', zh: 'zh_CN', es: 'es_MX', ja: 'ja' },
    }
  },
  computed: {
    // 计算宽度
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return `${width}px`
      }
      return width
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    },
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    // 初始化
    init() {
      loadJs(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
        } else {
          this.initTinymce()
        }
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        convert_urls: false,
        images_dataimg_filter(img) {
          console.log('🚀 ~ images_dataimg_filter ~ img', img)
          setTimeout(() => {
            const $image = img
            $image.removeAttr('width')
            $image.removeAttr('height')
            if ($image[0].height && $image[0].width) {
              $image.attr('data-wscntype', 'image')
              $image.attr('data-wscnh', $image[0].height)
              $image.attr('data-wscnw', $image[0].width)
              $image.addClass('image')
            }
          }, 0)
          return img
        },
        images_upload_handler(blobInfo, success, failure, progress) {
          progress(0)
          const formData = new FormData()
          formData.append('files[]', blobInfo.blob(), blobInfo.filename())
          api.image
            .upload(formData)
            .then(({ code, data, msg }) => {
              const { url } = data
              success(url)
              progress(100)
            })
            .catch((err) => {
              failure('出现未知问题，刷新页面，或者联系程序员')
              console.log(err)
            })
        },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      arr.forEach((v) => window.tinymce.get(this.tinymceId).insertContent(`<img class="image" src="${v}" >`))
    },
  },
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-step: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
