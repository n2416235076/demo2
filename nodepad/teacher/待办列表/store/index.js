import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import theme from './theme'
import event from './event'

//创建一个状态管理集  模块的
export default new Vuex.Store({
    modules:{
        theme,
        event
    }
})