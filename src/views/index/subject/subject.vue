<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="学科编号">
            <el-input v-model="formInline.user" class="short"></el-input>
          </el-form-item>
          <el-form-item label="学科名称">
            <el-input v-model="formInline.user" class="long"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="formInline.user" class="short"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select class="long" v-model="formInline.region" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button>清除</el-button>
            <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>

        <el-table-column prop="name" label="学科名称"></el-table-column>

        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!-- 这里的禁用按钮要根据状态变化,所以用一个三元表达式写 -->
            <el-button
              type="text"
              @click="StatusClick(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tatal"
    ></el-pagination>
  </div>
</template>

<script>
import { subjectList, changeStatus } from "@/api/subject.js";
export default {
  name: "subject",
  data() {
    return {
      //顶部行内表单的绑定对象
      formInline: {},
      //分页器的当前页
      currentPage: 1,
      //分压器一页的页容量
      size: 10,

      //下面表格绑定的数据源
      tableData: [],
      //分页器的数据总量
      tatal: 2
    };
  },
  methods: {
    // 修改状态的事件--接口文档要求传id,post请求
    StatusClick(a) {
      // console.log(a);
      changeStatus({ id: a.id }).then(() => {
        // console.log(res);----打印出了服务器的结果是修改了的,但是页面没那么快显示,要刷新一次再次向服务器发请求
        //由于是修改前面的数据,所以要刷新之后才能再看到效果
        //这里只需要刷新页面就可以了
        //但是不必刷新整个页面,只需要刷新表格就可以了,所以再调用一次获取学科列表的接口既可======这里代码冗余建议封装
        this.getsubList();
        // subjectList({
        //   //接口文档设置传的参---当前页
        //   Page: 1,
        //   //页面默认显示几页
        //   limit: 1
        // }).then(res => {
        //   // console.log(res);
        //   this.tableData = res.data.data.items;
        // });
      });
    },
    //页面改变事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //页容量改变事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //封装获取学科列表的代码
    getsubList() {
      subjectList({
        //接口文档设置传的参---当前页
        Page: 1,
        //页面默认显示几页
        limit: 1
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
      });
    }
  },
  //先导入刚刚封装的获取学科列表的接口
  //因为这个数据要页面一加载就要有的,所以写在create中还能访问data数据
  //拿到数据后,赋值给data中的 tableData
  //写tableData中每列要渲染的数据
  created() {
    this.getsubList();
    // subjectList({
    //   //接口文档设置传的参---当前页
    //   Page: 1,
    //   //页面默认显示几页
    //   limit: 1
    // }).then(res => {
    //   // console.log(res);
    //   this.tableData = res.data.data.items;
    // });
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.box-card.short {
  width: 100px;
}
.box-card.long {
  width: 149px;
}
</style>