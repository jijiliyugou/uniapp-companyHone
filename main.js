// #ifdef H5
import '@/common/js/pc.js'
// #endif
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore);

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare);

// 引入md5
import md5Libs from "uview-ui/libs/function/md5";
Vue.prototype.$md5 = md5Libs.md5

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/js/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/js/http.api.js';
Vue.use(httpApi, app);

app.$mount()
