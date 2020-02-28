import Vue from 'vue'
import moment from 'moment'
// 过滤器
// Vue.filter('过滤器的名字',val => {
    
//     //val就是要过滤的内容
// })
Vue.filter('formTime',val => {
    //val就是要过滤的内容,我需要一个日期的格式:yy-mm-ss
    //需要用moment插件
//- 下包
//   - npm i moment
//   - 导包
//     - import moment from 'moment'
//   - 用包
//     - moment(传入要改格式的日期).format('YYYY-MM-DD')然后再return
return moment(val).format('YYYY-MM-DD')
})