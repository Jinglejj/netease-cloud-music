<template>
    <div style="display: flex;flex-direction: column">
        <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="songs">单曲</el-menu-item>
            <el-menu-item index="artists">歌手</el-menu-item>
            <el-menu-item index="albums">专辑</el-menu-item>
            <el-menu-item index="MV">MV</el-menu-item>
            <el-menu-item index="songs-list">歌单</el-menu-item>
            <el-menu-item index="6">主播电台</el-menu-item>
        </el-menu>
        <el-scrollbar ref="scroll" style="height: 100%;">
            <div style="flex:1; overflow-x: hidden;">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive>
                        <component ref="child" :is="currentView" :keyword="keyword"></component>
                    </keep-alive>
                </transition>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    import {Songs, Artists, Albums, MV, SongsList} from "@/views/searchresult";
    import scroll from '@/mixins/scroll'

    export default {
        name: "SearchResult",
        mixins: [scroll],
        components: {
            Songs,
            MV,
            Artists,
            Albums,
            SongsList
        },
        props: {
            keyword: {
                type: String,
                require: true,
            }
        },
        data() {
            return {
                defaultActive: 'songs',
                currentView: 'songs'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.currentView = key;
            },
            getNextPage() {
                if (this.$refs.child.getNextPage) {
                    this.$refs.child.getNextPage();
                }
            }
        },
        mounted() {
        }

    }
</script>

<style scoped>
    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: 2px solid #c20c0c;
        color: #c20c0c;
    }

    .el-col {
        height: 100%;
    }
</style>
