<template>
  <div>
    <div class="select-container">
      <div class="tags-list">
        <span class="title">语种:</span>
        <tags :tabs-list="languageTags" @changeTag="(data)=>{this.language=data.value;topArtists=false}"></tags>
      </div>
      <div class="tags-list">
        <span class="title">分类:</span>
        <tags :tabs-list="classifyTags" @changeTag="(data)=>{this.classify=data.value;topArtists=false}"></tags>
      </div>
      <div class="tags-list">
        <span class="title">筛选:</span>
        <tags :tabs-list="filtrate" default-tag="热门" @changeTag="(data)=>{this.initial=data.value;topArtists=false}"></tags>
      </div>
    </div>
    <el-row :gutter="30" slot="content" type="flex" style="flex-wrap:wrap;">
      <el-col v-for="(item,index) in artists" :key="index" :xs="12" :sm="8" :md=" 6" :lg="4">
        <card @click.native="getArtistDetail(item.id)" style="width: 100%" :pic-url="item.picUrl" :name="item.name" :square="true"></card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Tags from '@/components/Tags'
  import Card from '@/components/Card'
  import {filtrate, classifyTags, languageTags} from './config'
  import {getTopArtists, findArtists} from "@/apis/artists";
  import detail from '@/mixins/detail';

  export default {
    name: "Artists",
    mixins:[detail],
    components: {
      Tags,
      Card
    },
    data() {
      return {
        languageTags: languageTags,
        classifyTags: classifyTags,
        filtrate: filtrate,
        artists: [],
        language: '10',
        classify: '01',
        initial: '',
        more:true,
        topArtists:true,
      }
    },
    computed: {
      cat() {
        return this.language + this.classify;
      }
    },
    watch: {
      cat(val) {
        this.getArtists();
      },
      initial(val) {
        this.getArtists();
      }
    },
    methods: {
      getTopArtists(limit = 30, offset = 0) {
        getTopArtists(limit, offset).then(res => {
          this.artists = res.artists;
          this.more=res.more;
        }).catch(err => {
          console.log(err);
        });
      },
      getArtists() {
        findArtists(this.cat, this.initial).then(res => {
          this.artists=res.artists;
          this.more=res.more;
        }).catch(err => {
          console.log(err);
        });
      },
      getNextPage(){
        if(!this.more){
          console.log('没有更多了');
          return;
        }
        const offset=parseInt(this.artists.length/30);
        if(this.topArtists){
          getTopArtists(30,offset).then(res=>{
            this.artists=this.artists.concat(res.artists);
            this.more=res.more;
          }).catch(err=>{
              console.log(err);
          });
        }
        else{
          findArtists(this.cat, this.initial,30,offset).then(res => {
            this.artists=this.artists.concat(res.artists);
            this.more=res.more;
          }).catch(err => {
            console.log(err);
          });
        }

      },
      getDetail(id){
        this.$router.push({path:'artistDetail',name:'artistDetail',params:{id:id}})
      }
    },
    mounted() {
      this.getTopArtists();
    }
  }
</script>

<style scoped>
  .tags-list {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .tags-list .title {
    font-size: 13px;
    color: #010101;
  }
</style>
