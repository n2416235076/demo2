export default {
    getEventList(state)
    {
        // 返回所有的备忘录内容
        return state.event;
    },
    getToDo(state){
        // filter();js数组迭代器方法，返回数组中符合条件的数组
        return state.event.filter(function(item){
            if(item.type === 1)
            {
                //未完成  上传
                return item;
            }
        });
    },
    getDone(state)
    {
        //筛选已完成
        return state.event.filter(function(item){
            if(item.type === 2)
            {
                return item;
            }
        });
    },
    getCancel(state)
    {
        //筛选出取消
        return state.event.filter(function(item){
            if(item.type === 3)
            {
                return item;
            }
        })
    }
}