const files=require.context('.',true,/\.js$/);  //返回匹配到的.js文件的数组

let configRouters=[];
files.keys().forEach(key=>{
  if(key === './index.js'){
    return;
  }
  configRouters=configRouters.concat(files(key).default); //读取文件中的default
});
export default configRouters  //抛出一个Vue-Router期待的数据结构的数组
