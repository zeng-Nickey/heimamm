<template>
  <div>
    <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
      <el-form ref="regForm" :model="form" :rules=" rules">
        <el-form-item prop="avatar" label="头像" :label-width="formLabelWidth">
          <el-upload
            v-model="form.avatar"
            name="image"
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

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
        <el-button type="primary" @click="makesure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
import { sendSMS } from "../../../api/reg.js";
// 提供一个@,代表.src目录,写法一致
// import { sendSMS } from '@/api/reg.js'
import { reg } from "@/api/reg.js";
export default {
  data() {
    return {
      //头像上传后的图片临时地址
      imageUrl: "",
      //要上传图片的接口地址
      uploadUrl: "/uploads",
      // 因为饿了么默认的表单上传键值是file,但接口文档的上传文件的name要求是image,所以要在html加name属性修改键值

      //是否显示标题栏
      // dialogTableVisible: true,
      //是否显示对话框
      dialogFormVisible: false,
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
        numcode: "",
        avatar:""
      },
      //规则
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],

        code: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "图片验证码只能是4位", trigger: "change" }
        ],
        numcode: [
          { required: true, message: "短信验证码不能为空", trigger: "blur" },
          { len: 4, message: "短信验证码只能是4位", trigger: "change" }
        ],
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
       //判断手机号是否合法
      if(!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.iphone))) {
        //提示用户手机号不合法
        this.$message.error("手机号码格式不正确")
        return;
        //合并写法
        // return this.$message.error("手机号码格式不正确")
      }
      if(this.form.code.length!=4){
        //提示改用户手机号不合法
         return this.$message.error("验证码长度不对")
      }
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
      // axios({
      //   url: process.env.VUE_APP_URL + "/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.form.code,
      //     phone: this.form.iphone
      //   },
      //   // 允许携带cookie
      //   withCredentials: true
      // }).then(res => {
      //   // window.console.log(res)
      //   if (res.data.code == 200) {
      //     // 获取验证码成功
      //     alert("获取验证码成功，验证码为" + res.data.data.captcha);
      //   } else {
      //     alert(res.data.message);
      //   }
      // });
      sendSMS({
        code: this.form.code,
        phone: this.form.iphone
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success(
            "获取验证码成功，验证码为" + res.data.data.captcha
          );
        } else {
          this.$message.error(res.data.message);
        }
      });
     
    },
    //头像上传函数
    // 头像上传成功的钩子

    handleAvatarSuccess(res, file) {
      //把图片转成了临时路径,给了imageUrl,所以img标签有值
      this.imageUrl = URL.createObjectURL(file.raw);
      //img标签有值,但是她不属于表单,所以要表单中的avatar有值
      this.form.avatar=res.data.file_path;
      //因为我们是图片上传成功后手动给avatar赋值它才有值的,没有事件去重新验证
      //所以就要想办法单独对这个属性做一次校验,然后再整体对表单校验
      //validateFileld()是单独对某一属性进行验证
      this.$refs.regForm.validateField('avatar')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 整个表单验证,给确定按钮添加点击事件
    makesure() {
      //先找表单对象,给对象添加ref
      this.$refs.regForm.validate(v => {
        if (v) {
          reg({
          username:this.form.name,
          phone:this.form.iphone,
          email:this.form. email,
          avatar:this.form.avatar,
          password:this.form.password,
          rcode:this.form.numcode
          }).then(res=>{
           if(res.data.code==200){
             //注册成功,弹窗注册成功
              this.$message.success('注册成功')
              //重置表单--- this.$refs.表单ref.resetFields()
              this.$refs.regForm.resetFields();
              //img不是表单元素,只要img绑定的url还在,她会一直显示,所以要清空img
              this.imageUrl="";
             //注册成功,关闭对话框
             this.dialogFormVisible=false;
           }else{
             //有问题就显示问题
             this.$message.error(res.data.message);
           }
          })
        } 
      });
    }
  }
};
</script>

<style >
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
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>