<template>
  <detail-layout name="歌手" :image-url="artist.picUrl" :title="artist.name" :loading="loading" >
    <div slot="describe" class="info">
      <div class="info-item">
        <svg-icon icon-class="yinfu" class="icon"></svg-icon>
        <span class="title">单曲数 : </span>
        <span class="number">{{artist.musicSize}}</span>
      </div>
      <div class="info-item">
        <svg-icon icon-class="zhuanji" class="icon"></svg-icon>
        <span class="title">专辑数 : </span>
        <span class="number">{{artist.albumSize}}</span>
      </div>
      <div class="info-item">
        <svg-icon icon-class="mv" class="icon"></svg-icon>
        <span class="title">MV数 : </span>
        <span class="number">{{artist.mvSize}}</span>
      </div>
    </div>
    <el-menu slot="menu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect">
      <el-menu-item index="songs-list">热门{{hotSongs.length}}</el-menu-item>
      <el-menu-item index="artist-album">专辑</el-menu-item>
      <el-menu-item index="artist-mv">MV</el-menu-item>
      <el-menu-item index="artist-desc">歌手详情</el-menu-item>
      <el-menu-item index="simi-artists">相似歌手</el-menu-item>
    </el-menu>
    <div style="width: 100%" slot="body">
      <keep-alive>
        <components :is="currentView" :id="id" :songs-list="hotSongs" :name="artist.name"></components>
      </keep-alive>
    </div>
  </detail-layout>
</template>

<script>
  import DetailLayout from '@/views/layout/DetailLayout';
  import {getArtistSongs} from "@/apis/artists";
  import {SongsList,ArtistAlbum,ArtistMv,ArtistDesc,SimiArtists} from "@/views/detail/ArtistDetail/components";

  export default {
    name: "ArtistDetail",
    components: {
      DetailLayout,
      SongsList,
      ArtistAlbum,
      ArtistMv,
      ArtistDesc,
      SimiArtists
    },
    props: {
      id: {
        require:true
      }
    },
    data() {
      return {
        artist:{},
        hotSongs:[],
        loading:false,
        activeIndex:'songs-list',
        currentView:'songs-list'
      }
    },
    methods: {
      getArtistInfo() {
        this.loading=true;
        getArtistSongs(this.id).then(res => {
          this.loading=false;
          this.artist=res.artist;
          this.hotSongs=res.hotSongs;
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      },
      handleSelect(key, keyPath) {
        this.currentView=key;
      }
    },
    mounted() {
      this.getArtistInfo();
    }
  }
</script>

<style scoped>
.info{
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
  .info-item{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
.info-item .icon{
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
.info-item .title{
  font-size: 14px;
}
  .info-item .number{
    padding-top: 3px;
    padding-left: 3px;
    font-size: 13px;
    color: #ADADAD;
  }
</style>
