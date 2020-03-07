<template>
  <div class="box">
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content">{{value}}</div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  props: {
    value: {
      type: String,
      //默认值为空
      default: ""
    }
  },
  mounted() {
    let editor = new wangEditor(this.$refs.toolbar, this.$refs.content);
    //监听富文本值改变事件
    editor.customConfig.onchange = html => {
      //把值传给父组件
      this.$emit("input", html);
    };
    editor.create();
  }
};
</script>

<style lang="less">
.box {
  .toolbar {
    border: 1px solid #ccc;
  }
  .content {
    border: 1px solid #ccc;
    height: 60px;
  }
}
</style>