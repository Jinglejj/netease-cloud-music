<template>
  <div>
    <div v-for="(item,index) in result" :key="index" class="item" :class="index % 2 === 0 ? 'gray':'white'" @click="getArtistDetail(item.id)">
      <img class="image" :src="item.picUrl===null? item.img1v1Url:item.picUrl">
      {{item.name}}
    </div>
  </div>
</template>

<script>
  import {searchSongs} from "@/apis/api";
  import mixin from './mixin'
  import detail from '@/mixins/detail'

  export default {
    name: "Artists",
    mixins: [mixin,detail],
    data() {
      return {
        result: [],
        name:'artists',
        type:100
      }
    },
    methods: {
      search() {
        searchSongs(this.keyword, this.type).then(res => {
          this.count=res.result.artistCount;
          this.result = res.result[this.name];
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>

<style scoped>
  .item {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
  }

  .item .image {
    width: 90px;
    height: 90px;
    margin: 0 15px;
  }

  .gray {
    background-color: #F4F4F6
  }

  .white:hover {
    background-color: #F4F4F6;
  }
</style>
