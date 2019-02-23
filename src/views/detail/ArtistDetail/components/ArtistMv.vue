<template>
  <el-row :gutter="10" type="flex" style="flex-wrap: wrap">
    <el-col :xs="24" :sm="12" :lg="6" v-for="(item ,index) in mvs" :key="index">
      <card :pic-url="item.imgurl" :artist-name="formatDate(item.publishTime,'yyyy-MM-dd')" :name="item.name" @click.native="getMvDetail(item.id)"></card>
    </el-col>
  </el-row>
</template>

<script>
  import mixin from './mixin'
  import {getArtistMv} from "@/apis/artists";
  import Card from '@/components/Card'
  import {formatDate} from "@/utils/util";
  import detail from '@/mixins/detail'
  export default {
    name: "ArtistMv",
    mixins: [mixin,detail],
    components:{
      Card
    },
    data() {
      return {
        mvs: []
      }
    },
    methods: {
      search() {
        getArtistMv(this.id).then(res => {
          this.mvs=res.mvs;
        }).catch(err => {
          console.log(err);
        });
      },
      formatDate(time,format){
        return new Date(time).Format(format);
      }
    },
    mounted(){
      this.search();
    }
  }
</script>

<style scoped>

</style>
