import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import '@/assets/styles/element-variables.scss'
import '@/assets/styles/index.scss'
import App from './App'
import store from './store'
import router from './router/constant' // 固定路由
import './libs/svgIcon' // 图标
import './each' // token判断
import './libs/utils/errorLog'

import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

Vue.prototype.$driver = new Driver({
  allowClose: false, // 禁止点击外部关闭
  doneBtnText: '完成', // 完成按钮标题
  closeBtnText: '关闭', // 关闭按钮标题
  stageBackground: '#fff', // 引导对话的背景色
  nextBtnText: '下一步', // 下一步按钮标题
  prevBtnText: '上一步' // 上一步按钮标题
})
// import * as filters from './libs/filter'

// import enLang from 'element-ui/lib/locale/lang/en'
// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // 设置元素ElementUI默认大小
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// // 注册全局过滤器
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
