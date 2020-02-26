<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i @click="isCollapse=!isCollapse" :class="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"></i>
        <img src="./imgs/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span class="username">{{username}},你好</span>
        <el-button type="primary" size="small" @click="outclick">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧栏的宽度改成auto可以让它的宽度随内容变化而变化 -->
      <!-- 饿了么router会进行页面间的跳转,修改index值就好了 -->
      <el-aside width="auto"  class="my-aside">
        <el-menu default-active="/index/chart" router class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/chart">
            <i class="el-icon-menu"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-menu"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business">
            <i class="el-icon-menu"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-menu"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!--子路由的 路由出口 -->
        <router-view></router-view>Mainmy-aside
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from "@/api/index.js";
import { removeToken } from "@/utlis/token.js";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      //左侧栏折叠默认为展开
      isCollapse: false
    };
  },
  //
  //调用获取用户信息的接口
  created() {
    info().then(res => {
      //   console.log(res);
      this.username = res.data.data.username;
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  },
  methods: {
    outclick() {
      this.$confirm("你是否要离开我, 是否继续?", "是否退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            if (res.data.code == 200) {
              this.$message.success("退出成功");
              //删除本地的token
              removeToken();
              //跳转登录页面
              this.router.push("./login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid skyblue;
    .left {
      display: flex;
      align-items: center;
      height: 100%;
      i {
        font-size: 34px;
        margin-right: 22px;
      }
      img {
        width: 34px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 700px;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 40%;
        overflow: hidden;
      }
      .username {
        font-size: 15px;
        margin-right: 38px;
      }
    }
  }
  //   .my-aside {
  //     background-color: rgb(233, 255, 192);
  //   }
  .my-main {
    background-color: purple;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
