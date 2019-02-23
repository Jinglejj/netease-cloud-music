<template>
  <div>
    <el-row :gutter="10" type="flex" style="flex-wrap: wrap">
      <el-col :xs="24" :sm="12" :lg="6" v-for="(item ,index) in result" :key="index">
        <card :pic-url="item.cover" :artist-name="item.artistName" :name="item.name" @click.native="getMvDetail(item.id)"></card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import {searchSongs} from "@/apis/api";
  import mixin from './mixin'
import detail from '@/mixins/detail'
  export default {
    name: "MV",
    mixins: [mixin,detail],
    components: {
      Card
    },
    data() {
      return {
        result: [],
        name:'mvs',
        type:1004
      }
    },
    methods: {
      search() {
        searchSongs(this.keyword, this.type).then(res => {
          this.count=res.result.mvCount;
          this.result = res.result.mvs
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>

</style>
