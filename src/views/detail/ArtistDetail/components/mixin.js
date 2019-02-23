export default {
  props:{
    id:{
      require:true
    },
  },
  watch:{
    id(val){
      if(this.search()){
        this.search()
      }
    }
  }
}
