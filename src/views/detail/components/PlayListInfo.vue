<template>
  <div class="container">
    <div class="artist">
      <img :src="imageUrl" alt="" class="image">
      <span style="font-size: 15px;color: #595050; margin: 0 12px">{{artistName}}</span>
      <span style="font-size: 13px;color: #ADADAD;">{{formTime(time)}} 创建</span>
    </div>
    <el-row :gutter="10">
      <el-col>
          <span style="font-size: 14px">标签：</span>
          <span v-if="tags.length===0" class="tag" style="cursor: default">暂无标签</span>
          <span v-else v-for="(item,index) in tags" :key="index" class="tag" @click="clickTag(item)">
            {{item+(index===tags.length-1?'':'/')}}
          </span>
      </el-col>
      <el-col>
        <!--<span style="font-size: 14px">介绍：</span>-->
        <!--<div style="height:40px;overflow:hidden" >-->
          <!--<div v-for="(item,index) in description" :key="index" style="text-align: left">{{item}}</div>-->
        <!--</div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {formatDate} from "@/utils/util";

  export default {
    name: "PlayListInfo",
    props: {
      imageUrl: {
        type: String,
        require: true,
      },
      artistName: {
        type: String,
        default: '未知作家'
      },
      time: {
        type: Number,
        require: true
      },
      tags: {
        type: Array,
        require: true
      },
      description:{
        type:String,
        default: ''
      }
    },
    computed:{
      descriptions(){
        return this.description=this.description.split('\n');
      }
    },
    methods: {
      formTime(time) {
        return formatDate(time, 'yyyy-MM-dd');
      },
      clickTag(tag){
        this.$router.push({path:'/index',name:'index',params:{view:'play-list',tag:tag}});
      }
    },
  }
</script>

<style scoped>
  .artist {
    display: flex;
    align-items: center;
    margin: 13px 0;
  }

  .artist .image {
    width: 30px;
    height: 30px;
    border-radius: 40px;
  }

  .el-col{
    display: flex;
    align-items: center;
  }

  .tag{
    color: #005fd2;
    font-size: 14px;
    cursor: pointer;
  }

  .tag:hover{
    color:black;
  }
</style>
