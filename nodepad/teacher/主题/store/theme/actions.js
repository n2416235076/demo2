export default {
    //内置的提交对象
    switch_theme:({commit},color) => {

        //在action中获取到了动作 提交给mutations让他来修改状态
        //SWITCHTHEME mutations中的函数，参数传一个对象
        commit('SWITCHTHEME',{theme:color});
    }
}