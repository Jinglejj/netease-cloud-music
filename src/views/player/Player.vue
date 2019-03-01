<template>
    <div style="display: flex;justify-content: space-between">
        <div style="display: flex;align-items: center" @click="showPlayerInfo">
            <img :src="song.album.picUrl" class="image">
        </div>
        <el-row style="margin-left:13px;margin-top:5px;height:70px">
            <el-col :xs="0" :sm="2" :md="1" :lg="1" class="hidden-xs">
                <div class="play-controller">
                    <el-button size="small" @click="previous" style="background-color:#c20c0c" circle>
                        <svg-icon icon-class="ai10"></svg-icon>
                    </el-button>
                </div>
            </el-col>
            <el-col :xs="4" :sm="3" :md="3" :lg="1">
                <div class="play-controller">
                    <el-button @click="play" style="background-color:#c20c0c" circle>
                        <svg-icon :icon-class="isPlay?'bofangzanting':'bofang'"></svg-icon>
                    </el-button>
                </div>
            </el-col>
            <el-col :xs="3" :sm="2" :md="1" :lg="1">
                <div class="play-controller">
                    <el-button size="small" style="background-color:#c20c0c" @click="next" circle>
                        <svg-icon icon-class="ai09"></svg-icon>
                    </el-button>
                </div>
            </el-col>
            <el-col :xs="16" :sm="16" :md="13" :lg="16">
                <div class="music-info">
                    <span class="ellipsis">{{song.title}}</span>
                    <span style="color:#938a8a" class="ellipsis">{{'-'+song.artist}}</span>
                    <span class="time"><span>{{formatTime(currentTime)}}</span>{{' / '}}<span style="color: #938a8a">{{formatTime(duration)}}</span></span>
                </div>
                <el-slider class="time-slider" v-model="currentTime"
                           :max="duration||0"
                           @change="changeTime"
                           :format-tooltip="formatTime"></el-slider>
            </el-col>
            <el-col :lg="1" class="hidden-md-and-down">
                <svg-icon class="icon" icon-class="heart"></svg-icon>
            </el-col>
            <el-col :lg="1" class="hidden-md-and-down">
                <el-popover
                        placement="top"
                        trigger="hover"
                        offset="10"
                        width="300">
                    <div style="display: flex">
                    <span style="margin-right:10px;margin-top:2.5px">
                      <svg-icon icon-class="volume"></svg-icon>
                    </span>
                        <el-slider v-model="volume" style="flex: 1"></el-slider>
                    </div>
                    <svg-icon class="icon" icon-class="volume" slot="reference"></svg-icon>
                </el-popover>
            </el-col>
            <el-col :lg="1" class="hidden-md-and-down">
                <div @click="changePlayMode">
                    <svg-icon class="icon" :icon-class="playModeList[playMode]"></svg-icon>
                </div>
            </el-col>
            <el-col :lg="1" class="hidden-md-and-down">
                <svg-icon class="icon" icon-class="bofangliebiao"></svg-icon>
            </el-col>
        </el-row>
        <aplayer ref='aplayer' v-on:ended="next" style="display: none" :music="song"
                 :volume="volume/100" mini>
        </aplayer>
    </div>
</template>

<script>
    import Aplayer from 'yujinjiang-vue-aplayer';
    import bus from '@/utils/eventBus.js';
    export default {
        name: "Player",
        components: {
            Aplayer
        },
        props: {
            song: {
                type: Object,
                require: true
            },
            songsList: {
                type: Array,
                require: true
            }
        },
        data() {
            return {
                volume: 50,
                image: '',
                currentTime: 0,
                duration: 0,
                audio: {},
                playMode: 'sequential',
                playModeList: {
                    singleCycle: 'danquxunhuan',
                    sequential: 'liebiaoshunxu',
                    random: 'suijibofang',
                }
            }
        },
        computed: {
            isPlay() {
                return this.$store.getters.isPlay;
            }
        },
        watch: {
            isPlay(val) {
                if (val) {
                    this.playing();
                } else {
                    this.pause();
                }
            },
            currentTime(val){
                bus.$emit('updateTime',val);
            }
        },
        methods: {
            play() {
                this.$store.commit('SET_ISPLAY', !this.isPlay);
            },
            playing() {
                this.audio.autoplay = true;
                this.$refs.aplayer.play();
            },
            pause() {
                this.$refs.aplayer.pause();
            },
            next() {
                console.log('next');
                let index = 0;
                if (this.playModeList[this.playMode] === 'suijibofang') {
                    index = Math.floor(Math.random() * (this.songsList.length));
                } else {
                    const currentIndex = this.songsList.findIndex(item => item.id === this.song.id);
                    index = currentIndex === this.songsList.length - 1 ? 0 : currentIndex + 1;
                }
                this.$store.dispatch('play', this.songsList[index].id);
            },
            previous() {
                const currentIndex = this.songsList.findIndex(item => item.id === this.song.id);
                const index = currentIndex === 0 ? this.songsList.length - 1 : currentIndex - 1;
                this.$store.dispatch('play', this.songsList[index].id);
                if (!this.isPlay) {
                    this.$store.commit('SET_ISPLAY', true);
                }
            },
            changeTime(time) {
                if (!this.$refs.aplayer.audio.paused) {
                    this.$refs.aplayer.audio.currentTime = time
                }
            },
            showPlayerInfo() {
                this.$emit('showPlayerInfo');
            },
            changePlayMode() {
                const keys = Object.keys(this.playModeList);
                const index = keys.findIndex(item => this.playMode === item);
                if (index === keys.length - 1) {
                    this.playMode = keys[0];
                } else {
                    this.playMode = keys[index + 1];
                }
            },
            formatTime(time) {
                let it = parseInt(time);
                let m = parseInt(it / 60);
                let s = parseInt(it % 60);
                return (m < 10 ? "0" : "") + parseInt(it / 60) + ":" + (s < 10 ? "0" : "") + parseInt(it % 60)
            }
        },
        mounted() {
            const {audio} = this.$refs.aplayer;
            audio.ondurationchange = () => {
                this.duration = this.audio.duration;
            };
            audio.ontimeupdate = () => {
                this.currentTime = this.audio.currentTime;
                if (this.playModeList[this.playMode] === 'danquxunhuan') {
                    if (this.currentTime === this.audio.duration) {
                        this.audio.load();
                        this.audio.play();
                    }
                }
            };
            audio.onplay = () => {
                this.$store.commit('SET_ISPLAY', true);
            };
            audio.onpause = () => {
                this.$store.commit('SET_ISPLAY', false);
            };
            this.audio = audio;
            this.$store.dispatch('play', 18271015);
            this.$store.dispatch('getNewSongsList');
        }
    }
</script>

<style scoped>
    .el-col {
        height: 100%;
        overflow: hidden;
    }

    .el-row {
        width: 100%;
        height: 100%;
    }

    .el-button {
        border: 1px solid #c20c0c;
    }

    .image {
        width: 66px;
        height: 66px;
        padding-left: 10px
    }

    .icon {
        margin-top: 33px
    }

    .play-controller {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .time-slider {
        width: 90%;
        margin: auto;
    }

    .music-info {
        width: 91%;
        margin: 15px auto 5px;
        display: flex;
        position: relative;
        font-size: 12px;
    }

    .time {
        font-size: 10px;
        position: absolute;
        right: 2px;
        top: 4px;
    }

    .ellipsis {
        max-width: 40%;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
