<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :default-active="defaultActive" router  :collapse="isCollapse">
      <div class="daohang">
        <span style="margin-left:25px;cursor: pointer" class="svg-container"  @click="isCollapse=!isCollapse">
          <svg-icon icon-class="daohang" />
        </span>
      </div>
      <el-menu-item index="/search" >
        <span is="i" class="svg-container">
          <svg-icon icon-class="sousuo" />
        </span>
        <span>搜索</span>
      </el-menu-item>
      <el-menu-item index="/index" >
        <span is="i"  class="svg-container">
          <svg-icon icon-class="yinle" />
        </span>
        <span >发现音乐</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span is="i"  class="svg-container">
          <svg-icon icon-class="shipin" />
        </span>
        <span >MV</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span is="i"  class="svg-container">
          <svg-icon icon-class="chengyuan" />
        </span>
        <span >朋友</span>
      </el-menu-item>
    </el-menu>
</template>


  <script>
    import {isMobile} from "@/utils/util";
    export default {
      name: "Aside",
      data() {
        return {
          isCollapse: false,
          defaultActive:''
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      created(){
        this.isCollapse=isMobile();
      }
    }
  </script>

<style scoped>
  .el-menu{
    width: 100%;
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-item{
    display: flex;
    flex-direction: row;
    border-left: 2px solid #ffffff ;
  }
  .el-menu-item.is-active{
    background: #E4E7ED;
    color:inherit;
    border-left: 2px solid #c20c0c;
  }
  .svg-container {
    margin:0 5px;
    width: 30px;
  }
  .daohang{
    display: flex;
    margin:10px 0 5px;
  }
</style>
