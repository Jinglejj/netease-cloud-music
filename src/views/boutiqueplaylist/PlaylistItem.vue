<template>
    <div class="playlist-container">
        <img class="image" :src="playList.coverImgUrl" alt="">
        <div class="info">
            <div class="title"><span class="tag"> {{playList.tag}}</span>{{playList.name}}</div>
            <div class="artist">{{`by ${playList.creator.nickname}`}}</div>
            <div class="describute">{{playList.copywriter}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlaylistItem",
        props: {
            playList: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .playlist-container {
        width: 100%;
        height: 200px;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        border-bottom: 1px solid #DCDFE6;
    }

    .playlist-container:hover {
        background-color: #e4e7ed;
    }

    .playlist-container .image {
        width: 200px;
    }

    .playlist-container .info {
        height: 100%;
        flex: 1;
        align-self: flex-start;
        text-align: left;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
    }

    .playlist-container .info * {
        height: 100%;
        margin: 10px 0;
    }

    .playlist-container .info .title {
        font-size: 30px;
    }

    .playlist-container .info .artist, .describute {
        font-size: 15px;
        color: #a9a9a9;
    }

    .playlist-container .info .describute {
        display: flex;
        align-items: center;
    }

    .playlist-container .info .tag {
        color: #c20c0c;
        border: 1px solid #c20c0c;
        font-size: 20px;
        padding: 2px 5px;
    }
</style>
