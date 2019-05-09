import * as type from './mutations_types.js';
import * as func from '../function';

export default {
    //添加未完成
    [type.ADDEVENT](states,obj)
    {
        states.count++;  //增加总数
        obj.items.id = states.count;
        states.event.unshift(obj.items);  //追加备忘录
        func.local.set(states);  //将备忘录存放到本地存储
    },

    //已完成
    [type.EVENTDONE](states,obj)
    {
        for(var i=0;i<states.event.length;i++)
        {
            //找到标记为已完成的那条记录
            if(states.event[i].id == obj.id)
            {
                states.event[i].type = 2; //修改为已完成
                states.event[i].time = func.getDate();
                var item = states.event[i];
                //删除旧的，在添加新的
                states.event.splice(i,1);
            }
        }
        //添加新的结果进去
        states.event.unshift(item);
        //更新本地存储
        func.local.set(states);
    },

    //撤销已完成
    [type.EVENTTODO](states,obj)
    {
        //所有事件进行循环筛选
        for(var i=0;i<states.event.length;i++)
        {
            //找到标记为已完成的那条记录
            if(states.event[i].id == obj.id)
            {
                states.event[i].type = 1; //修改为未完成
                states.event[i].time = "";
                var item = states.event[i];
                //删除旧的，在添加新的
                states.event.splice(i,1);
            }
        }
        //添加新的结果进去
        states.event.unshift(item);
        //更新本地存储
        func.local.set(states);
    },


    //取消
    [type.EVENTCANCEL](states,obj){
        for(var i=0;i<states.event.length;i++)
        {
            //找到标记为已完成的那条记录
            if(states.event[i].id == obj.id)
            {
                states.event[i].type = 3; //修改为已完成
                var item = states.event[i];
                //删除旧的，在添加新的
                states.event.splice(i,1);
            }
        }
        //添加新的结果进去
        states.event.unshift(item);
        //更新本地存储
        func.local.set(states);
    },


    //编辑数据
    [type.EDITEVENT](states,info)
    {
        if(states.event[info.index].id === info.id)
        {
            states.event[info.index].content = info.content;
        }else{
            states.event.filter(function(item){
                if(item.id === info.id)
                {
                    item.content = info.content
                }
            });
        }

        //修改完数据后，更新一下缓存部分
        func.local.set(states);
    },


    //删除数据
    [type.DELEVENT](states,info){
        if(states.event[info.index].id === info.id)
        {
            states.event.splice(info.index,1);
        }else{
            states.event.filter(function(value,index){
                if(value.id === info.id)
                {
                    states.event.splice(index,1);
                }
            });
        }
        
        //删除元素后更新一下缓存
        func.local.set(states);
    },


    //清空数据
    [type.CLEAREVENT](states){
        states.event = [];  //清空数据

        //更新缓存
        func.local.clear();
    }

    
}