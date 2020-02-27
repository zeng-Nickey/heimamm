import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入样式直接import路径就可
import  './style/base.css'
Vue.config.productionTip = false

//导入vuex对象
import store from './store/store.js'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
