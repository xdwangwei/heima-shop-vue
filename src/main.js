import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'

/* axios会将数据以json格式处理，qs能够将json数据转为x-www-urlencoded格式，也就是post请求携带表单数据 */
Vue.prototype.$qs = qs


axios.defaults.baseURL = "http://localhost:8999/"
/* axios请求拦截 */
axios.interceptors.request.use(config => {
  /* 为请求添加请求头中Authorizaiton字段值 */
  config.headers.Authorization = window.sessionStorage.getItem("token")
  /* 这里一定要return */
  return config
})
/* 全局挂载，之后直接this.$http就可以发起请求，如this.$http.get */
Vue.prototype.$http = axios

/* 导入全局样式 */
import './assets/css/global.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
