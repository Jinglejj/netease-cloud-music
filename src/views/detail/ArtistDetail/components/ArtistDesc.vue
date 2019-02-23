<template>
  <div>
    <div class="title">{{name}}简介</div>
    <div v-for="(item,index) in briefDesc" :key="index">
      <div class="content">{{item}}</div>
    </div>
    <div class="introductions">
      <div v-for="(item,index) in introduction" :key="index" class="introductions-item">
        <div class="title">{{item.ti}}</div>
        <div class="content" v-for="(content,index2) in item.txt" :key="index2">{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from './mixin'
  import {getArtistDesc} from "@/apis/artists";

  export default {
    name: "ArtistDesc",
    mixins: [mixin],
    props:{
      name:{
        type:String
      }
    },
    data() {
      return {
        briefDesc: {},
        introduction: []
      }
    },
    methods: {
      search() {
        getArtistDesc(this.id).then(res => {
          res.introduction.forEach(item => item.txt = item.txt.split('\n'));
          res.briefDesc=res.briefDesc.split('\n');
          this.briefDesc = res.briefDesc;
          this.introduction = res.introduction;
          console.log(this.introduction)
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
    },
    mounted() {
      this.search();
    }
  }
</script>

<style scoped>
  .title {
    text-align: left;
    margin: 15px 0;
    font-weight: 500;
  }

  .content {
    text-indent: 2em;
    text-align: left;
    font-size: 13px;
    line-height: 26px;
  }
</style>
