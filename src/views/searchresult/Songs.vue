<template>
  <div>
    <div v-for="(item,index) in result" :key="index" @click="currentItemId=item.id">
      <songs-item @play="playMusic" :active="item.id===currentItemId" :id="item.id" :name="item.name"
                  :artist-name="item.artists | artistName" :album="item.album.name" :time="item.duration"
                  :clazz="index % 2===0?'gray':'white'"></songs-item>
    </div>
  </div>
</template>

<script>
  import {searchSongs} from "@/apis/api";
  import SongsItem from '@/components/SongsItem'
  import mixin from './mixin'

  export default {
    name: "Songs",
    mixins: [mixin],
    components: {
      SongsItem
    },
    data() {
      return {
        result: [],
        currentItemId: -12345,
        name:'songs',
        type:1,

      }
    },
    methods: {
      search() {
        searchSongs(this.keyword, 1).then(res => {
          this.count=res.result.songCount;
          this.result = res.result[this.name];
        })
      },
      playMusic(id) {
        this.$store.dispatch('play', id);
        this.$store.commit('SET_ISPLAY', true);
      }
    }
  }
</script>

<style scoped>
  .name {
    width: 50%;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .gray {
    background-color: #F4F4F6
  }

  .white:hover {
    background-color: #F4F4F6;
  }

  .name {
    height: 100%;
  }
</style>
