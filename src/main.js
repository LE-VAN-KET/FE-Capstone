import Vue from 'vue'
// import './plugins/axios.js'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from './api/index'
import './mock/index.js'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'

Vue.config.productionTip = false

// 将导入的接口文件全局挂载在vue全局上
Vue.prototype.$api = api
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
