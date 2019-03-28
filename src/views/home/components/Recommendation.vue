<template>
  <div>
    <el-carousel :type="isMobile?'':'card'"
                 indicator-position="none"  :height="imgHeight">
      <el-carousel-item v-for="(item,index) in bannerData" :key="index" >
        <div style="position: relative">
          <img width="100%;" ref="img" :src="item.imageUrl" alt="" @click="openBanner(item)">
          <span class="tag" :style="{backgroundColor:item.titleColor}">{{item.typeTitle}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="classify">
      <div v-for="(item,index) in classifyData" :key="index" class="classify-item">
        <el-button class="classify-button" @click="$router.push({path:'leaderboard',name:'leaderBoard'})" circle>
          <svg-icon :icon-class="item.iconClass" style="width: 100%;height: 100%"></svg-icon>
        </el-button>
        <span>{{item.title}}</span>
      </div>
    </div>
    <programa title='推荐歌单' icon-class="recomm-playlist" :path="{name:'index',params:{view:'play-list'}}"  v-on="$listeners" >
      <div slot="content">
        <el-row :gutter="10" slot="content" type="flex" justify="space-between" style="flex-wrap:wrap;">
          <el-col v-for="(item,index) in recommendedSongList" :key="index" :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
            <div @click="getPlayListDetail(item.id)">
              <card style="width:100% " :picUrl="item.picUrl" :name="item.name"></card>
            </div>
          </el-col>
        </el-row>
      </div>
    </programa>
    <programa title="独家放送" icon-class="recomm-mv" :path="{name:'index',params:{view:'play-list'}}" v-on="$listeners">
      <div slot="content">
        <el-row :gutter="10" slot="content" type="flex" justify="space-between" style="flex-wrap:wrap;">
          <el-col v-for="(item,index) in privatecontent" :key="index" :xs="24" :sm="12" :lg="8" @click.native="getPrivateContent(item)">
            <card style="width:100% " :picUrl="item.sPicUrl" :name="item.copywriter"></card>
          </el-col>
        </el-row>
      </div>
    </programa  >
    <programa title="推荐MV" icon-class="recomm-mv" :path="{name:'index',params:{view:'play-list'}}" v-on="$listeners">
      <div slot="content">
        <el-row :gutter="10" slot="content" type="flex" justify="space-between" style="flex-wrap:wrap;">
          <el-col v-for="(item,index) in recommendedMv" :key="index" :xs="24" :sm="12" :lg="12">
            <card style="width:100% " :picUrl="item.picUrl" :name="item.copywriter" @click.native="getMvDetail(item.id)"
                  :artist-name="item.artistName" ></card>
          </el-col>
        </el-row>
      </div>
    </programa>
  </div>
</template>

<script>
  import {banner, getPrivateContent, getRecommendedMv, recommendedSongList} from "@/apis";
  import Programa from '@/components/Programa';
  import Card from '@/components/Card';
  import {isMobile} from "@/utils/util";
  import detail from '@/mixins/detail';
  export default {
    name: "Recommendation",
    mixins:[detail],
    components: {
      Programa,
      Card
    },
    data() {
      return {
        classifyData: [{
          title: '私人FM',
          iconClass: 'FM'
        }, {
          title: '每日推荐',
          iconClass: 'FM',
        }, {
          title: '排行榜',
          iconClass: 'paixingbang'
        }],
        bannerData: [],
        recommendedSongList: [],
        privatecontent: [],
        recommendedMv: [],
        img:{
          height:250,
        },
        imgHeight:'250px'
      }
    },
    computed: {
      isMobile() {
        return isMobile();
      }
    },
    methods: {
      openBanner(data) {
        console.log(data);
        switch (data.targetType) {
          case 3000:
            window.open(data.url);
            break;
          case 1:
            this.$store.dispatch('play', data.targetId);
            break;
        }
      },
      getPrivateContent(data){
        window.open(`https://music.163.com/#/topic?id=${data.url}`)
      },
      getMore(path){
        this.$router.push({path:'/index',name:'index',params:{view:path}})
      }
    },
    mounted() {
      banner().then(res => {
        this.bannerData = res.banners;
        this.$nextTick(()=>{
          this.img=this.$refs.img[0];
          this.img.onload=()=>{
              this.imgHeight=(this.img.height+18)+'px';
          }
        })
      }).catch(err => {
        console.log(err);
      });
      recommendedSongList().then(res => {
        this.recommendedSongList = res.result.splice(0, 8);
      }).catch(err => {
        console.log(err)
      });
      getPrivateContent().then(res => {
        this.privatecontent = res.result;
      }).catch(err => {
        console.log(err)
      });
      getRecommendedMv().then(res => {
        const result = res.result;
        result.forEach(e => e.artistName = e.artists[0].name);
        this.recommendedMv = result;
      }).catch(err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>

  .image {
    width: 100%;
    display: block;
  }

  .tag {
    position: absolute;
    padding-left: 10px;
    border-radius: 40px 0 0 40px;
    color: white;
    font-size: 12px;
    bottom: 10px;
    right: 0;
  }

  .classify {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .classify-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .classify-button {
    width: 58px;
    height: 58px;
    background-color: #FA5142;
  }


</style>
