import axios from "axios"
//暴露一个登录的方法出去
export function login(data){
return axios({
    url:process.env.VUE_APP_URL+'/login',
    method:'post',
    data,
    // 允许携带cookie
    withCredentials: true
})
}