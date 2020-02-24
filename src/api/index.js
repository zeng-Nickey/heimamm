import axios from "axios"
//导入token的文件
import {getToken} from "@/utlis/token.js"
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
let indexreq=axios.create({
// 基地址
baseURL:process.env.VUE_APP_URL,
// 请求头
headers:{
    token: getToken()
}
})
// 获取登录的用户信息
export function info() {
    return indexreq({
        url:"/info",
        method:"get"  
    })
}
// 退出请求
export function logout() {
    return indexreq({
        url:"/logout",
        method:"get"  
    })
}
