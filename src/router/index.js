import Vue from 'vue'

// 0. 导入 子组件
import login from '../views/login/index'
import index from '../views/index/index.vue'

import childrenrouter from "./childrenrouter.js"
//引入vuex
import store from '../store/store'

import {info} from "@/api/index.js";
import {removeToken} from "@/utlis/token.js";
import { Message} from "element-ui";
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
            meta: {
                title: "登录",
                roles:['超级管理员','管理员','老师','学生']
            }
            //路由元信息,给路由加标签
            //获取方法在路由内部用this.$route.meta.名字,在导航守卫也可以获取
        },
        //路由重定向-------
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: "首页",
                roles:['超级管理员','管理员','老师','学生']
            },
            //主页面下的子路由用children添加
            children: childrenrouter
        },
    ]
})
// 导航守卫------------------------
let whiteurl = ['/login', '/reg']
//  我们把 导航守卫要写在创建router对象的后面
//  这个回调函数 是在即将跳转路由之前调用的
//  to 到哪里去     from 从哪里来
//  他们两个都是一个对象,对象中的path 使他们的路径
//  next是一个函数  调用这个函数代表放行

router.beforeEach((to, from, next) => {
    NProgress.start()
    //如果是登录页面就直接放行
    //路由白名单,存放一些不需要权限验证的路径,遇到名单里的路径可以直接跳转   
    //if(to.path=='/login'){
    if (whiteurl.includes(to.path)) {
        next()
    } else {
        //别的页面就要做token的真假判断了
        info().then(res => {
            if (res.data.code == 200) {
                //如果是启用就放行
                if (res.data.data.status == 1) {
                    //将服务器取出来的用户名存放到vue-x
                    store.commit('changeusername', res.data.data.username);
                    store.commit('changeAvatar', process.env.VUE_APP_URL + "/" + res.data.data.avatar)
                    //什么token是对的,可以直接放行
                //如果是登录页面过来的才提示登录成功
                if(from.path=='/login'){
                    Message.success('登录成功');
                }
                    //就算账号启用也不能无条件放行,要判断该账户是否有权限访问
                    // console.log(to);--发现to.meta.roles可以判断权限
                    //我们要判断当前登录的用户是不是在这些角色里面

                //判断一个数组是否包含一个元素,包含得到true,不包含得到false
                //判断要去的页面是否柏寒我当前登录用户的角色
                //保存vue-x
                store.commit('changerole',res.data.data.role)
                if(to.meta.roles.includes(res.data.data.role)){
                    next()
                } else{
                    Message.success('该页面,你无权限访问');  
                    NProgress.done()
                    //打回来的时候的页面
                    next(from.path)
                }
                } else {
                    Message.warning('账号被禁用,请与管理员联系')
                    //优化进度条,手动把进度条完成
                    NProgress.done()
                    //放行到登录页面
                    //打回登录页面
                    next("/login");
                }
            } else if (res.data.code == 206) {
                //弹出框提示:因为这里不是在vue,是js文件,这里的this不是vue实例,所以没有 this.$message
                //   this.$message.error("登录状态异常,重新登录");
                Message.error("登录状态异常,重新登录")
                //这里要把错误的token删掉
                removeToken();
                //优化进度条,手动把进度条完成
                NProgress.done()
                //放行到登录页面
                next("/login");
            }
        });
    }

})
//  跳转之后的钩子  跳转后 执行
//  to 到哪里去
//  from 从哪里来 
router.afterEach((to) => {
    //进来以后完成进度条
    NProgress.done()
    //进入页面后取出当前页面的标签,设置给title
    document.title = to.meta.title
})
export default router