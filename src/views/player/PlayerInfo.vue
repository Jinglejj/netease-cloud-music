<template>
    <div class="player-info">
        <div class="bg" :style="{backgroundImage: 'url(' + imgUrl+')'}">
            <div class="hs"></div>
        </div>
        <div class="container">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="10" :lg="12">
                    <div class="image-container">
                        <span v-if="show" ref="surround1" class="surround" :style="{borderColor:imgColor}">
                            <span class="circle circle1" :style="{backgroundColor:imgColor}"></span>
                        </span>
                        <span v-if="show" ref="surround2" class="surround" :style="{borderColor:imgColor}">
                            <span class="circle circle2" :style="{backgroundColor:imgColor}"></span>
                        </span>
                        <span v-if="show" ref="surround3" class="surround" :style="{borderColor:imgColor}">
                            <span class="circle circle3" :style="{backgroundColor:imgColor}"></span>
                        </span>
                        <img ref="img" :src="imgUrl" :class="{image:true,rotate:!isPlay}"/>
                    </div>
                </el-col>
                <el-col :sm="24" :md="14" :lg="12" class="hidden-xs-only">
                    <lyric :words="words"  style="height: 80%;margin-top:10%"></lyric>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {getLocalStorage, setLocalStorage} from "@/utils/util";
    import {getLyric} from "../../apis/api";
    import Lyric from './Lyric';
    import moment from 'moment'
    export default {
        name: "PlayerInfo",
        components: {
            Lyric
        },
        props: {
            imgUrl: {
                type: String
            },
            isPlay: {
                type: Boolean,
                require: true
            },
            id: {
                require: true
            }
        },
        data() {
            return {
                show: false,
                imgColor: 'blue',
                surroundList: [],
                words:new Map(),
            }
        },
        watch: {
            imgUrl(val) {
                this.pauseSuuround();
            },
            id(val){
                this.getLyric();
            }
        },
        methods: {
            getColor() {
                if (getLocalStorage(this.id)) {
                    this.imgColor = getLocalStorage(this.id);
                } else {
                    const URL = `http://${location.host}/img${this.imgUrl.slice('https://p1.music.126.net'.length)}`;
                    RGBaster.colors(URL, {
                        paletteSize: 1,
                        success: (payload) => {
                            setLocalStorage(this.id, payload.secondary);
                            this.imgColor = payload.secondary;
                        }
                    });
                }
                if (this.isPlay) {
                    this.playSuuround();
                }
            },
            handlerSurround(handle) {
                for (let i in this.$refs) {
                    if (i.indexOf('surround') !== -1) {
                        this.$refs[i].style.animationPlayState = handle;
                    }
                }
            },
            pauseSuuround() {
                this.show = false;
            },
            playSuuround() {
                this.show = true;
                this.$nextTick(() => {
                    this.surroundList = [];
                    for (let i in this.$refs) {
                        if (i.indexOf('surround') !== -1) {
                            this.surroundList.push(this.$refs[i])
                        }
                    }
                    this.surroundList.forEach(item => item.style.animationPlayState = 'paused');
                    this.surroundList.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animationPlayState = 'running'
                        }, (index + 1) * 1000);
                    })
                })
            },
            getLyric(){
                getLyric(this.id).then(res => {
                    console.log(res);
                    const {lrc} =res;
                    const arr=lrc.lyric.split('\n');
                    const map = new Map();
                    arr.forEach(item => {
                        const key = this.formDate(item.split(']')[0]);
                        const value = item.split(']')[1];
                        map.set(key, value);
                    });
                    this.words = map;
                }).catch(err => {
                    console.log(err);
                });
            },
            formDate(date) {
                const time = moment(date, 'mm:s:SSS');
                const second = time.second();
                const minute = time.minute();
                const millisecond = time.millisecond();
                return (minute * 60 * 1000) + second * 1000 + millisecond;
            }
        },
        mounted() {
            this.$refs.img.onload = () => {
                this.getColor();
            };
            this.$watch(() => this.isPlay, (val) => {
                if (val) {
                    this.$refs.img.style.animationPlayState = 'running';
                    this.playSuuround();
                } else {
                    this.$refs.img.style.animationPlayState = 'paused';
                    this.handlerSurround('paused');
                }
            }, {
                immediate: true
            });
            this.getLyric();
        }
    }
</script>

<style scoped>

    .el-row {
        width: 100%;
        height: 90%;
    }

    .el-col {
        height: 100%;
    }

    .player-info {
        position: relative;
    }

    .player-info .container {
        position: absolute;
        z-index: 2;
        width: 95%;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    @media (max-width: 768px) {
        .player-info .container {
            width: 100%;
            top: 20px;
            display: flex;
            align-items: center;
        }

        .image-container .image {
            width: 65%;
        }

        .image-container .surround {
            width: 99%;
            height: 0;
            opacity: 0;
            padding-bottom: 99%;
            border: 1px solid red;
            border-radius: 50%;
            position: absolute;
            animation: round2 3s infinite linear;
        }

    }

    .image-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .image {
        width: 50%;
        border-radius: 50%;
        border: 5px solid rgba(181, 181, 181, 0.4);
        animation: rotate-x 17s infinite linear;
        animation-fill-mode: backwards;
        z-index: 12;
    }

    .surround {
        width: 70%;
        height: 0;
        opacity: 0;
        padding-bottom: 70%;
        border: 1px solid red;
        border-radius: 50%;
        position: absolute;
        animation: round 3s infinite linear;
    }

    .circle {
        border-radius: 50%;
        background-color: red;
        position: absolute;
        margin: auto;
        opacity: inherit;
    }

    .circle1 {
        width: 10px;
        height: 10px;
        top: -5px;
        left: 0;
        right: 0;
    }

    .circle2 {
        width: 13px;
        height: 13px;
        top: -7px;
        left: 0;
        right: 0;
    }

    .circle3 {
        width: 8px;
        height: 8px;
        top: -4px;
        left: 0;
        right: 0;
    }


    .bg {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
        filter: blur(13px);
    }

    .hs {
        background: hsla(0, 0%, 44%, .5);
        width: 100%;
        height: 100%;
    }


    @keyframes rotate-x {
        from {
        }
        to {
            transform: rotate(360deg)
        }
    }

    @keyframes round {
        from {
            opacity: .8;
            width: 45%;
            padding-bottom: 45%;
        }
        to {
            transform: rotate(-280deg);
            opacity: 0;
        }
    }

    @keyframes round2 {
        from {
            opacity: .8;
            width: 60%;
            padding-bottom: 60%;
        }
        to {
            transform: rotate(-280deg);
            opacity: 0;
        }
    }
</style>
