import Vue from 'vue'
import vuex from "vuex"
Vue.use(vuex)
const store=new vuex.Store({
    state:{
        username:"",
        avatar:"",
        //角色
        role:"",
    },
    mutations:{
        //专门用来修改用户名的方法
    changeusername(state,val){
        state.username=val
    },
    //专门用来修改头像的方法
    changeAvatar(state,val){
        state.avatar=val
    },
    //专门用来修改用户角色的方法---权限
    changerole(state,val){
        state.role=val
    }
    }
})
export default store