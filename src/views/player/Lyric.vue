<template>
    <div class="lyric-container" id="scroll-2" ref="scroll">
        <div v-if="lyric.length===0">
            <div style="text-align: center;color: white;font-size: 18px;margin-top:150px">暂无歌词</div>
        </div>
        <div v-else v-for="(item,index) in lyric" :key="index" :id="index"
             class="lyric-item"
             :style="index===currentLyric?'font-size:18px;color:white':''">
            {{item}}
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import bus from '@/utils/eventBus.js'

    export default {
        name: "Layric",
        props: {
            words: {
                type: Map,
                require: true
            }
        },
        data() {
            return {
                currentLyric: 0,
                currentTime: 0
            }
        },
        computed: {
            lyric() {
                const values = [];
                const entries = this.words.entries();
                for (let i of entries) {
                    values.push(i[1])
                }
                return values;
            }
        },
        watch: {
            words(val) {
                this.currentLyric = 0;
                this.currentTime = 0;
            },
            currentLyric(val) {
                if (val > this.words.size) {
                    return;
                }
                const line = document.getElementById(val);
                let top = line.offsetTop;
                const scrollTop = top - (this.$refs.scroll.clientHeight) * (2 / 5);
                this.$refs.scroll.scrollTo(0, scrollTop);
            },
            currentTime(val) {
                const keys = [...this.words.keys()];
                for (let i in keys) {
                    const r = keys[i] - (val * 1000);
                    if (r < 900 && r >= -900) {
                        if (this.currentLyric !== i) {
                            this.currentLyric = parseInt(i);
                        }
                        return;
                    }
                }
            }
        },
        created() {
            bus.$on('updateTime', (data) => {
                this.currentTime = data;
            })
        }
    }
</script>

<style scoped>

    .lyric-container {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .lyric-item {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 15px;
        text-align: left;
    }

    #scroll-2::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    #scroll-2::-webkit-scrollbar-track {
        background: #f6f6f6;
        border-radius: 2px;
    }

    #scroll-2::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 2px;
    }

    #scroll-2::-webkit-scrollbar-thumb:hover {
        background: #747474;
    }

    #scroll-2::-webkit-scrollbar-corner {
        background: #f6f6f6;
    }
</style>
