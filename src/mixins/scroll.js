/**
 * 给el-scrollbar标签设置ref为scroll,监听是否滚动到底部
 */
export default {
  data(){
    return {
      scroll:{moveY:0}
    }
  },
  computed:{
    moveY(){
      return this.scroll.moveY;
    }
  },
  watch:{
    moveY(val){
      const wrap=this.$refs.scroll.wrap;
      const sub=Math.round(val*wrap.clientHeight/100)-Math.round(wrap.scrollHeight-wrap.clientHeight);
      if(sub>=-2&&sub<=2){
        this.getNextPage();
      }
    }
  },
  methods:{
    getNextPage(){
      console.log("到达底部了")
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.scroll=this.$refs.scroll
    })
  }
}
