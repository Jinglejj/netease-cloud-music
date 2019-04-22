import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './icons'
import './filters/filters'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import '@/styles/index.scss';
Vue.use(ElementUI);
import 'vue-dplayer/dist/vue-dplayer.css';
import VueAPlayer from 'yujinjiang-vue-aplayer'
VueAPlayer.disableVersionBadge = true;
import './utils/rgbaster';
Vue.config.productionTip = false;
import waves from './directive/waves/waves'
Vue.directive('waves', waves);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');