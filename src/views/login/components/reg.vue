<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form :model="form">
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form :model="form">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item prop="num">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.num" prefix-icon="el-icon-user" placeholder="请输入验证码"></el-input>
            </el-col>

            <el-col :span="7">
              <img class="code" src="./imgs/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        
        <el-form-item prop="num">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.num" prefix-icon="el-icon-user" placeholder="请输入验证码"></el-input>
            </el-col>

            <el-col :span="7">
              <img class="code" src="./imgs/login_captcha.png" alt />
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
        dialogFormVisible: false,
        formLabelWidth:"65px",
        form: {
          name: '',
          
        },
        formLabelWidth: '120px'
      };
        
    },
};
</script>

<style>
</style>