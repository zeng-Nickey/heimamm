<template>
  <div class="wrap">
    <!-- 左侧登录页面 -->
    <div class="box">
      <!-- 表单标题 -->
      <div class="titleBox">
        <img src="./imgs/矢量智能对象 拷贝 9.png" alt />
        <span class="lefttitle">黑马面面</span>
        <span class="line"></span>
        <span class="righttitle">登录页面</span>
      </div>

      <!-- 下侧表单模块 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="43px">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            prefix-icon="el-icon-user"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="num">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.num" prefix-icon="el-icon-user" placeholder="请输入验证码"></el-input>
            </el-col>

            <el-col :span="7">
              <img class="code" :src="imgUrl" @click="getcode" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="checkbox">
          <div class="checkbox">
            
            <el-checkbox v-model="form.checkbox">  </el-checkbox>
              我已阅读并同意
              <el-link type="primary" :underline="false">用户协议</el-link>和
              <el-link type="primary" :underline="false">隐私条款</el-link>
          
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="box-btn">登录</el-button>
          <el-button type="primary" @click="goreg"  class="box-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="./imgs/login_banner_ele.png" alt />
   <!-- 注册reg组件 -->
   <reg ref="reg"></reg>
  </div>
</template>

<script>
import reg from './components/reg';
import {login} from '@/api/login.js';
import {getToken} from '@/utils/token.js';
export default {
  components:{
    reg
  },
  data() {
    return {
      //图片验证码
      imgUrl:process.env.VUE_APP_URL +"/captcha?type=login",
      
      form: {
        phone: "",
        password: "",
        num: "",
       checkbox: false
      },
      //规则对象
      rules: {
        
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],

        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        num: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        //多选框没有失去焦点,只要值改变事件
        //因为checkbox其实值不可能是空,它只有ture/flase.除非赋值为空
        // { required:true, message:'必须勾选同意用户协议',trigger:"change"},
        checkbox:[
          {//pattern为true才能满足条件,否则代表不匹配
          // 正则表达式
          pattern:/true/, message:'必须勾选同意用户协议',trigger:"change"
          }
        ]
      }
    };
  },
  //规则对象

  methods: {
    //表单验证的固定写法
    onSubmit() {
      //找到表单对象,调用validate方法
      this.$refs.form.validate(v=>{
        if(v){
          login({
           phone:this.form.phone,
           password:this.form.password,
           code:this.form.num,
          }).then(res=>{
            //把token存起来
            if(res.data.code==200){
            // window.localStorage.setItem('token',res.data.data.token)
            setToken(res.data.data.token)
            this.$message.success('登录成功');
            this.$router.push('/index');
            }else{
             this.$message.error(res.data.message) 
            }
          })
        }
      })
      // console.log("submit!");
    },
    goreg(){
     this.$refs.reg.dialogFormVisible=true
    },
    getcode(){
      this.imgUrl=process.env.VUE_APP_URL +"/captcha?type=login&zcj="+Date.now()
    }
  }
};
</script>

<style lang="less">
.wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  //弹性布局
  display: flex;
  //x主轴排列为space-around
  justify-content: space-around;
  //y副轴是center
  align-items: center;
  .box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    //因为padding会将盒子撑开所以,要把内边距消除
    box-sizing: border-box;
    .titleBox {
      display: flex;
      //副轴居中
      align-items: center;
      margin: 50px 0 31px 48px;

      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .lefttitle {
        margin-right: 14px;
        font-size: 22px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .righttitle {
        font-size: 22px;
      }
    }
    .checkbox {
      display: flex;
    }
    .code {
      width: 100%;
    }
    .box-btn {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>