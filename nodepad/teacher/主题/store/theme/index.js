import * as func from "../function"
import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

//获取当前主题颜色值 如果没有就默认一个蓝色的对象
const state = func.theme_local.get() || {
    theme: 'blue'
}

export default {
    state,
    actions,
    mutations,
    getters
}