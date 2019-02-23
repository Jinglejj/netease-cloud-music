import {getMvUrl} from "../apis/mv";

export default {
    methods: {
        getArtistDetail(id) {
            this.$router.push({path: `/artistDetail/${id}`, name: 'artistDetail', params: {id}});
        },
        getPlayListDetail(id) {
            this.$router.push({path: `playListDetail/${id}`, name: 'playListDetail', params: {id}});
        },
        getMvDetail(id){
            //判断当前是否在播放音乐
            if(this.$store.getters.isPlay){
                this.$store.commit('SET_ISPLAY',false);
            }
            //获取mv的url作为参数传递给mvDetail tip：在mvDeatil中获取url的话无法达到自动播放的效果
            getMvUrl(id).then(res=>{
                const {url} =res.data;
                this.$router.push({path: `mvDetail/${id}`, name: 'mvDetail', params: {id,url}});
            }).catch(err=>{
                console.log(err);
            });
        }
    }
}
