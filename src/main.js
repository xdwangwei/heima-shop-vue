import Vue from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
