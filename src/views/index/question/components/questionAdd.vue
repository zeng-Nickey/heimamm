<template>
  <!-- fullscreen设置弹框为全局 destroy-on-close让对话框所有的组件元素清空-->
  <el-dialog destroy-on-close fullscreen title="新增题库" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <subjectSelect v-model="form.subject"></subjectSelect>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" value="1"></el-option>
          <el-option label="中级" value="2"></el-option>
          <el-option label="高级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <businessSelect v-model="form.enterprise"></businessSelect>
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <chinaArea v-model="form.city"></chinaArea>
      </el-form-item>
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 导入分割线组件 -->
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <!-- 导入富文本组件 -->
      <el-form-item label="题库标题" prop="title" :label-width="formLabelWidth">
        <wangEditor v-model="form.title"></wangEditor>
      </el-form-item>

      <el-form-item
        v-if="form.type==1"
        label="单选"
        prop=" single_select_answer"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="form.single_select_answer">
          <!-- 导入组件 -->
          <optionitem
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
          ></optionitem>
          <!-- <div class="option-box">
            <el-radio :label="3">B</el-radio>
            <el-input class="input"></el-input>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>-->
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-else-if="form.type==2"
        label="多选"
        prop=" multiple_select_answer"
        :label-width="formLabelWidth"
      >
        <div>
          <el-checkbox-group v-model="form.multiple_select_answer">
            <!-- <el-checkbox label="复选框 A"></el-checkbox> -->
            <!-- 导入组件 -->
            <optionitem
              :isradio="false"
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
            ></optionitem>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item v-else label="简答" prop=" short_answer" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" v-model="form.short_answer"></el-input>
      </el-form-item>

      <!-- 导入分割线组件 -->
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <!-- 导入上传视频组件 -->
      <el-form-item label="解析视频" prop="video" :label-width="formLabelWidth">
        <videouplode :video.sync="form.video" />
      </el-form-item>

      <!-- 导入分割线组件 -->
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>

      <!-- 导入富文本组件 -->
      <el-form-item label="答案解析" prop="answer_analyze" :label-width="formLabelWidth">
        <wangEditor v-model="form.answer_analyze"></wangEditor>
      </el-form-item>
      <!-- 导入分割线组件 -->
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <!-- 导入富文本组件 -->
      <el-form-item label="试题备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" type="textarea" :row="2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="makesure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入市区组件
import chinaArea from "../components/chinaArea";
//导入wangeditoe富文本组件
import wangEditor from "../components/wangEditor";
//导入选项的组件
import optionitem from "../components/optionitem";
//导入视频上传的组件
import videouplode from "../components/videouplode";
//导入新增接口
import { questionAdd } from "@/api/question.js";
export default {
  components: { chinaArea, wangEditor, optionitem, videouplode },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        //存视频地址的
        video: "",
        //判断单选多选的参数
        type: "1",
        //单选绑定答案
        single_select_answer: "",
        //多选绑定答案===数组
        multiple_select_answer: [],
        //简答绑定的答案
        short_answer: "",
        //跟选项绑定的数组
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ],
        answer_analyze: "",
        remark: ""
      },
      formLabelWidth: "120px",
      // //预览图片的
      // imageUrl: "",
      // //上传图片
      // uploadUrl: process.env.VUE_APP_URL + "/question/upload",
      // //上传视频路径的路径
      // uploadURL: process.env.VUE_APP_URL + "/question/upload",
      //预览视频的路径
      videoUrl: "",
      //表单验证
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        subject: [
          { required: true, message: "学科不能为空", trigger: "change" }
        ],
        step: [{ required: true, message: "阶段不能为空", trigger: "change" }],
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "change" }
        ],
        city: [{ required: true, message: "城市不能为空", trigger: "change" }],
        type: [{ required: true, message: "题型不能为空", trigger: "change" }],
        difficulty: [
          { required: true, message: "难度不能为空", trigger: "change" }
        ],
        single_select_answer: [
          { required: true, message: "单选不能为空", trigger: "blur" }
        ],
        multiple_select_answer: [
          { required: true, message: "多选不能为空", trigger: "blur" }
        ],
        short_answer: [
          { required: true, message: "简答不能为空", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "试题备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    makesure() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert('submit!');
          questionAdd(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("全部通过");
          //重置清空新增页面,利用表单的重置方法只能清空表单元素的内容,不能清空封装的组件
          //让组件销毁就可以清除数据了

              this.$refs.form.resetFields();
              ///隐藏对话框
              this.dialogFormVisible = false;
              //刷新页面
              this.$parent.getlist();
            } else {
              // console.log("error submit!!");
              this.$message.error(res.data.message);
              // return false;
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-divider {
  width: 832px;
  height: 3px;
}
.avatar-uploader {
  text-align: left;
}
</style>