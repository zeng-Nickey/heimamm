<template>
  <div>
    <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules=" rules">
        <el-form-item prop="name" label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item prop="iphone" label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.iphone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" show-password autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <!-- 图形码 -->
        <el-form-item prop="code" label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-col>

            <el-col :span="7" :offset="1">
              <img class="img_code" :src="imgCodeurl" @click="getNewCode" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="numcode" label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.numcode" autocomplete="off"></el-input>
            </el-col>

            <el-col :span="7" :offset="1">
              <el-button @click="getcodeNum" :disabled="sec!=0">
                <!--上面原本是:disabled =btndisabled 这里写一个判断,如果倒计时为0,则显示'获取验证码',如果倒计时不为0,则显示还有""秒 -->
                {{sec==0?'获取验证码':'还有'+sec+'秒'}}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      //是否显示标题栏
      // dialogTableVisible: true,
      //是否显示对话框
      // dialogFormVisible: true,
      formLabelWidth: "65px",
      // 图形验证码的接口地址---设置了环境变量需要重启黑窗才会显示
      imgCodeurl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //控制按钮是否为禁用,true为禁用,flase启用
      // btndisabled:false,
      //设置倒计时的秒数为0,用来倒计时的
      sec: 0,

      form: {
        name: "",
        email: "",
        iphone: "",
        password: "",
        code: "",
        numcode: ""
      },
      //规则
      rules: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],

        email: [
          { required: true, message: "email不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        iphone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //点击获取新的图形码
    getNewCode() {
      //浏览器缓存机制:当浏览器发现本次请求,是刚刚请求的,不会真的再发请求,而是拿上一次请求的结果给你
      // 专门用来解决请求缓存的2个方法
      // 1.随机数(少用)
      // this.imgCodeurl = process.env.VUE_APP_URL +  "/captcha?type=sendsms&zcj=" + Math.random()
      // 2.时间戳---Date.now()
      this.imgCodeurl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&zcj=" + Date.now();
    },
    //获取短信验证码
    getcodeNum() {
      //禁用按钮,并把文字改成还有60秒----disable
      //写一个计时器,在里面倒计时
      //如果倒计时为0,就静止倒计时
      //发送请求获取短信验证码
      // this.btndisabled=true;
      this.sec = 60;
      // 写一个每隔一秒触发的计时器--这里一定要传箭头函数
      let timeID = setInterval(() => {
        this.sec--;
        //如果倒计时为0.就终止计时器
        if (this.sec == 0) {
          clearInterval(timeID);
        }
      }, 1000);
      //发送请求获取短信验证码
      //axios 如果发跨域请求,默认不会带cookie
      //所以要允许携带cookie---withCredentials:true
      axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          code: this.form.code,
          phone: this.form.iphone
        },
        // 允许携带cookie
        withCredentials: true
      }).then(res => {
        // window.console.log(res)
        if (res.data.code == 200) {
          // 获取验证码成功
          alert("获取验证码成功，验证码为" + res.data.data.captcha);
        } else {
          alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}
.el-dialog__header .el-dialog__title {
  color: white;
  font-size: 17px;
}

.img_code {
  width: 100%;
  height: 41px;
  vertical-align: top;
}
</style>