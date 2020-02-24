const tokenKey ="hmmmtoken"
//获取token,记得return
export function getToken(){
    return window.localStorage.getItem(tokenKey)
}
//存储token,它有一个参数接受token值
export function setToken(token){
    window.localStorage.setItem(tokenKey,token)
}
//删除token
export function removeToken(){
    window.localStorage.removeItem(tokenKey)
}