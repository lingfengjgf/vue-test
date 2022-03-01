import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false


new Vue({
  // 添加到配置项中，为什么？
  router,

  store,
  render: h => h(App)
}).$mount('#app')
