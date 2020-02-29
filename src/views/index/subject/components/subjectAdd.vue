<template>
  <div class="add">
    <!-- center加这个属性可以让头部标题和确定取消按钮自动居中 -->
    <el-dialog center title="新增学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="Form">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学科备注" :label-width="formLabelWidth">
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
import { subAdd } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogTableVisible: true,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      //规则
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    makesure() {
      //做表单验证
      this.$refs.Form.validate(valid => {
        if (valid) {
          // alert('submit!');
          //调用新增接口---文档要求必须要有2个参数
          subAdd(
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
              this.$parent.getsubList();
            } else {
              // console.log('error submit!!');
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