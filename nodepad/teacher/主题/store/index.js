import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入状态，默认找到 ./theme/index.js
import theme from './theme'

//创建一个状态管理集  
export default new Vuex.Store({
	// 模块的
    modules:{
        theme
    }
})