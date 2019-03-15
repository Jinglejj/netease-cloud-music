<template>
    <div class="leader-item-container">
        <div class="img-container">
            <img :src="imgUrl" class="image">
            <div class="time">{{updateFrequency}}</div>
        </div>
        <div style="flex: 1;overflow: hidden;height: 100%">
            <div v-for="(item,index) in tracks"
                 :key="index"
                 class="track ellipsis" >
                {{ `${index+1}.${item}`}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LeaderItem",
        props: {
            imgUrl: {
                type: String
            },
            tracks: {
                type: Array,
                default: () => []
            },
            updateFrequency:{
                type:String
            }
        }
    }
</script>

<style scoped>
    .leader-item-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        box-shadow: 0 0 0 .5px #cfcfcf;
        margin-bottom: 10px;
    }

    .leader-item-container:hover {
        opacity: 0.8;
    }

    .img-container {
        width: 25%;
        height: 0;
        padding-bottom: 25%;
        position: relative;
    }

    .img-container .image {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .track {
        width: 95%;
        margin-left: 10px;
        text-align: left;
        font-size: 15px;
        line-height: 170%;
    }
    .time{
        position: absolute;
        bottom: 4px;
        font-size: 13px;
        font-weight: 100;
        color:white;
        margin-left: 10px;
    }

</style>
