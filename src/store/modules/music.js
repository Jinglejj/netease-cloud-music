import {getMusicDetail, getMusicUrl,getNewSongs} from "@/apis/api";

function getMusic(id) {
  return new Promise((resolve,reject)=>{
    let result = {
      album:{picUrl:'',},
      artists:[{name:''}],
      name:''
    };
    getMusicUrl(id).then(res => {
      result=Object.assign(result,res.data[0]);
      return result;
    }).then(result=>{
      getMusicDetail(id).then(response => {
        const res=response;
        result.artists=res.songs[0].ar;
        result.album=res.songs[0].al;
        result.name=res.songs[0].name;
        // result.url=`https://music.163.com/song/media/outer/url?id=${result.id}.mp3`;
        resolve(result);
      });
    }).catch(err => {
      console.log(err);
    });
  })
}

const music = {
  state: {
    isPlay: false,
    music: {
      name:'未知歌曲',
      url:'123',
      artists:[{
        name:'未知作家'
      }],
      album: {
        picUrl: ''
      }
    },
    musicImage:'',
    currentIndex: 0,
    songsList: [],
    status: ''
  },
  mutations: {
    SET_MUSIC(state, music) {
      state.music = music;
    },
    SET_SONGS_LIST(state, songsList) {
      state.songsList = songsList;
    },
    SET_CURRENT_INDEX(state, index) {
      state.currentIndex = index;
    },
    SET_ISPLAY(state, isPlay) {
      state.isPlay = isPlay;
    }
  },
  actions: {
    playMusic({commit, state}) {
      if (state.music !== []) {
        commit('SET_ISPLAY', !state.isPlay);
      }
    },
    playList({commit, dispatch},list){
      commit('SET_SONGS_LIST',list);
      dispatch('play',list[0].id);
    },
    play({commit, state}, id) {
      getMusic(id).then(res=>{
        if(state.songsList.findIndex(item=>item.id===id)===-1){
          state.songsList.unshift(res);
          commit('SET_SONGS_LIST',state.songsList);
        }
        commit('SET_MUSIC', res);
      }).catch(err=>{
        console.log(err)
      })
    },
    next({commit, state}) {
      if (state.music === []) {
        return;
      }
      let index = state.songsList.findIndex(item=>item.id===state.music.id);
      if(index===-1){
        index=0
      }else{
        index = index === state.songsList.length - 1 ? 0 : ++index;
      }
      getMusic(state.songsList[index].id).then(res=>{
        commit('SET_MUSIC', res);
        commit('SET_ISPLAY', true);
      }).catch(err=>{
        console.log(err)
      })
    },
    previous({commit, state}) {
      if (state.music === []) {
        return;
      }
      let index = state.songsList.findIndex(item=>item.id===state.music.id);
      if(index===-1){
        index=0
      }else{
        index = index === 0 ?  state.songsList.length - 1 : --index;
      }
      getMusic(state.songsList[index].id).then(res=>{
        commit('SET_MUSIC', res);
        commit('SET_ISPLAY', true);
      }).catch(err=>{
        console.log(err)
      })
    },
    getNewSongsList({commit}){
      getNewSongs().then(res=>{
        commit('SET_SONGS_LIST',res.result);
      }).catch(err=>{
        console.log(err);
      });
    }
  }
};


export default music;
