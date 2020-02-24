import Vue from 'vue'

// 0. 导入 子组件
import login from '../views/login/index'
import index from '../views/index/index.vue'
import user  from '../views/index/user/userindex.vue'
// 1. 导入 vue-router
import VueRouter from 'vue-router'
// 2. 注册 vue-router
Vue.use(VueRouter)
// 3. 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [{
            path: '/login', //配置地址
            component: login //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        {
            path: '/index', //配置地址
            component: index ,
            //主页面下的子路由用children添加
            children:[
               {
                path: 'user' ,
                component: user ,  
               }

            ]
        },
    ]
}) // 4. 需要在下面注入router

export default router