// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueToast from 'vue2-toast'
import 'vue2-toast/lib/toast.css'
import { Message } from 'element-ui'  // 消息提示

Vue.prototype.$Message = Message;

// 引入状态管理模型
import store from './store'

// 将弹框应用到Vue程序中
Vue.use(VueToast,{
	type:"center"
})

// 配置管理状态模型
Vue.use(Vuex)

// 阻止启动生产消息，常用作指令。不显示警告
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store:store,   //状态管理
  template: '<App/>'
})
