<template>
  <el-row :class="clazz">
    <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
      <span v-if="index!==-1" style="margin: 4px 15px 0">{{index<10?'0'+index:index}}</span>
      <span class="ellipsis " style="width: 70%;padding-left: 5px">{{name}}</span>
      <div v-if="active" class="active">
        <el-button @click="play" size="mini" class="button" circle>
          <svg-icon icon-class="bofang2" style="width: 10px;height: 10px;margin-left: 2px"></svg-icon>
        </el-button>
        <el-button size="mini" class="button" circle>
          <svg-icon icon-class="more" style="width: 10px;height: 10px;margin-left: 2px"></svg-icon>
        </el-button>
      </div>
    </el-col>
    <el-col :sm="4" :md="4" :lg="4" :xl="4" class="hidden-xs-only">
      <span class="ellipsis info" style="width:90%">{{artistName}}</span>
    </el-col>
    <el-col :sm="6" :md="6" :lg="6" :xl="6" class="hidden-xs-only">
      <span class="ellipsis info" style="width:100%">{{album}}</span></el-col>
    <el-col :sm="4" :md="4" :lg="4" :xl="4" class="hidden-xs-only" style="justify-content: center"><span class="info">{{formatTime(time)}}</span>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "SongsItem",
    props: {
      id: {
        type: Number,
        require: true
      },
      active: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        require: true
      },
      artistName: {
        type: String,
        require: true
      },
      album: {
        type: String,
        require: true
      },
      time: {
        type: Number,
        require: true
      },
      clazz: {
        type: String,
        default: 'white'
      },
      index: {
        type: Number,
        default: -1
      }
    },
    methods: {
      formatTime(time) {
        let it = parseInt(time);
        let m = parseInt(it / 60000);
        let s = parseInt(it % 60);
        return `${m < 10 ? '0' + m : m}:${m < 10 ? '0' + m : m}`
      },
      play() {
        this.$emit('play', this.id);
      }
    }
  }
</script>

<style scoped>
  .el-col {
    height: 38px;
    display: flex;
    align-items: center;
  }

  .active {
    flex: 1;
    width: 30%;
    display: flex;
    align-items: center;
  }

  .button {
    width: 28px;
    height: 28px;
    border: 1px solid #b9b9b9;
  }


  .ellipsis {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info {
    font-size: 13px;
    color: #ADADAD;
  }

  .gray {
    background-color: #F4F4F6
  }

  .white:hover {
    background-color: #F4F4F6;
  }
</style>
