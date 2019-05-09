import Vue from 'vue'
import mint from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import './assets/css/neat-min.css'
import './assets/css/style.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(mint)

// 阻止启动生产消息，常用作指令。去掉警告
Vue.config.productionTip = false

// 加载第三方插件
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
	el:'#app',
	router,
	store,
	components:{App},
	template:'<App/>'
});