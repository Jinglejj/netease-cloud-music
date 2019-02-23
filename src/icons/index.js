import Vue from 'vue'
import SvgIcon from './SvgIcon'// svg组件

// 注册全局组件
Vue.component('svg-icon', SvgIcon)
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
