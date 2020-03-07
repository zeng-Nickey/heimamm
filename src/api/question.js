//因为封装了一个请求文件,所以可以直接导入
import Request from "@/utlis/request.js"
//暴露一个题库列表的接口---这里跟登录页面一致
export function questionList(params) {
    return Request({
        url: "/question/list",
        method: "get",
        params,
    })
}
//暴露获取单个题目详细信息接口
export function questionOne(data) {
    return Request({
        url: "/question/one",
        method: "post",
        data,
    })
}
//暴露新增接口
export function questionAdd(data) {
    return Request({
        url: "/question/add",
        method: "post",
        data,
    })
}
//暴露一个修改状态的接口
export function changeStatus(data) {
    return Request({
        url: "/question/status",
        method: "post",
        data,
    })
}
// 暴露一个删除的接口
export function Remove(data) {
    return Request({
        url: "/question/remove",
        method: "post",
        data,
    })
}
// //题库上传的接口
// export function upload(data) {
//     return Request({
//         url: "/question/upload",
//         method: "post",
//         data,
//     })
// }
// 暴露一个编辑的接口
export function questionEdit(data) {
    return Request({
        url: "/question/edit",
        method: "post",
        data,
    })
}