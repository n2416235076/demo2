import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入状态，默认找到 ./theme/index.js
import theme from './theme'
import event from './event'

// 创建状态管理集
export default new Vuex.Store({
	// 模块
	modules:{
		theme,
		event
	}
})
