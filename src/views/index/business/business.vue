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
            <el-button type="primary" icon="el-icon-plus" @click="add">新增企业</el-button>
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
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <!-- 这里的禁用按钮要根据状态变化,所以用一个三元表达式写 -->
            <el-button
              type="text"
              @click="StatusClick(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>

        <el-button type="text" @click=" Delete(scope.row)">删除</el-button>
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
    <businessDialong ref="businessDialong"></businessDialong>
  </div>
</template>

<script>
import { businessList, changeStatus, Remove } from "@/api/business.js";
import businessDialong from "./components/businessDialog.vue";
export default {
  components: {
    businessDialong
  },
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
      total: 0,
      //记录上一次点击的是哪一行
      olditem: null
    };
  },
  methods: {
    //删除------a是点击的行的数据
    Delete(a) {
      Remove({ id: a.id }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          //优化:如果最后页只有一条数据,删除后应该刷新上一页的数据
          //this.tableData表示当前页面有多少条数据
          if (this.tableData.length == 1) {
            // 代表是上一页
            this.currentPage--;
          }
          // 如果page为0了代表是第一页删完了，不能让当前页记录为0，应该记录为1
          if (this.currentPage == 0) {
            this.currentPage = 1;
          }
          // 默认刷新当前页
          this.getbusList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //修改企业状态---a接受点击行的数据
    StatusClick(a) {
      //接口文档要求传入id
      changeStatus({ id: a.id }).then(() => {
        this.getbusList();
      });
    },
    //企业编辑
    //通过scope.row拿到点击行的值赋值给编辑对话框用items接收
    edit(items) {
      this.$refs.businessDialong.dialogFormVisible = true;
      //控制标题显示内容----不是添加页面所以显示标题新增企业
      this.$refs.businessDialong.isAdd = false;
      //如果items(点击的行的数据)不是上次点击的行的数据
      if (items != this.olditem) {
        this.$refs.businessDialong.form = { ...items };
        this.olditem = items;
        // else{}什么都不填,新修改内容就不会被替换
      }
    },
    //新增企业
    add() {
      this.$refs.businessDialong.dialogFormVisible = true;
      //控制标题显示内容
      this.$refs.businessDialong.isAdd = true;
      //清空表单数据
      this.$refs.businessDialong.form = {};
    },
    //清除筛选
    //  给行内表单加ref，方便后面找到他
    //给每个el-form-item添加prop属性,不加prop，那么重置方法不会有效果
    // - 给 `清除` 按钮加点击事件，点击事件里，调用表单对象的重置方法，然后把页码改成1，重新加载数据就行了
    clearSearch() {
      //饿了么表单重置
      this.$refs.formInline.resetFields();
      // this.currentPage = 1;
      // this.getbusList();
      this.search();
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