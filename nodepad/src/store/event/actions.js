export default{
	addevent:({commit},obj) => { //未完成  上传
		commit('ADDEVENT',{items:obj});
	},
	eventdone:({commit},id) => {  //已完成
        //提交给mutaions来修改状态
        commit('EVENTDONE',{id:id})
    },
    eventtodo:({commit},id) => {  //回归未完成
        commit('EVENTTODO',{id:id})
    },
    eventcancel:({commit},id) => {  //取消
        commit('EVENTCANCEL',{id:id});
    },
    editevent:({commit},info) => { // 编辑数据
        commit('EDITEVENT',info);
    },
    delevent:({commit},info) => { //删除数据
        commit('DELEVENT',info);
    },
    clearevent:({commit},info) => { //清空数据
        commit('CLEAREVENT',info);
    }
}