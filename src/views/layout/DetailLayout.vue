<template>
  <div class="container" v-loading="loading"
       element-loading-background="#ffffff">
    <span style="text-align: left;margin: 16px 0;font-size: 14px;color:#666666">{{name}}</span>
    <div class="header">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <div class="image">
            <img :src="imageUrl" />
          </div>
        </el-col>
        <el-col :xs="16" :sm="18" :md="20" :lg="21" >
          <div class="info">
            <div class="title ellipsis">{{title}}</div>
            <slot name="describe"></slot>
          </div>
        </el-col>
      </el-row>
    </div>
    <slot name="menu" class="menu">
    </slot>
    <el-scrollbar style="height: 100%;">
      <div class="body">
          <slot name="body">
          </slot>
      </div>
    </el-scrollbar>

  </div>
</template>

<script>
  export default {
    name: "DetailLayout",
    props: {
      name:{
        type:String,
        require:true
      },
      imageUrl: {
        type: String,
        require: true
      },
      title:{
        type:String,
        require:true
      },
      loading:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 95%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .ellipsis {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .image{
    width: 99%;
    height: 0;
    padding-bottom: 99%;
    position: relative;
  }

  .image img{
    width: calc(100% - 2px);
    height:  calc(100% - 2px);
    left:0;
    position: absolute;
    border: 1px solid #cac2c2;
  }

  .info{
    margin-left: 10px;
  }

  .title{
    width:100%;
    text-align: left;
    font-weight: 400;
    font-size: 18px;
  }

  .header {
    width: 100%;
    margin-bottom: 10px;
  }

  .menu{
    height:60px;
  }

  .body {
   flex: 1;
  }
</style>
