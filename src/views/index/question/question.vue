<template>
  <div class="question-wrap">
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="学科" prop="subject">
          <subjectSelect v-model="formInline.subject" :issearch="true"></subjectSelect>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <businessSelect v-model="formInline.enterprise" :issearch="true"></businessSelect>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty" placeholder="新选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <!--日期选择器 使用value-format指定绑定值的格式 -->
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="formInline.create_date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="title" prop="title">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="seach">搜索</el-button>
          <el-button @click="clearSeach">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部卡片 -->
    <el-card class="botton-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <p v-html="scope.row.title"></p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学科.阶段">
          <template slot-scope="scope">{{scope.row|filtersubject}}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-else-if="scope.row.type==2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{scope.row.status==1? "启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <!-- 这里的禁用按钮要根据状态变化,所以用一个三元表达式写 -->
            <el-button
              v-if="['超级管理员','管理员',].includes($store.state.role)"
              type="text"
              @click="StatusClick(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <questionAdd ref="questionAdd"></questionAdd>
    <questionEdit ref="questionEdit"></questionEdit>
  </div>
</template>




<script>
// import { subjectList } from "@/api/subject.js";
// import { businessList } from "@/api/business.js";
import { questionList, changeStatus, Remove } from "@/api/question.js";
import questionAdd from "./components/questionAdd";
import questionEdit from "./components/questionEdit";

export default {
  name: "question",
  components: {
    questionAdd,
    questionEdit
  },
  data() {
    return {
      formInline: {},
      // subjectList: [],
      tableData: [],
      //当前页
      currentPage: 1,
      size: 2,
      total: 0
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //删除按钮的点击事件
    Delete(item) {
      Remove({ id: item.id }).then(res => {
        //弹框==复制饿了么
        this.$confirm("此操作将永久删除该行数据")
          .then(() => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.getlist();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },

    //启用状态的更改
    StatusClick(a) {
      changeStatus({ id: a.id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("修改状态成功");
          this.getlist();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //清除筛选
    clearSeach() {
      //调用表单重置的方法
      this.$refs.formInline.resetFields();
      //重新加载数据
      this.seach();
    },
    //搜索的点击事件
    seach() {
      //回到第一页获取全部搜索数据
      this.currentPage = 1;
      this.getlist();
    },
    //编辑的事件
    handleEdit(item) {
      //拿到被点击行的数据:scope.row
      //赋值给编辑对话框里的form
      this.$refs.questionEdit.form = { ...item };
      //这里要吧city从字符串转化成数组才会显示
      this.$refs.questionEdit.form.city = this.$refs.questionEdit.form.city.split(
        ","
      );
      //这里要把多选从字符串转化成数组才会显示
      this.$refs.questionEdit.form.multiple_select_answer = this.$refs.questionEdit.form.multiple_select_answer.split(
        ","
      );

      //显示对话框
      this.$refs.questionEdit.dialogFormVisible = true;
    },
    //获取题库信息
    getlist() {
      questionList({
        page: this.currentPage,
        limit: this.size,
        //把顶部卡片的值要放进来,才可以搜索
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    //页容量改变事件
    handleSizeChange(size) {
      // console.log(`每页 ${val} 条`);
      //赋值为改变后的页容量
      this.size = size;
      //页容量改变了,应该从第一页重新显示
      this.currentPage = 1;
      //刷新页面
      this.getlist();
    },
    //页码改变事件
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      //改变后的页码赋值给this.currentPage这个属性
      //这样再去请求数据的时候,就直接请求的是改变后的页码数据
      this.currentPage = page;
      this.getlist();
    },
    add() {
      this.$refs.questionAdd.dialogFormVisible = true;
    }
  },
  //过滤器
  filters: {
    filtersubject(val) {
      let stepname = "";
      if (val.step == 1) {
        stepname = "初级";
      } else if (val.step == 2) {
        stepname = "中级";
      } else {
        stepname = "高级";
      }
      return val.subject_name + "." + stepname;
    }
  }
};
</script>

<style lang="less">
/* .el-form-item .el-form-item__content input{
  width: 200px
} */
.question-wrap {
  .el-form--inline {
    /* 找到除最后一个.el-form-item下面的所有el-form-item__content */
    .el-form-item:not(:last-child) .el-form-item__content {
      width: 150px;
    }

    .el-form-item.title .el-form-item__content {
      width: 388px;
    }
    .el-form-item .el-form-item__label {
      padding-right: 31px;
      padding-left: 31px;
    }
    .question-wrap .el-card__body {
      padding-left: 0px;
    }
    .el-form-item .el-form-item__content .el-date-editor {
      width: 150px;
    }
  }
  .botton-card {
    margin-top: 21px;
  }
  //分页器居中
  .el-pagination {
    text-align: center;
    margin-top: 31px;
  }
}
</style>