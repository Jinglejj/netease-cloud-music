<template>
    <div class="container">
        <img src="" class="image">
        <div class="content">
            <div style="display: flex">
                <span class="username">username:<span class="comment-content" style="width: 50px;">你好你好你还哦年后年后年后年后年后鸟你好你好你还哦年后年后年后年后年后鸟你好你好你还哦年后年后年后年后年后鸟</span></span>
            </div>
            <div>
                <span>2月17日</span>
                <span>分享</span>
                <span>回复</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                require: true
            }
        },
        name: "CommentItem"
    }
</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-top: 1px solid red;
        border-bottom: 1px solid red;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex:1;
    }

    .image {
        width: 30px;
        height: 30px;
        margin: 0 10px;
        border-radius: 50%;
    }

    .username {
        font-size: 18px;
        color: blue;
    }

    .comment-content {
        word-break: normal;
        white-space: pre-wrap;
        /*word-wrap: break-word;*/
        text-align: left;
    }
</style>
