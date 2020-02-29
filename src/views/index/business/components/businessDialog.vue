<template>
  <div>
    <!-- center加这个属性可以让头部标题和确定取消按钮自动居中 -->
    <el-dialog center :title="isAdd?'新增企业':'编辑企业'"    :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="企业简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="企业简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
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
import { businessAdd, bunEdit , } from "@/api/business.js";
export default {
  data() {
    return {
      //   dialogTableVisible: true,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      //规则
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }]
      },
      //判断是新增页面还是编辑页面设置一个变量
      isAdd: true
    };
  },
  methods: {
    makesure() {
      //做表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          //新增对话框就调用新增对话的请求
          if (this.isAdd) {
            businessAdd(
              //{ rid:this.form.rid,-----第一种写法
              // name:this.form.name,
              // shoet_name:this.form.shoet_name,
              // intro:this.form.intro,
              // remark:this.form.remark,}
              // {}...this.form} -----第二种写法
              //第三种写法直接传入form这个数组
              this.form
            ).then(res => {
              //    console.log(res);
              if (res.data.code == 200) {
                this.$message.success("添加成功");
                this.dialogFormVisible = false;
                //刷新表格页面
                this.$parent. getbusList();
              } else {
                // console.log('error submit!!');
                this.$message.error(res.data.message);
              }
            });
            //else{}是编辑的对话框
          } else {
            // alert('submit!');
            //调用新增接口---文档要求必须要有2个参数
            bunEdit(this.form).then(res => {
              //    console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功");
                this.dialogFormVisible = false;
                //刷新表格页面
                this.$parent. getbusList();
              } else {
                // console.log('error submit!!');
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>