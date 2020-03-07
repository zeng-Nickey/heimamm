<template>
  <el-select v-model="enterprise" @change="selchange"  placeholder="请选择企业">
     <!-- 按条件显示,只有搜索的时候才显示所有学科 在筛选按钮的地方写issearch:true-->
    <el-option v-if="issearch" value="">所有企业</el-option>
    <el-option
      v-for="(item, index) in businessList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { businessList } from "@/api/business.js";
export default {
 //要实现v-model,需要父传子,并且prop要叫value
  //父传子
  props: {
    value: {
      default: ""
    },
    issearch:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      enterprise: this.value,
      businessList: []
    };
  },
   //监听器
  watch: {
    value(val) {
      // console.log("value变了,变成:"+val);
      //参数是改变后的值,把改变后的值val赋值给subject
      this.enterprise = val;
    }
  },
  created() {
    businessList({ status: 1 }).then(res => {
      console.log(res);
      this.businessList = res.data.data.items;
    });
  },
   methods: {
      //子传父
    selchange() {
      //这里给父组件传值
      this.$emit("input", this.enterprise);
    }
  }
};
</script>

<style>
</style>