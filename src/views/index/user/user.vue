<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item prop="username" label="用户名称">
            <el-input v-model="formInline.username" class="long"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="用户邮箱">
            <el-input v-model="formInline.email" class="short"></el-input>
          </el-form-item>

          <el-form-item prop="role_id" label="角色">
            <el-select class="long" v-model="formInline.role_id" placeholder="请选择状态">
              <el-option label="学生" value="4"></el-option>
              <el-option label="老师" value="3"></el-option>
              <el-option label="管理员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="clearSearch">清除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="add">新增用户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 下面卡片 -->
    <el-card class="box-card">
      <!-- 表格加border属性自动给表格加边框 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <!-- 这里的禁用按钮要根据状态变化,所以用一个三元表达式写 -->
            <el-button
              type="text"
              @click="StatusClick(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="Delete(scope.row)">删除</el-button>
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
    <!-- 注册userDialog组件 -->
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
import { userList, Removeuser, changeStatus } from "@/api/user.js";
import userDialog from "./components/userDialog.vue";
export default {
  components: {
    userDialog
  },
  name: "user",
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
      //记录上次点击的是哪一行
      olditem: null
    };
  },
  methods: {
    //用户状态修改
    StatusClick(item) {
      changeStatus({ id: item.id }).then(() => {
        this.getUserList();
      });
    },
    //用户编辑
    handleEdit(item) {
      //点击编辑显示对话框
      this.$refs.userDialog.dialogFormVisible = true;
      //控制标题显示内容----显示编辑用户
      this.$refs.userDialog.isAdd = false;
      //如果item(点击的行的数据)不是上次点击的行的数据
      if (item != this.olditem) {
        this.$refs.userDialog.form = { ...item };
        this.olditem = item;
        // else{}什么都不填,新修改内容就不会被替换
      }
    },

    //用户新增
    add() {
      this.$refs.userDialog.dialogFormVisible = true;
      //控制标题显示内容
      this.$refs.userDialog.isAdd = true;
      //清空新增成功还停留在页面上的代码
      this.$refs.userDialog.form = {};
    },
    //用户删除
    Delete(item) {
      Removeuser({ id: item.id }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          //优化:如果最后页只有一条数据,删除后应该刷新上一页的数据
          //this.tableData表示当前页面有多少条数据
          if (this.tableData.length == 1) {
            this.currentPage--;
          }
          // 如果page为0了代表是第一页删完了，不能让当前页记录为0，应该记录为1
          if (this.currentPage == 0) {
            this.currentPage = 1;
          }
          //刷新页面
          this.getUserList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //用户清除----给清除添加点击事件
    // - 找到行内表单调用重置方法 `resetFields`
    // - 把页码改成1，然后调用获取数据的方法
    clearSearch() {
      this.$refs.formInline.resetFields();
      this.search();
    },
    //页码改变事件
    handleCurrentChange(page) {
      // console.log(`每页 ${val} 条`);
      //改变后的页码赋值给this.currentPage这个属性
      //这样再去请求数据的时候,就直接请求的是改变后的页码数据
      this.currentPage = page;
      this.getUserList();
    },
    //页容量改变事件
    handleSizeChange(size) {
      //赋值为改变后的页容量
      this.size = size;
      //页容量改变了,应该从第一页重新显示
      this.currentPage = 1;
      this.getUserList();
    },
    //用户筛选按钮
    search() {
      //回到第一页获取全部搜索数据
      this.currentPage = 1;
      this.getUserList();
    },
    //获取用户列表
    getUserList() {
      userList({
        page: this.currentPage,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 100px;
}
.box-card.long {
  width: 149px;
}
</style>