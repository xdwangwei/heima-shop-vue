import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs = qs



/* 全局挂载，之后直接this.$http就可以发起请求，如this.$http.get */
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://localhost:8999/"

/* 导入全局样式 */
import './assets/css/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
