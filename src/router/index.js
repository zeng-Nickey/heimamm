import Vue from 'vue'

// 0. 导入 子组件
import login from '../views/login/index'
import index from '../views/index/index.vue'
import user from '../views/index/user/user.vue'
import subject from '../views/index/subject/subject.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'
import business from '../views/index/business/business.vue'

//引入进度条 的包
import NProgress from 'nprogress'
//引入进度条的css文件
import 'nprogress/nprogress.css'

// 1. 导入 vue-router
import VueRouter from 'vue-router'
// 2. 注册 vue-router
Vue.use(VueRouter)
// 3. 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [{
            path: '/login', //配置地址
            component: login, //填入一个组件名(填入import的名字)
            meta:{title:"登录"}
        },
        {
            path: '/index', //配置地址
            component: index,
            //主页面下的子路由用children添加
            children: [{
                    path: 'user',
                    component: user,
                },
                {
                    path: 'chart',
                    component: chart,
                },

                {
                    path: 'subject',
                    component: subject,
                },
                {
                    path: 'question',
                    component: question,
                },
                {
                    path: 'business',
                    component: business,
                },
            ]
        },
    ]
}) 
// 4. 需要在下面注入router

//  我们把 导航守卫要写在创建router对象的后面
//  这个回调函数 是在即将跳转路由之前调用的
//  to 到哪里去
//  from 从哪里来
//  他们两个都是一个对象,对象中的path 使他们的路径
//  next是一个函数  调用这个函数代表放行

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
//  跳转之后的钩子  跳转后 执行
//  to 到哪里去
//  from 从哪里来 
router.afterEach(() => {
    NProgress.done()
})
export default router