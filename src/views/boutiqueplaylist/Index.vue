<template>
    <div class="container">
        <div class="title">
            精品歌单
        </div>
        <el-scrollbar ref="scroll" style="height: 100%">
            <div style="flex: 1">
                <playlist-item v-for="(item,index) in playlists" :key="index" :play-list="item"></playlist-item>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    import PlaylistItem from './PlaylistItem'
    import {getHighqualityPlayList,getNextHeightPlayList} from "../../apis/playList";
    import scroll from '@/mixins/scroll'
    export default {
        name: "Index",
        mixins:[scroll],
        components: {
            PlaylistItem
        },
        data() {
            return {
                playlists: [],
                total: 0
            }
        },
        methods: {
            getPlayList() {
                getHighqualityPlayList(20).then(res => {
                    this.playlists = res.playlists;
                    this.total=res.total;
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            },
            getNextPage(){
                if(this.playlists.length===this.total){
                    return;
                }
                getNextHeightPlayList(20,this.playlists[this.playlists.length-1].updateTime).then(res=>{
                    this.playlists=this.playlists.concat(res.playlists);
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                });
            }
        },
        mounted() {
            this.getPlayList();
        }
    }
</script>

<style scoped>
    .container {
        width: 95%;
        height: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    .container .title {
        text-align: left;
        padding: 15px 0;
        border-bottom: 1px solid #DCDFE6;
    }
</style>
