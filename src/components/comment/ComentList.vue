<template>
    <div class="container">
        <comment-item :item="{}" v-if="false"> </comment-item>
    </div>
</template>

<script>
    import CommentItem from './CommentItem'
    export default {
        name: "ComentList",
        components:{
            CommentItem
        }
    }
</script>

<style scoped>
</style>
