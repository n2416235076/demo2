// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueToast from 'vue2-toast'
import 'vue2-toast/lib/toast.css'
import store from './store'

//将弹框应用到Vue程序中
Vue.use(VueToast,{
  type: 'center'
})

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store: store,
  template: '<App/>'
})
