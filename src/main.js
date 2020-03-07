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
// 导入全局过滤器
//我们这个文件只需要保证能够执行里面的代码就好了,所以简单导入
import '@/filter/filters.js'

//导入全局学科下拉框组件
import subjectSelect from "./components/subjectSelect.vue"
Vue.component('subjectSelect',subjectSelect)

//导入全局企业下拉框组件
import businessSelect from "./components/businessSelect.vue"
Vue.component('businessSelect',businessSelect)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
