<template>
  <detail-layout name="歌单" :image-url="playList.coverImgUrl" :title="playList.name" :loading="loading">
    <play-list-info  slot="describe"
                     :image-url="playList.creator.avatarUrl"
                     :artist-name="playList.creator.nickname"
                     :time="playList.createTime"
                     :tags="playList.tags"
                     :description="playList.description"></play-list-info>
    <div style="width: 100%" slot="body">
      <div class="handle" >
        <svg-icon  style="margin-right: 3px;width: 19px;height: 19px" icon-class="playAll"></svg-icon>
        <span style="margin:15px 0;cursor: pointer" @click="playAll">播放全部</span>
      </div>
      <div v-for="(item,index) in playList.tracks" :key="index" @click="currentItemId=item.id">
        <songs-item
          @play="playMusic"
          :active="item.id===currentItemId"
          :index="index+1"
          :id="item.id"
          :name="item.name"
          :artist-name="item.ar | artistName"
          :album="item.al.name"
          :time="item.dt"
          :clazz="index % 2===0?'gray':'white'">
        </songs-item>
      </div>

    </div>
  </detail-layout>
</template>

<script>
  import DetailLayout from '@/views/layout/DetailLayout';
  import SongsItem from '@/components/SongsItem'
  import PlayListInfo from '@/views/detail/components/PlayListInfo';
  import {getPlayListDetail} from "@/apis/playList";

  export default {
    name: "PlayListDetail",
    components: {
      DetailLayout,
      SongsItem,
      PlayListInfo
    },
    props: {
      id: {
        required:true
      }
    },
    data() {
      return {
        playList: {
          creator:{avatarUrl:''},
          tags:[],
          description:''
        },
        privileges: [],
        currentItemId: -121423,
        loading:false
      }
    },
    watch:{
      id(val){
        this.getDetail();
      }
    },
    methods: {
      getDetail() {
        this.loading = true;
        getPlayListDetail(this.id).then(res => {
          console.log(res);
          this.playList = res.playlist;
          this.privileges = res.privileges;
          this.loading = false;
        }).catch(err => {
          console.log(err);
        });
      },
      playMusic(id) {
        this.$store.dispatch('play', id);
      },
      playAll(){
        this.$store.dispatch('playList',this.playList.tracks);
      }
    },
    mounted() {
      this.getDetail();
    }
  }
</script>

<style scoped>
  .handle{
    display: flex;
    align-items: center;
  }
</style>
