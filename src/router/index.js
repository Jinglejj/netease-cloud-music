import Vue from 'vue'
import Router from 'vue-router'
import RouterConfig from './modules' //引入业务逻辑模块 ps:默认为文件名为index的js文件
import CommonConfig from './common' //引入通用模块

Vue.use(Router);

const router=new Router({
  routes: RouterConfig.concat(CommonConfig)
})

// router.beforeResolve((to,from,next)=>{
// })

export default router
