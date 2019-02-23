<template>
  <div>
    <div class="handle" >
      <svg-icon  style="margin-right: 3px;width: 19px;height: 19px" icon-class="playAll"></svg-icon>
      <span style="margin:10px 0;cursor: pointer" @click="playAll">播放全部</span>
    </div>
    <div v-for="(item,index) in songsList" :key="index" @click="currentItemId=item.id">
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
</template>

<script>
  import mixin from './mixin'
  import SongsItem from '@/components/SongsItem'
  export default {
    name: "SongsList",
    mixins: [mixin],
    components:{
      SongsItem
    },
    props: {
      songsList: {
        type: Array,
        default: () => []
      }
    },
    data(){
      return{
        currentItemId:'-1'
      }
    },
    methods:{

      playMusic(id) {
        this.$store.dispatch('play', id);
      },
      playAll(){
        this.$store.dispatch('playList',this.songsList);
      }
    }
  }
</script>

<style scoped>
  .handle{
    display: flex;
    align-items: center;
  }
</style>
