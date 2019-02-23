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


export const getMvUrl=(id)=>{
    return get(`${BASE_URL}/mv/url?id=${id}`)
};

export const getMvDetail=(id)=>{
    return get(`${BASE_URL}/mv/detail?mvid=${id}`)
};
