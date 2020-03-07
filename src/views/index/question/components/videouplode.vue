<template>
  <div>
      <el-upload
        class="avatar-uploader"
        :action="uploadURL"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2mb</div>
      </el-upload>
      <!-- 预览视频 controls播放条-->
      <video :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
data() {
    return {
        uploadUrl: process.env.VUE_APP_URL + "/question/upload",
      //上传视频路径的路径
      uploadURL: process.env.VUE_APP_URL + "/question/upload",
      //预览视频的路径
      videoUrl: "" 
    }
},
methods: {
  //上传成功的钩子
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      //把上传成功的路径存起来
      this.$emit('update:video',res.data.url)
      // console.log(res);
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4" || "video/avi";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是MP4或者avi格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频片大小不能超过 2M!");
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style>

</style>