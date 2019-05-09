import * as type from './mutations_types.js';
import * as func from '../function';

export default {
    [type.ADDEVENT](states,obj)
    {
        states.count++;  //增加总数
        obj.items.id = states.count;
        states.event.unshift(obj.items);  //追加备忘录
        func.local.set(states);  //将备忘录存放到本地存储
    }
}