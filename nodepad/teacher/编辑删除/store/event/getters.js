export default {
    getEventList(state)
    {
        return state.event;
    },
    getToDo(state){
        return state.event.filter(function(item){
            if(item.type === 1)
            {
                //未完成
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