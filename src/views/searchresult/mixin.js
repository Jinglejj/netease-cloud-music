import {searchSongs} from "@/apis/api";
export default {
  props:{
    keyword:{
      type:String,
      require:true
    }
  },
  watch:{
    keyword(val){
      this.search();
    }
  },
  data(){
    return{
      count:-1
    }
  },
  methods:{
    getNextPage() {
      if(this.result.length>=this.count){
        return;
      }
      const offset = parseInt(this.result.length / 30);
      searchSongs(this.keyword, this.type, 30, offset).then(res => {
        this.result=this.result.concat(res.result[this.name]);
      }).catch(err => {
        console.log(err);
      });
    },
  },
  mounted(){
    this.search();
  }
}
