export default {
    addevent:({commit},obj) => {
        //提交给mutations来修改状态
        commit('ADDEVENT',{items:obj});
    }
}