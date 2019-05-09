export default {
	// 内置的提交对象 commit触发状态更改
	switch_theme:({commit},color) => {
		//在action中获取到了动作 提交给mutations让他来修改状态
		//调用SWITCHTHEME函数，并把color存到对象里进行传值  方便日后维护
		commit('SWITCHTHEME',{theme:color});
	}
}