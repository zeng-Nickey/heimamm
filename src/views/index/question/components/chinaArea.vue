<template>
  <el-form-item>
       <!-- props里写value,并且值为labal,代表获取级联表单选中的值时,时获取label属性值 -->
    <el-cascader
      v-model="city"
      :options="options"
      :props="{ expandTrigger: 'hover' ,value:'label'}"
      @change="handleChange"
    ></el-cascader>
  </el-form-item>
</template>

<script>
import { regionDataPlus, } from 'element-china-area-data'
export default {
    name:"chinaArea",
    //子传父
    props:{
      value:{
          default:""
      }  
    },
    data() {
        return {
         city:this.value,
         options:regionDataPlus   
        }
    },

    methods: {
        //父传子
        handleChange(){
            console.log(this.city);
          this.$emit('input',this.city)  
        }
    },
};
</script>

<style>
</style>