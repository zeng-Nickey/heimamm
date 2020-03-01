import user from '../views/index/user/user.vue'
import subject from '../views/index/subject/subject.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'
import business from '../views/index/business/business.vue'
export default [{
    path: 'user',
    component: user,
    meta: {
        title: "用户页面",
        roles:['超级管理员','管理员']
    }
},
{
    path: 'chart',
    component: chart,
    meta: {
        title: "图表页面",
        roles:['超级管理员','管理员']
    }
},

{
    path: 'subject',
    component: subject,
    meta: {
        title: "学科页面",
        roles:['超级管理员','管理员','老师','学生']
    }
},
{
    path: 'question',
    component: question,
    meta: {
        title: "问题收集",
        roles:['超级管理员','管理员','老师','学生']
    }
},
{
    path: 'business',
    component: business,
    meta: {
        title: "商业页面",
        roles:['超级管理员','管理员','老师',]
    }
},
]