<template>
  <div>
    <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
      <el-form :model="form"  :rules=" rules">
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
              <img class="img_code" src="../imgs/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="numcode" label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.numcode" autocomplete="off"></el-input>
            </el-col>

            <el-col :span="7" :offset="1">
              <el-button>获取用户验证码</el-button>
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
export default {
  data() {
    return {
      dialogTableVisible: true,
      dialogFormVisible: true,
      formLabelWidth: "65px",
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
       email: [{ required: true, message: "email不能为空", trigger: "blur" }],
        iphone: [{ required: true, message: "手机不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],

      }
    };
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