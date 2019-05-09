
import * as func from '../function';

export default {
    //给mutaions内置一个state的状态对象
    SWITCHTHEME(states,obj){
        states.theme = obj.theme;  //修改状态
        func.theme_local.set(states); //设置本地存储
    }
}