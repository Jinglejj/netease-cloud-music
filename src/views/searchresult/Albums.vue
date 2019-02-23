<template>
    <div>
      <el-row v-for="(item,index) in result" :key="index" :gutter="10" :class="index%2===0?'gray':'white'">
        <el-col :xs="16" :sm="14" :md="15" ><img class="image" :src="item.picUrl"><span class="ellipsis" style="width:80%"> {{item.name}}</span></el-col>
        <el-col :xs="8" :sm="10" :md="9"><div class="name">{{item.artists[0].name}}</div></el-col>
      </el-row>
    </div>
</template>

<script>
  import {searchSongs} from "@/apis/api";
  import mixin from './mixin';
  export default {
     name: "Albums",
     mixins:[mixin],
      data(){
          return {
            result:[],
            name:'albums',
            type:10
          }
      },
      methods:{
          search(){
            searchSongs(this.keyword,this.type).then(res=>{
              this.count=res.result.albumCount;
              this.result=res.result.albums;
            }).catch(err=>{
                console.log(err);
            });
          }
      }
    }
</script>

<style scoped>
  .el-col {
    height: 100px;
    display: flex;
    align-items: center;
  }
  .image{
    width:90px;
    height: 90px;
    margin:0 15px;
  }
  .ellipsis {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .name{
    color:  rgb(147, 138, 138);
    font-size: 13px;
  }
  .gray{
    background-color:#F4F4F6
  }

  .white:hover{
    background-color:#F4F4F6;
  }
</style>
