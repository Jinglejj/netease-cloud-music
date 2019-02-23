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

export const searchSongs=(keyword,type=1,limit=30,offset=0)=>{
  return get(`${BASE_URL}/search?timestamp=${new Date().getTime()}&keywords=${keyword}&type=${type}&limit=${limit}&offset=${offset}`)
};

export const searchHot=()=>{
  return get(`${BASE_URL}/search/hot?timestamp=${new Date().getTime()}`)
}

export const searchSuggest=(keywords)=>{
  return get(`${BASE_URL}/search/suggest?keywords=${keywords}&type=mobile&timestamp=${new Date().getTime()}`)
}

export const getMusicDetail=(id)=>{
  return get(`${BASE_URL}/song/detail/?ids=${id}`)
}

export const getMusicUrl=(id)=>{
  return get(`${BASE_URL}/song/url?id=${id}`)
}

export const getNewSongs=()=>{
  return get(`${BASE_URL}/personalized/newsong`)
}


