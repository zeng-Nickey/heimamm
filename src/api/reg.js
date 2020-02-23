import axios from "axios"
export function sendSMS(data
    
    ) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: 'post',
        data,
        // 允许携带cookie
        withCredentials: true
    })
    //这里的.then不需要写,以便更多人调用
}

//发注册账号接口的请求
export function reg(data){
    return axios({
        url: process.env.VUE_APP_URL + "/register",
        method:'post',
        data,
        // 允许携带cookie
        withCredentials: true
      
    })
}