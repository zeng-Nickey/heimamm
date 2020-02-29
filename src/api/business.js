// import axios from "axios"
// //克隆一个新的请求对象
// let BusRequest = axios.create({
//     baseURL: process.env.VUE_APP_URL,
//     // 允许携带cookie
//     withCredentials: true
// })
// //导入token
// import {getToken} from "@/utlis/token.js"
// //添加一个拦截器---去axios官网复制粘贴,但是要改axios名字
// BusRequest.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     //在拦截器这添加请求头
//     config.headers.token = getToken()
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//以为封装了一个请求文件,所以可以直接导入
import Request from "@/utlis/request.js"
//暴露一个企业列表的接口---这里跟登录页面一致
export function businessList(params) {
    return Request({
        url: "/enterprise/list",
        method: "get",
        params,
    })
}
//暴露一个新增企业的接口
export function businessAdd(data) {
    return Request({
        url: "/enterprise/add",
        method: "post",
        data,
    })
}
//暴露一个修改企业状态的接口
export function changeStatus(data) {
    return Request({
        url: "/enterprise/status",
        method: "post",
        data,
    })
}
// 暴露一个删除企业的接口
export function RemoveB(data) {
    return Request({
        url: "/enterprise/remove",
        data,
    })
}
// 暴露一个企业编辑的接口
export function RemoveEdit(data) {
    return Request({
        url: "/enterprise/edit",
        data,
    })
}