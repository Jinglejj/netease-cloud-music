import Vue from 'vue'

const artistName=(arr)=>{
  if(arr.length===0){
    return '未知歌手';
  }
  const nameList=arr.map(item=>item.name);
  return nameList.join('/')
};


Vue.filter('artistName',artistName);


