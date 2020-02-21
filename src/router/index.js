import Vue from 'vue'

// 0. 导入 子组件
import login from '../views/login/index'
// 1. 导入 vue-router
import VueRouter from 'vue-router'
// 2. 注册 vue-router
Vue.use(VueRouter)
// 3. 实例化
const router = new VueRouter({
//这里就是路由的配制项
routes: [
 {
path: '/login',//配置地址
component: login //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
 }
  ]
}) // 4. 需要在下面注入router

export default router