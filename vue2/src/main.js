import Vue from 'vue'
import App from './App.vue'
import store from './my-store'
// import store from './store'
import router from './my-router'
// import router from './router'

import '@/icon';

import Notice from './components/Notice';
import create from './utils/create';

Vue.config.productionTip = false

Vue.prototype.$notice = (opts)=>{
  const comp = create(Notice,opts);
  comp.show();
  return comp;
}

new Vue({
  // 添加到配置项中，为什么？
  router,

  store,
  render: h => h(App)
}).$mount('#app')
