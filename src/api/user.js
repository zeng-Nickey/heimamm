import Request from "@/utlis/request.js"

//暴露一个用户列表的接口---这里跟登录页面一致
export function userList(params) {
    return Request({
        url: "/user/list",
        method: "get",
        params,
    })
}

//暴露一个新增学科的接口
export function userAdd(data) {
    return Request({
        url: "/user/add",
        method: "post",
        data,changeStatus
    })
}
//暴露一个修改用户状态的接口
export function changeStatus(data) {
    return Request({
        url: "/user/status",
        method: "post",
        data,
    })
}
// 暴露一个删除用户的接口
export function Removeuser(data) {
    return Request({
        url: "/user/remove",
        method: "post",
        data,
    })
}
//暴露一个编辑用户信息的接口
export function Edituser(data) {
    return Request({
        url: "/user/edit",
        method: "post",
        data,
    })
}