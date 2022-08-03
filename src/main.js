import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import * as directives from '@/directives'

import '@/icons' // icon
import '@/permission' // permission control

// mock 假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 注册element ui
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// dev：development 开发
// test：测试
// production 生产
// 关闭生产提示
Vue.config.productionTip = false

// Vue.directive('imgError', {
//   inserted: function (el, { value }) {
//     el.onerror = function () {
//       el.src = value
//     }
//   }
// })

for (let key in directives) {
  Vue.directive(key, directives[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
