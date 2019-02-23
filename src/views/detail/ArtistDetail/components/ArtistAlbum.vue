<template>
  <div>
    <el-row  type="flex" style="flex-wrap: wrap">
      <el-col :xs="12" :sm="4" :lg="3" v-for="(item ,index) in albums" :key="index">
        <card style="width: 90%" :pic-url="item.picUrl" :artist-name="formatDate(item.publishTime,'yyyy-MM-dd')" :name="item.name"></card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import mixin from './mixin'
  import {getArtistAlbum} from "@/apis/artists";
  import Card from '@/components/Card'
  import {formatDate} from "@/utils/util";

  export default {
    name: "ArtistAlbum",
    mixins: [mixin],
    components:{
      Card
    },
    data(){
      return{
        albums:[]
      }
    },
    methods: {
      search() {
        getArtistAlbum(this.id).then(res => {
          this.albums=res.hotAlbums;
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      },
      formatDate(time,format){
        return new Date(time).Format(format)
      }
    },
    mounted() {
      this.search();
    }
  }
</script>

<style scoped>

</style>
