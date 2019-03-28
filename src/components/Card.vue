<template>
  <el-card @click="click" class="card big-animation" :body-style="{ padding: '0px' }">
    <div v-if="square" class="square">
      <img class="image" :src="picUrl" :src-preview="picUrl" alt="">
    </div>
    <img v-else class="image" :src="picUrl"  alt="">
    <div class="ellipsis">{{name}}</div>
    <div v-if="artistName!==''" class="writer">{{artistName}}</div>
  </el-card>
</template>

<script>
  export default {
    name: "Card",
    props: {
      picUrl: {
        type: String,
      },
      name: {
        type: String
      },
      artistName: {
        type: String,
        default: ''
      },
      square: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click() {
        this.$emit('test')
      }
    }
  }
</script>

<style scoped>
  .card {
    width: 100%;
    margin: 10px 0 1px;
  }


  .card .image {
    width: calc(100% - 2px);
    border: 1px solid #E4E7ED;
    cursor: pointer;
  }

  .card .image:hover {
    filter: brightness(115%);
  }

  .square{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
  }

  .square .image{
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    left: 0;
    position: absolute;
  }


  .ellipsis {
    width: 90%;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .writer {
    width: 90%;
    height: 25px;
    line-height: 12px;
    font-size: 12px;
    color: #909399;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
