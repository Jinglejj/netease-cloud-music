<template>
    <div class="container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="recommendation">个性推荐</el-menu-item>
            <el-menu-item index="play-list">歌单</el-menu-item>
            <!--<el-menu-item index="3">主播电台</el-menu-item>-->
            <el-menu-item index="new-music">最新音乐</el-menu-item>
            <el-menu-item index="artists">歌手</el-menu-item>
        </el-menu>
        <el-scrollbar ref="scroll" style="height: 100%">
            <div class="main" style="margin-top: 20px">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive>
                        <components ref="child" :is="currentView" v-on:getMore="getMore"></components>
                    </keep-alive>
                </transition>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    import {Recommendation, PlayList, Artists, NewMusic} from "@/views/home/components";
    import scroll from '@/mixins/scroll'

    export default {
        name: "Home",
        mixins: [scroll],
        components: {
            Recommendation,
            PlayList,
            Artists,
            NewMusic
        },
        props: {
            view: {
                type: String,
                default: 'recommendation'
            },
            tag: {
                type: String,
                default: '全部'
            }
        },
        data() {
            return {
                activeIndex: 'recommendation',
                currentView: 'recommendation',
                // scroll:{moveY:0}
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.currentView = key;
                this.activeIndex = key;
            },
            getMore(data) {
                console.log(data);
                if (data.name === this.$route.name) {
                    this.currentView = data.params.view;
                    this.activeIndex = data.params.view;
                } else {
                    this.$router.push(data);
                }
            },
            getNextPage() {
                if (this.$refs.child.getNextPage) {
                    this.$refs.child.getNextPage();
                }
            }
        },
        activated() {
            this.currentView = this.view;
            this.activeIndex = this.view;
        },
    };
</script>

<style scoped>

    .container {
        width: 95%;
        height: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    .main {
        flex: 1;
        width: 80%;
        margin: auto;
    }

</style>

