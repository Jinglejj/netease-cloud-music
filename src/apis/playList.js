import request from './request';
const BASE_URL='http://www.yu6666.top:8080';

const get=(url,config)=>new Promise((resolve,reject)=>{
  request.get(url,config).then(res=>{
    if(res.data.code===200){
      resolve(res.data);
    }else{
      reject(res)
    }
  }).catch(err=>{
    console.log(err)
  })
});


export const getTopPlayList=(limit=23,offset=0,cat='全部',order='hot')=>{
  return get(`${BASE_URL}/top/playList?limit=${limit}&cat=${cat}&offset=${offset}&order=${order}`);
}

export const getHighqualityPlayList=(limit=1,cat='全部')=>{
  return get(`${BASE_URL}/top/playlist/highquality?limit=${limit}&cat=${cat}`);
}

export const getNextHeightPlayList=(limit=20,before,cat='全部')=>{
  return get(`${BASE_URL}/top/playlist/highquality?limit=${limit}&cat=${cat}&before=${before}`);
}


export const getPlayListHotTags=()=>{
  return get(`${BASE_URL}/playlist/hot`)
}

export const getPlayListDetail=(id)=>{
  return get(`${BASE_URL}/playlist/detail?id=${id}`);
}
