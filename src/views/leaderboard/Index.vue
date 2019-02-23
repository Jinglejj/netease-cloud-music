<template>
    <div class="container">
        <div class="name">排行榜</div>
        <div style="flex: 1;overflow-x: hidden">
            <el-scrollbar style="height: 100%">
                <div class="content-container">
                    <div class="title">官方榜</div>
                    <el-row :gutter="20">
                        <el-col v-for="(item,index) in officialList" :key="index" :xs="24" :sm="12">
                            <leader-item :img-url="item.coverImgUrl" :tracks="item.tracks | tracks" :update-frequency="item.updateFrequency"></leader-item>
                        </el-col>
                        <el-col :xs="24" :sm="12">
                            <leader-item :img-url="artistList.coverUrl" :tracks="artistList.artists | tracks"></leader-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content-container">
                    <div class="title">全球榜</div>
                    <el-row :gutter="20">
                        <el-col v-for="(item,index) in globalList" :key="index" :xs="12" :sm="6" :md="4">
                            <card :pic-url="item.coverImgUrl" :name="item.name">
                                <div slot="desc" class="update-time">{{item.updateFrequency}}</div>
                            </card>
                        </el-col>
                    </el-row>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
    import LeaderItem from './components/LeaderItem';
    import Card from '@/components/Card'
    import {getTopListDetail} from "@/apis/leaderboard";

    export default {
        name: "Index",
        components: {
            LeaderItem,
            Card
        },
        data() {
            return {
                officialList: [],
                artistList: [],
                globalList: [],
            }
        },
        filters: {
            tracks(arr) {
                const newArr = [];
                arr.forEach(item => {
                    newArr.push(`${item.first}- ${item.second}`)
                });
                return newArr;
            }
        },
        mounted() {
            getTopListDetail().then(res => {
                console.log(res);
                this.artistList = res.artistToplist;
                this.officialList = res.list.slice(0, 4);
                this.globalList = res.list.slice(4);
                console.log(this.officialList);
                console.log(this.globalList)
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: column;
    }


    .name {
        width: 100%;
        text-align: left;
        font-size: 12px;
        color: #646161;
        margin: 10px 0;
    }

    .content-container {
        width: 100%;
    }

    .title {
        text-align: left;
        padding-bottom: 10px;
        border-bottom: 1px solid #cfcfcf;
        margin-bottom: 10px;
    }
    .update-time{
        position: absolute;
        bottom:45px;
        font-size: 13px;
        font-weight: 100;
        color:white;
        margin-left: 10px;
    }
</style>

