<template>
  <div class="container">
    <div class="programa-header">
      <span class="title"><svg-icon style="margin-right:8px;width: 24px;height: 24px" :icon-class="iconClass"></svg-icon>{{title}}</span>
      <slot name="other"></slot>
      <div @click="getMore">
        <span class="go" >更多 ></span>
      </div>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    name: "Programa",
    props: {
      iconClass: {
        type: String,
        default: 'volume'
      },
      title: {
        type: String,
      },
      route: {
        type: String
      },
      path:{
        type:Object
      }
    },
    methods:{
      getMore(){
        this.$emit('getMore',this.path);
      }
    }
  };
</script>

<style scoped>
  .container{
    margin-top:25px;
  }
  .programa-header {
    position: relative;
    width: 100%;
    height: 20px;
    padding-bottom: 10px;
    border-bottom: .3px solid #00000094;
  }

  .title {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 10px;
    left: 0;
    font-size: 14px;
  }

  .go {
    position: absolute;
    bottom: 10px;
    right: 0;
    color: #909399;
    font-size: 10px;
    cursor: pointer;
  }
</style>
