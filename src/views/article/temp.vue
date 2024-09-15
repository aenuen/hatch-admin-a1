<template>
  <div class="tinymce-editor">
    <Editor :id="tinymceId" v-model="myValue" :init="init" />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue' // 编辑器引入
import 'tinymce/themes/silver/theme' // 编辑器主题
import 'tinymce/icons/default' // 引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/plugins/advlist' // 高级列表
import 'tinymce/plugins/autolink' // 自动链接
import 'tinymce/plugins/link' // 超链接
import 'tinymce/plugins/image' // 插入编辑图片
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/charmap' // 特殊字符
import 'tinymce/plugins/media' // 插入编辑媒体
import 'tinymce/plugins/wordcount' // 字数统计
// import 'tinymce/plugins/colorpicker' // 选择颜色插件
// import 'tinymce/plugins/textcolor' // 文本颜色插件
// import 'tinymce/plugins/print' // 打印
import 'tinymce/plugins/preview' // 预览
// import 'tinymce/plugins/paste'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/save'
import 'tinymce/plugins/autosave'
// import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/table'
import 'tinymce/plugins/codesample'
// import 'tinymce/plugins/hr'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
// import 'tinymce/plugins/powerpaste' // 粘贴图片
import 'tinymce/plugins/emoticons/js/emojis'
// import 'tinymce/plugins/uploadImg' // 这里需要将插件引入
import 'tinymce/plugins/autoresize' // 编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
export default {
  components: {
    Editor,
  },
  props: {
    reportIndex: { type: Number, default: null },
    // 内容
    value: { type: String, default: '' },
    // 用于区分单个tinymce
    tinymceId: { type: String, default: 'tinymce' },
    disabled: { type: Boolean, default: false },
    // 插件
    plugins: { type: [String, Array], default: 'myimg table advlist lists image' },
    // 工具栏
    toolbar: { type: [String, Array], default: 'myimg | code | forecolor backcolor bold italic underline strikethrough | formatselect | align | bullist numlist | table image' },
    // 隐藏菜单栏
    menubar: { type: Boolean, default: false },
    // 最下方的元素路径和字数统计那一栏是否显示
    statusbar: { type: Boolean, default: false },
    // 元素路径是否显示
    elementpath: { type: Boolean, default: false },
    // 设置为“true”即允许粘贴图像，而将其设置为“false”则不允许粘贴图像。
    pasteDataImages: { type: Boolean, default: true },
    // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    resize: { type: [Boolean, String], default: 'both' },
    // 高度
    height: { type: [Number, String], default: 200 },
    //  插入word文档需要该属性
    pasteConvertWordFakeLists: { type: Boolean, default: true },
    placeholder: { type: String, default: '在这里输入内容' },
    // 上传图片地址
    imgUploadUrl: { type: String, default: '' },
  },
  data() {
    return {
      // 初始化配置
      myValue: this.value,
      init: {
        selector: '#' + this.tinymceId,
        language_url: '/tinymce/langs/zh_CN.js', // 汉化路径是自定义的，一般放在public或static里面
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide', // 皮肤：浅色
        // skin_url: "/tinymce/skins/ui/oxide-dark", //皮肤：暗色
        plugins: this.plugins, // 插件
        toolbar: this.toolbar,
        plugin_preview_width: 375, // 预览宽度
        plugin_preview_height: 668,
        toolbar_location: '/',
        content_style: 'img {max-width:100%;}', // 直接自定义可编辑区域的css样式
        toolbar_drawer: 'sliding',
        menubar: this.menubar, // 隐藏菜单栏
        statusbar: this.statusbar, // 最下方的元素路径和字数统计那一栏是否显示
        elementpath: this.elementpath, // 元素路径是否显示
        branding: false, // 隐藏品牌标识
        paste_data_images: this.pasteDataImages, // 设置为“true”即允许粘贴图像，而将其设置为“false”则不允许粘贴图像。
        resize: this.resize, // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
        height: this.height, // 高度
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_convert_word_fake_lists: this.pasteConvertWordFakeLists, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        placeholder: this.placeholder,
        // 链接打开方式
        default_link_target: '_blank',
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure)
        },
        init_instance_callback: (editor) => {
          if (this.value) {
            editor.setContent(this.value)
          }
          this.hasInit = true

          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            // const val = editor.getContent().replace(/<p><img\s?src="data.*?<\/p>/g, '')
            this.$emit('input', editor.getContent())
          })

          editor.on('paste', (evt) => {
            // 监听粘贴事件
            console.log('监听粘贴事件', evt)
            this.onPaste(evt)
          })
        },
        // 自定义工具栏功能
        setup: function (editor) {
          editor.ui.registry.addButton('myimg', {
            // text: "插入推荐的商品链接",
            icon: 'image',
            onAction: () => {
              console.log('插入推荐的商品链接')
            },
          })
        },
      },
      uploadTimeOut: null,
      removeFn: null,
    }
  },
  watch: {
    // 监听内容变化
    value(newValue) {
      this.myValue = newValue == null ? '' : newValue
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit('change', newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
  },

  mounted() {
    tinymce.init({})
  },
  methods: {
    onPaste(event, success, failure) {
      // let _this = this;
      const self = this

      // 实现图⽚粘贴上传
      const items = (event.clipboardData || window.clipboardData).items
      // items为伪数组微信/QQ截图以及此富⽂本区域内复制粘贴的length为1,⿏标右键复制粘贴图⽚以及⽂本的复制粘贴的length为2;
      const len = items.length
      for (let i = 0; i < len; i++) {
        if (items[i].kind === 'file' && items[i].type.indexOf('image') !== -1) {
          // 判断是否为图⽚类型
          event.preventDefault() // 如果是图⽚阻⽌⾃动粘贴到富⽂本编辑器
          const file = items[i].getAsFile() // 获取⽂件数据
          const blob = new Blob([file], { type: file.type }) // 实例化⼀个blob 将图⽚⼤⼩以及类型初始化到blob⾥
          // let index = file.name.lastIndexOf(".");
          // let fileName =
          //   Date.now() + file.name.substring(index, file.name.length);
          // fileName --- 图⽚名称可⾃⾏处理
          console.log('粘贴的是图⽚类型', blob, file)
          // let file = blobInfo.blob();
          const CancelToken = axios.CancelToken
          const isLt2M = file.size / 1024 < 500
          if (!isLt2M) {
            failure('上传失败，图片不可超过500KB!')
            return false
          }
          const formdate = new FormData()
          formdate.append('file', file) // imageFile文件名和后端统一
          axios({
            url: this.imgUploadUrl,
            method: 'post',
            data: formdate,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer${store.state.login.login.access_token}`,
            },
            cancelToken: new CancelToken(function executor(c) {
              self.cancel = c
            }),
          })
            .then((response) => {
              const { code } = response.data
              if (code === 200) {
                const { filePath } = response.data.data // "http://127.0.0.1:8080/fileUpload/20220609/998e9ea0-8f00-42f8-9a71-901e81855921.png"
                // 图⽚上传成功,插⼊到富⽂本编辑器
                if (filePath) {
                  // let url =
                  //   filePath.indexOf("http://") != -1
                  //     ? filePath.replace("http://", "https://")
                  //     : filePath;
                  tinymce.execCommand('mceReplaceContent', false, `<img class="wscnph" src="${filePath}" >`)
                }
              } else {
                this.$message.error(response.data.msg)
              }
            })
            .catch(function (err) {
              // 上传错误可⾃⾏给出提⽰
              this.$message.error(err)
            })
        } else {
          // 不是图⽚类型直接粘贴, 跳过oss上传处理
          console.log('粘贴的不是图⽚')
        }
      }
    },
    // change触发事件
    tinymcechange(e) {
      this.$emit('eventHandle', {
        type: 'change',
        data: e,
        reportIndex: this.reportIndex,
      })
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    },
    handleImgUpload(blobInfo, success, failure) {
      console.log('我要上传')
      const self = this
      const file = blobInfo.blob()
      const CancelToken = axios.CancelToken
      const isLt2M = file.size / 1024 < 500
      // var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      // const extension = testmsg === "jpg";
      // const extension2 = testmsg === "png";
      // if (!extension && !extension2) {
      //   failure("上传文件只能是 jpg、png格式!");
      //   return false;
      // }
      if (!isLt2M) {
        failure('上传失败，图片不可超过500KB!')
        return false
      }
      const formdate = new FormData()
      formdate.append('file', blobInfo.blob()) // imageFile文件名和后端统一
      axios({
        url: this.imgUploadUrl,
        method: 'post',
        data: formdate,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer${store.state.login.login.access_token}`,
        },
        cancelToken: new CancelToken(function executor(c) {
          self.cancel = c
        }),
        // onUploadProgress: progressEvent => {
        //   this.uploadPercent = Math.round(
        //     (progressEvent.loaded / progressEvent.total) * 100
        //   );
        // }
      }).then((response) => {
        console.log('response', response.data)
        if (response.data.code === 200) {
          const url = response.data.data.filePath
          console.log('成功了', url)
          success(url) // 回显url
        } else {
          failure(response.data.msg)
          this.$message.error(response.data.msg)
        }
      })
    },
  },
}
</script>
