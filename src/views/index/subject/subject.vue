<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item prop="rid" label="学科编号">
            <el-input v-model="formInline.rid" class="short"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="学科名称">
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
            <el-button type="primary" icon="el-icon-plus" @click="showsub">新增学科</el-button>
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

        <el-table-column label="操作" v-if="['超级管理员','管理员','老师'].includes($store.state.role)">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <!-- 这里的禁用按钮要根据状态变化,所以用一个三元表达式写 -->
            <el-button
              type="text"
              @click="StatusClick(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button v-if="['超级管理员','管理员',].includes($store.state.role)" type="text" @click="Delete(scope.row)">删除</el-button>
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
    <subjectAdd ref="addDialog"></subjectAdd>
    <subjectEdit ref="subEdit"></subjectEdit>
  </div>
</template>

<script>
import { subjectList, changeStatus, Removesub } from "@/api/subject.js";
import subjectAdd from "./components/subjectAdd.vue";
import subjectEdit from "./components/subjectEdit.vue";
export default {
  components: {
    subjectAdd,
    subjectEdit
  },
  name: "subject",
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
    //删除按钮删除学科事件
    Delete(a) {
      Removesub({ id: a.id }).then(res => {
        // console.log(res);
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
          this.getsubList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //编辑学科的点击事件a是点击的行的数据
    handleEdit(a) {
      this.$refs.subEdit.dialogFormVisible = true;
      console.log(a);
      //通过scope.row拿到点击行的值赋值给编辑对话框
      // this.$refs.subEdit.form=a---这句会令编辑的内容不点确定也会让表格内容跟着变化,因为对象的传递会互相影响,所以用拆解符...再从组对象
      // this.$refs.subEdit.form={...a}----这句话的意思就是赋值对话框
      //但是要优化用户体验让点击编辑时写的内容不下心点错了但第二次再点同一行内容还停留在页面中,并且点其他行的编辑按钮对话框内容赋值别的行的内容
      // 所以思路:判断点击是不是上次的同一行,是就不要赋值那内容就会停留在页面中,不是就赋值
      //如果a(点击的行的数据)不是上次点击的行的数据
      if (a != this.olditem) {
        this.$refs.subEdit.form = { ...a };
        //并且把记录的上一条数据记录成当前行的数据
        this.olditem = a;
      } else {
        // 这里什么都不填,新修改内容就不会被替换
      }
    },
    //增加学科点击事件
    // 来到 `subject.vue` 找到新增对话框，给他加ref属性，值为 `addDialog`
    // 给表单加验证规则
    showsub() {
      this.$refs.addDialog.dialogFormVisible = true;
    },
    //清除筛选的点击事件
    clearSearch() {
      //用表单对象的重置方法
      this.$refs.formInline.resetFields();
      //根据最新的表单内容重新调用请求
      this.currentPage = 1;
      this.getsubList();
    },
    //搜索按钮的事件---只需要重新调用一下获取列表函数,然后再
    search() {
      //回到第一页获取全部搜索数据
      this.currentPage = 1;
      this.getsubList();
    },

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
    //页码改变事件
    handleCurrentChange(page) {
      // console.log(`每页 ${val} 条`);
      //改变后的页码赋值给this.currentPage这个属性
      //这样再去请求数据的时候,就直接请求的是改变后的页码数据
      this.currentPage = page;
      this.getsubList();
    },
    //页容量改变事件
    handleSizeChange(size) {
      //赋值为改变后的页容量
      this.size = size;
      //页容量改变了,应该从第一页重新显示
      this.currentPage = 1;
      this.getsubList();
    },
    //封装获取学科列表的代码
    getsubList() {
      subjectList({
        //接口文档设置传的参---当前页
        page: this.currentPage,
        //页面默认显示几页
        limit: this.size,
        // rid: this.formInline.rid,
        // name: this.formInline.name,
        // username: this.formInline.username,
        // status: this.formInline.status
        ...this.formInline
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
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
.short {
  width: 100px;
}
.box-card.long {
  width: 149px;
}
</style>