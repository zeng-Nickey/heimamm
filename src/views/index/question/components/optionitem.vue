<template>
  <div class="option-box">
    <el-radio :label="label" v-if="isradio"></el-radio>
    <el-checkbox v-else :label="label"></el-checkbox>
    <el-input class="input" v-model="mytext" @input="oninput"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  //   props: ["label", "text", "image"],
  props: {
    label: String,
    text: String,
    image: String,
    isradio: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageUrl: this.image,
      mytext: this.text,
      uploadUrl: process.env.VUE_APP_URL + "/question/upload"
    };
  },
  methods: {
    //输入框正在输入触发事件
    oninput() {
      //把mytext内容传给父组件
      this.$emit("update:text", this.mytext);
    },
    //把图片上传成功的钩子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //把res里的图片路径赋值给父组件
      this.$emit("update:image", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.option-box {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .input {
    width: 476px;
    height: 40px;
    margin-right: 20px;
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
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>