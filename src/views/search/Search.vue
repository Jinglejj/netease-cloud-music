<template>
  <div class="container">
    <el-autocomplete v-model="keyword" placeholder="搜索音乐、歌手、歌词、用户"
                     :fetch-suggestions="querySearchAsync"
                     @keyup.enter.native="searchSong"
                     :trigger-on-focus="false"
                     :select-when-unmatched="true"
                     @select="handleSelect">
      <i @click="searchSong" style="cursor: pointer" class="el-icon-search el-input__icon" slot="suffix" />
    </el-autocomplete>
      <keep-alive  v-if="!searchStatus">
        <search-words  ref="words" v-on:searchWord="searchWord"></search-words>
      </keep-alive>
      <search-result style="flex: 1" ref="search" v-else :keyword="word"></search-result>
  </div>
</template>

<script>
  import SearchWords from './SearchWords';
  import SearchResult from './SearchResult';
  import {searchSuggest} from "@/apis/api";

  export default {
    name: "Search",
    components:{
      SearchWords,
      SearchResult
    },
    data() {
      return {
        keyword: '',
        word:'',
        searchStatus:false,
      }
    },
    watch:{
      keyword(value){
        if(this.searchStatus&&value===''){
          this.searchStatus=false;
        }
      }
    },
    methods: {
      searchWord(data){
        this.keyword=data;
        this.$refs.words.saveHistory(this.keyword);
        this.searchSong();
      },
      searchSong(){
        if(this.keyword.trim()===''){
          return;
        }
        this.word=this.keyword;
        this.searchStatus=true;
      },
      querySearchAsync(queryString, cb) {
        const arr=[{value:1},{value:2}];
        searchSuggest(this.keyword).then(res=>{
          const suggest=[];
          res.result.allMatch.forEach(item=>suggest.push({value:item.keyword}));
          cb(Array.from(suggest));
        }).catch(err=>{
          console.log(err);
        })
      },
      handleSelect(e){
        this.searchSong();
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .container {
    width: 95%;
    height:100%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
</style>
<style>
  .el-autocomplete{
    width:100%;
    margin: 15px 0;
  }

  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #dcdfe6;
    outline: 0;
  }
</style>
