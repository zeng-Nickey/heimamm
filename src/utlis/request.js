import axios from "axios"
//克隆一个新的请求对象---名字叫Request
let Request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 允许携带cookie
    withCredentials: true
})
//导入token
import {getToken} from "@/utlis/token.js"
//添加一个拦截器---去axios官网复制粘贴,但是要改axios名字
Request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //在拦截器这添加请求头
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//暴露出去
export default Request;