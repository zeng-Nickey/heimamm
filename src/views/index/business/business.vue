<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item prop="rid" label="企业编号">
            <el-input v-model="formInline.rid" class="short"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="企业名称">
            <el-input v-model="formInline.name" class="long"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="创建者">
            <el-input v-model="formInline.username" class="short"></el-input>
          </el-form-item>

          <el-form-item prop="status" label="状态">
            <el-select class="long" v-model="formInline.status" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="clearSearch">清除</el-button>
            <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>

        <el-table-column prop="name" label="企业名称"></el-table-column>

        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            <!-- 用全局过滤器过滤时间 -->
            {{scope.row.short_time|formTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit">编辑</el-button>
            <!-- 这里的禁用按钮要根据状态变化,所以用一个三元表达式写 -->
            <el-button
              type="text"
              @click="StatusClick(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 8, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 注册subjecAdd组件 -->
    <!-- <subjectAdd ref="addDialog"></subjectAdd>
    <subjectEdit ref="subEdit"></subjectEdit>-->
  </div>
</template>

<script>
import { businessList } from "@/api/business.js";
export default {
  data() {
    return {
      //顶部行内表单的绑定对象
      formInline: {},
      //分页器的当前页
      currentPage: 1,
      //分压器一页的页容量
      size: 3,
      //下面表格绑定的数据源
      tableData: [],
      //分页器的数据总量
      total: 0
    };
  },
  methods: {
    //清除筛选
    //  给行内表单加ref，方便后面找到他
    //给每个el-form-item添加prop属性,不加prop，那么重置方法不会有效果
    // - 给 `清除` 按钮加点击事件，点击事件里，调用表单对象的重置方法，然后把页码改成1，重新加载数据就行了
    clearSearch() {
      //饿了么表单重置
      this.$refs.formInline.resetFields();
      // this.currentPage = 1;
      // this.getbusList();
      this.search()
    },
    //搜索事件---只需要调用获取企业列表事件
    search() {
      //回到第一页获取全部搜索数据
      this.currentPage = 1;
      this.getbusList();
    },
    //页容量改变事件
    handleSizeChange(size) {
      // console.log(`每页 ${val} 条`);
      this.size = size;
      //因为页容量改变应该从第一页重新差
      this.currentPage = 1;
      this.getbusList();
    },
    //页码改变事件
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      this.currentPage = page;
      this.getbusList();
    },
    //请求企业列表函数
    getbusList() {
      businessList({
        //接口文档设置传的参---当前页
        page: this.currentPage,
        //页面默认显示几页
        limit: this.size,
        //让formInline里的rid等元素赋值
        ...this.formInline
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },
  //获取企业列表
  //先导入刚刚封装的获取学科列表的接口
  //因为这个数据要页面一加载就要有的,所以写在create中还能访问data数据
  //拿到数据后,赋值给data中的 tableData
  //写tableData中每列要渲染的数据
  created() {
    this.getbusList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
</style>