<template>
    <div class="container">
        <div class="main-container">
            <div class="aside">
                <keep-alive>
                    <Aside style="height: 100%;"></Aside>
                </keep-alive>
            </div>
            <div class="app-main">
                <app-main></app-main>
            </div>
            <keep-alive>
                <transition name="fade">
                    <player-info v-if="showPlayerInfo" class="player-info"
                                 :img-url="song.album.picUrl"
                                 :is-play="isPlay"
                                 :id="song.id"></player-info>
                </transition>
            </keep-alive>
        </div>
        <div class="player3">
            <player :song="song"
                    :songs-list="songsList"
                    :isPlay="isPlay"
                    @showPlayerInfo="showPlayerInfo=!showPlayerInfo"></player>
        </div>
    </div>
</template>

<script>
    import {Aside, AppMain} from './components'
    import Player from '@/views/player/Player'
    import PlayerInfo from '@/views/player/PlayerInfo'

    export default {
        name: "LayOut",
        components: {
            Aside,
            AppMain,
            Player,
            PlayerInfo
        },
        data() {
            return {
                showPlayerInfo: false,
            }
        },
        computed: {
            song() {
                let song = this.$store.getters.music;
                delete song.url;
                song.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`;
                song.title = song.name;
                song.artist = song.artists[0].name;
                song.pic = song.album.picUrl;
                return song;
            },
            songsList() {
                return this.$store.getters.songsList;
            },
            isPlay() {
                return this.$store.getters.isPlay;
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .main-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        flex: 1;
    }

    .app-main {
        flex: 1;
        overflow-x: hidden;
    }

    .player3 {
        border-top: .3px solid #72757994;
        height: 76px;
    }

    .player-info {
        width: 100%;
        background-color: white;
        position: absolute;
        height: calc(100% - 76px);
        z-index: 99;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s, width .3s ,height .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        width:66px;
        height: 66px;
        bottom: 76px;
    }
    .fade-enter-to{
        bottom: 76px;
    }
</style>
