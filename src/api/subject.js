import axios from "axios"
//克隆一个新的请求对象
let subRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 允许携带cookie
    withCredentials: true
})
//导入token
import {
    getToken
} from "@/utlis/token.js"
//添加一个拦截器---去axios官网复制粘贴,但是要改axios名字
subRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //在拦截器这添加请求头
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//暴露一个学科列表的接口---这里跟登录页面一致
export function subjectList(params) {
    return subRequest({
        url: "/subject/list",
        method: "get",
        params,
    })
}
//暴露一个修改学科状态的接口
export function changeStatus(data) {
    return subRequest({
        url: "/subject/status",
        method: "post",
        data,
    })
}