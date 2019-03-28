<template>
  <div >
    <tabs :active-tag="tag" style="margin-bottom: 15px" :tabs-list="hotTags" v-on:changeTag="changeTag"></tabs>
    <el-row :gutter="30" slot="content" type="flex" style="flex-wrap:wrap;">
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <card @click.native="$router.push({path:'boutiqueplaylist',name:'boutiquePlayList'})" style="width: 100%" :pic-url="highqualityPlayList.coverImgUrl" name="精品歌单"></card>
      </el-col>
      <el-col v-for="(item,index) in result" :key="index"  :xs="12" :sm="8" :md="6" :lg="4">
        <div @click="getDetail(item.id)">
          <card  style="width:100% " :picUrl="item.coverImgUrl" :name="item.name"
                 :artist-name="'by '+item.creator.nickname"></card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getTopPlayList, getHighqualityPlayList, getPlayListHotTags} from "@/apis/playList";
  import Card from '@/components/Card'
  import Tabs from '@/components/Tags'

  export default {
    name: "PlayList",
    components: {
      Card,
      Tabs
    },
    props:{
      tag:{
        type:String,
        default:'全部',
      }
    },
    data() {
      return {
        hotTags: [],
        highqualityPlayList: {},
        result: [],
        total:null
      }
    },
    watch:{
      tag(val){
        this.getHighqualityPlayList();
        this.getTopPlayList(23);
      }
    },
    methods: {
      getTopPlayList(limit=23,offset=0,cat='全部') {
        getTopPlayList(limit,offset,cat).then(res => {
          this.result = res.playlists;
          this.total=res.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getHighqualityPlayList(cat){
        getHighqualityPlayList(1,cat).then(res=>{
          this.highqualityPlayList = res.playlists[0];
        }).catch(err=>{
            console.log(err);
        });
      },
      changeTag(data){
        this.getHighqualityPlayList(data.name);
        this.getTopPlayList(23,0,data.value);
      },
      getNextPage(){
        if(this.total===this.result.length){
          console.log("没有更多歌单了");
          return ;
        }
        const offset=parseInt((this.result.length+1)/24);
        getTopPlayList(24,offset,this.tag).then(res => {
          this.result=this.result.concat(res.playlists);
          this.total=res.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getDetail(id){
        this.$router.push({path:'/playListDetail' ,name:'playListDetail',params:{id:id}})
      }
    },
    mounted() {
      getHighqualityPlayList().then(res => {
        this.highqualityPlayList = res.playlists[0];
        this.getTopPlayList();
      }).catch(err => {
        console.log(err);
      });
      getPlayListHotTags().then(res => {
        const tags=res.tags;
        tags.forEach(item=>{item.key=item.name,item.value=item.name});
        this.hotTags=tags.splice(0,8);
      }).catch(err => {
        console.log(err);
      });
    }
  }
</script>

<style scoped>

</style>
