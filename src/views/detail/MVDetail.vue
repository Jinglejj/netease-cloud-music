<template>
    <div>
        <vue-dplayer :options="options"
                     ref="player" :autoplay="true">
        </vue-dplayer>
        <div class="content">
            <comment-list style="width:80%"></comment-list>
        </div>
    </div>
</template>

<script>
    import CommentList from '@/components/comment/ComentList'
    import VueDplayer from 'vue-dplayer'
    import { getMvDetail} from '@/apis/mv';

    export default {
        name: 'MVDetail',
        components: {
            VueDplayer,
            CommentList
        },
        props: {
            id: {
                require: true
            },
            url:{
                type:String,
                require:true,
            }
        },
        data() {
            return {
                options: {
                    autoplay: true,
                    video: {
                        url: this.url,
                    },
                },
                mvDetail: {},
                player: null,
            }
        },
        mounted() {
            getMvDetail(this.id).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        },
        methods: {
            switchHandle(url) {
                this.player.switchVideo({
                    url:url
                })
                this.player.video.autoplay=true;
                this.player.video.play();
                console.log(this.player);
            },
        },
    }
</script>

<style>
    .dplayer {
        width: 70%;
        height: 500px;
        margin: auto;
    }
    .content{
        display: flex;
    }

    @media (max-width: 768px) {
        .dplayer {
            width: 100%;
            height: auto;
        }
    }
</style>
