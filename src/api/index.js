import axios from "axios"


//导入token的文件
import {
    getToken
} from "@/utlis/token.js"
//获取登录的用户信息
// export function info(){
//   return  axios({
//         url:process.env.VUE_APP_URL+'/info',
//         method:'get',
//         headers:{
//             //从本地存储中取出token
//             token:getToken()
//         }
//     })
// }
// //退出登录请求
// export function logout(){
//     axios({
//         url:process.env.VUE_APP_URL+'/logout',
//         method:'get',
//         headers:{
//             //从本地存储中取出token
//             token:getToken()
//         }
//     })
// }

//优化代码
//利用axios的create方法.克隆一个axios对象--indexreq出来,它可以继承相关共有的属性
let indexreq = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_URL,
    // 请求头-----这里不能设置请求头,因为会导致token第一次获取不到数据,要刷新一次才能获取到数据,所以要在拦截器中设置请求头---方法一
    // 方法二---每次发送请求我们手动添加请求头,如上注释
    // headers:{
    //     token: getToken()
    // }
})
// 添加请求拦截器
//代表以后只要是indexreq发的请求都会被拦截下来
indexreq.interceptors.request.use(function (config) {
//这里对config里的hearders加一个token,每次发送请求都会带token了
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 获取登录的用户信息
export function info() {
    return indexreq({
        url: "/info",
        method: "get"
    })
}
// 退出请求
export function logout() {
    return indexreq({
        url: "/logout",
        method: "get"
    })
}
