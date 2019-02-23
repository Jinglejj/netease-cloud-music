<template>
  <div>
    <el-row v-for="(item,index) in result" :key="index" :gutter="10" type="flex" :class="index%2===0?'gray':'white'" @click.native="getPlayListDetail(item.id)">
      <el-col :xs="15" :sm="10" :lg="10" >
        <img :src="item.coverImgUrl" class="image"/>
        <span class="ellipsis" style="width:90%">{{item.name}}</span>
      </el-col>
      <el-col :xs="9" :sm="4" :lg="4" >
       <span class="info">{{item.trackCount}}首</span>
      </el-col>
      <el-col  :sm="6" :lg="6" class="hidden-xs-only">
        <span class="info">by {{item.creator.nickname}}</span>
      </el-col>
      <el-col  :sm="4" :lg="4" class="hidden-xs-only">
        <span class="info">播放:{{item.playCount}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {searchSongs} from "@/apis/api";
  import mixin from './mixin'
  import detail from '@/mixins/detail'
  export default {
    name: "SongsList",
    mixins: [mixin,detail],
    data() {
      return {
        result: [],
        name:'playlists',
        type:1000
      }
    },
    methods: {
      search() {
        searchSongs(this.keyword, this.type).then(res => {
          this.count=res.result.playlistCount;
          this.result=res.result.playlists;
        }).catch(err => {
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
    width: 90px;
    height: 90px;
    margin: 0 15px;
  }
  .ellipsis {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info{
    font-size: 13px;
    color: #ADADAD;
  }
  .gray{
    background-color:#F4F4F6
  }

  .white:hover{
    background-color:#F4F4F6;
  }

</style>
