// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Vuex from 'vuex'
import './assets/css/app.css'

import moment from 'moment' //日期格式化
import axios from 'axios'
import {HTTP,companyType} from  './utils/common'
import Login from './utils/login'

axios.defaults.withCredentials=true;
Vue.use(Vuex)
Vue.use(Login)
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.Http = HTTP;
Vue.prototype.companyType = companyType;
Vue.use(ElementUI)

//格式化日期过滤器
Vue.filter('formatData',function(value,formatString){
	formatString = formatString || 'YYYY-MM-DD';
	return moment(value).format(formatString);
})


const store = new Vuex.Store({
	state:{
		token:localStorage.token,
	},
	mutations:{
		token(state,payload){
			state.token = payload;
		},
	},
	actions:{
			
	},
})

// router.beforeEach((to, from, next) => {
// 	console.log( to.meta.title)
//   window.document.title = to.meta.title;
//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
window.router = router;

