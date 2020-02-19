<template>
  <div class="wrap">
   <div class="box"></div>
   <img src="./imgs/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.wrap{
  width: 100%;
  height: 100%;
  background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
  //弹性布局
  display: flex;
  //x主轴排列为space-around
  justify-content: space-around;
  //y副轴是center
  align-items: center;
  .box{
    width:478px;
    height:550px;
    background:rgba(245,245,245,1);
  }
}
</style>