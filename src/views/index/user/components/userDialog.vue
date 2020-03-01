<template>
  <div>
    <!-- center加这个属性可以让头部标题和确定取消按钮自动居中 -->
    <el-dialog center :title="isAdd?'新增用户':'编辑用户'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
          <el-select v-model="form.role" @change="form.role_id=form.role" placeholder="请选择角色">
            <el-option label="学生" value="4"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="管理员" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态" >
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="makesure(scope.row)">确 定</el-button>
        </div>
    
    </el-dialog>
  </div>
</template>

<script>
import { userAdd, Edituser } from "@/api/user.js";
export default {
  data() {
    return {
      //   dialogTableVisible: true,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      //规则
      rules: {
        username: [
          { required: true, message: "用户号不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            Pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            Pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机格式不正确",
            trigger: "change"
          }
        ],
        role: [{ required: true, message: "邮箱不能为空", trigger: "blur" }]
      },
      //判断是新增页面还是编辑页面设置一个变量
      isAdd: true
    };
  },
  methods: {
    makesure(item) {
      console.log(item);
      //做表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            // alert('submit!');
            userAdd(this.form).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.dialogFormVisible = false;
                this.$parent.getUserList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        } else {
          Edituser(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              // item.status = item.status ? "启用" : "禁用";---启程大佬的代码
              this.$parent.getUserList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>