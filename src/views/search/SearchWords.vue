<template>
  <el-row :gutter="10">
    <el-col :md="24" :lg="12">
      <p class="title">热门搜索</p>
      <div class="popular-searches-words">
        <span v-for="(item,index) in popularWords" :key="index" @click="searchWord(item)" class="popular-word">{{item}}</span>
      </div>
    </el-col>
    <el-col :md="24" :lg="12">
      <div class="grid-content bg-purple">
        <p class="title">搜索历史
          <span class="svg-container" @click="deleteHistory(-1)">
              <svg-icon icon-class="trashcan"/>
          </span>
        </p>
        <el-scrollbar style="height: 100%;">
          <div class="search-history-words">
            <span v-for="(item,index) in historyWords" :key="index" @click="searchWord(item)" class="history-words">
              {{item}}
              <span class="svg-container" @click.stop="deleteHistory(index)"><svg-icon
                icon-class="delete"/>
              </span>
            </span>
          </div>
        </el-scrollbar>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    import {searchHot} from "@/apis/api";
    export default {
        name: "SearchWords",
      data(){
          return{
            popularWords:[],
            historyWords:[],
          }
      },
      methods:{
        searchWord(item){
          this.saveHistory(item);
          this.$emit('searchWord',item);
        },
        saveHistory(item){
          this.historyWords.unshift(item);
          this.historyWords=Array.from(new Set(this.historyWords));
          localStorage.setItem('historyWords',JSON.stringify(this.historyWords));
        },
        deleteHistory(index) {
          if(localStorage.getItem('historyWords')===null||JSON.parse(localStorage.getItem('historyWords')).length===0){
            return;
          }
          if (index === -1) {
            this.$confirm('确定清除搜索历史记录?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.historyWords.splice(0,this.historyWords.length);
              localStorage.setItem('historyWords',JSON.stringify(this.historyWords));
            }).catch(() => {
            });
          }else{
            this.historyWords.splice(index,1)
          }
          localStorage.setItem('historyWords',JSON.stringify(this.historyWords));
        },
      },
      mounted() {
        const historyWords=localStorage.getItem("historyWords");
        if(historyWords===null){
          this.historyWords=[];
        }else{
          this.historyWords=JSON.parse(historyWords);
        }
        //获取热门搜索词
        searchHot().then(res=>{
          const hots=res.result.hots;
          this.popularWords=hots.map(item=>item.first);
        }).catch(err=>{
          console.log(err)
        })
      }
    }
</script>

<style scoped>

  .title {
    text-align: left;
    margin: 0;
    padding: 5px 0;
    border-bottom: 1px solid #c3c3c5;
  }

  .popular-searches-words{
    display: flex;
    flex-wrap:wrap;
    height: auto;
    align-content: space-between
  }

  .popular-word{
    vertical-align : bottom;
    padding: 1px 5px;
    border: 1px solid #c3c3c5;
    border-radius: 40px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  .search-history-words {
    display: flex;
    flex-direction: column;
    height: 300px;
  }

  .history-words {
    cursor: pointer;
    text-align: left;
    margin: 0.5em 0;
  }


  .svg-container {
    float: right;
    cursor: pointer
  }
</style>
