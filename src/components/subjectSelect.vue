<template>
  <el-select v-model="subject" @change="selchange" placeholder="请选择学科">
    <!-- 按条件显示,只有搜索的时候才显示所有学科 在筛选按钮的地方写issearch:true-->
    <el-option v-if="issearch" value="" >所有学科</el-option>
    <el-option
      v-for="(item, index) in  subjectList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { subjectList } from "@/api/subject.js";
export default {
  //要实现v-model,需要父传子,并且prop要叫value
  //父传子
  props: {
    value: {
      default: ""
    },
    issearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      subject: this.value,
      subjectList: []
    };
  },
  //监听器
  watch: {
    value(val) {
      // console.log("value变了,变成:"+val);
      //参数是改变后的值,把改变后的值val赋值给subject
      this.subjiect = val;
    }
  },
  created() {
    subjectList({ status: 1 }).then(res => {
      // console.log(res);
      this.subjectList = res.data.data.items;
    });
  },
  methods: {
    //子传父
    selchange() {
      //这里给父组件传值
      this.$emit("input", this.subject);
    }
  }
};
</script>

<style>
</style>