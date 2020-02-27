import Vue from 'vue'
import vuex from "vuex"
Vue.use(vuex)
const store=new vuex.Store({
    state:{
        username:"",
        avatar:""
    },
    mutations:{
    changeusername(state,val){
        state.username=val
    },
    changeAvatar(state,val){
        state.avatar=val
    }
    }
})
export default store