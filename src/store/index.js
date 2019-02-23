import Vue from 'vue'
import Vuex from 'vuex'
import music from './modules/music'
import getters from './getter'

Vue.use(Vuex);

const store=new Vuex.Store({
  modules:{
    music
  },
  getters
});

export default store;

