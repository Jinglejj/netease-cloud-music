import request from './request';
const BASE_URL='http://www.yu6666.top:8080';

const get=(url,config)=>new Promise((resolve,reject)=>{
  request.get(url,config).then(res=>{
    if(res.data.code===200){
      resolve(res.data);
    }else{
      reject(res)
    }
  })
});

export const getTopArtists=(limit=30,offset=0)=>{
  return get(`${BASE_URL}/top/artists?offset=${offset}&limit=${limit}`)
}

export const findArtists=(cat=1001,initial='',limit=30,offset=0)=>{
  return get(`${BASE_URL}/artist/list?cat=${cat}&limit=${limit}&offset=${offset}&initial=${initial}`);
}

export const getArtistSongs=(id)=>{
  return get(`${BASE_URL}/artists?id=${id}`)
}

export const getArtistMv=(id)=>{
  return get(`${BASE_URL}/artist/mv?id=${id}`)
}

export const getArtistAlbum=(id,limit=30)=>{
  return get(`${BASE_URL}/artist/album?id=${id}&limit=${limit}`)
}

export const getArtistDesc=(id)=>{
  return get(`${BASE_URL}/artist/desc?id=${id}`)
}

export const getSimiArtist=(id)=>{
  return get(`${BASE_URL}/simi/artist?id=${id}`)
}

