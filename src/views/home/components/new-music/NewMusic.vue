<template>
    <div class="container">
        <div class="nav-bar">
            <div class="nav-bar-class">
                <div class="new-music-tag" style="background-color: gray">新歌速递</div>
                <div class="new-music-tag">新碟上架</div>
            </div>
            <tags style="width: auto" :tabsList="tags"></tags>
        </div>
    </div>
</template>

<script>
    import Tags from '@/components/Tags'
    import {NEW_MUSIC_TAGS_LIST} from "../../../../common/data";

    export default {
        name: "NewMusic",
        components: {
            Tags
        },
        data() {
            return {
                tags: NEW_MUSIC_TAGS_LIST
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
    }

    .nav-bar {
        display: flex;
        justify-content: space-between;
    }

    .nav-bar .nav-bar-class {
        display: flex;
        border: 1px solid gray;
        border-radius: 4px;
    }

    .nav-bar .nav-bar-class .new-music-tag {
        flex: 1;
        padding: 3px;
        border-radius: 4px;
    }
</style>
