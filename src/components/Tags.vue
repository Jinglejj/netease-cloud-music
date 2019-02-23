<template>
  <div class="tabs-container">
    <div v-for="(item,index) in tabsList" :key="index" @click="changeTag(index)">
      <span v-if="activeTag!==''" class="tabs-item" :style="index===tabsList.length-1?'border:none':''"
            :class="item.key===activeTag?'active':''">{{item.key}}</span>
      <span v-else class="tabs-item" :style="index===tabsList.length-1?'border:none':''"
            :class="item.key===currentTag?'active':''">{{item.key}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tabs",
    props: {
      tabsList: {
        type: Array,
        default: () => []
      },
      defaultTag:{
        type:String,
      },
      activeTag:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        currentTag:this.defaultTag
      }
    },
    methods: {
      changeTag(index) {
        this.currentTag = this.tabsList[index].key;
        this.$emit('changeTag', this.tabsList[index])
      }
    }
  }
</script>

<style scoped>
  .tabs-container {
    width: 80%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .tabs-item {
    font-size: 13px;
    color: #939393;
    padding: 0 9px;
    border-right: 1px solid #DCDCDE;
    cursor: pointer;
  }

  .tabs-item:hover {
    color: black;
  }

  .active {
    color: #d71c0b
  }
</style>
