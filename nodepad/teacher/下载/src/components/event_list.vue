<template>
  <div class="event-content">

    <!-- 未完成 -->
    <div class="event-tab" @click="changeCollapse(0,$event)">
      未完成<span :class="{'close-span':!collapse[0].show}"></span>
    </div>
    <div class="event-box" :style="{'height':'auto','display':'block'}">
      <ul>
        <li class="event-list" v-for="value in getToDo" :key="value.id">
          <input type="checkbox" :key="value.id" @click="moveToDone(value.id)" />
          <div>{{value.content}}</div>
          <button class="cancel-btn" @click="moveCancel(value.id)">取消</button>
        </li>
      </ul>
    </div>

    <!-- 已完成 -->
    <div class="event-tab" @click="changeCollapse(1,$event)">
      已完成<span :class="{'close-span':!collapse[1].show}"></span>
    </div>
    <div class="event-box" :style="{'height':'auto','display':'block'}">
      <ul>
        <li class="event-list" v-for="value in getDone" :key="value.id">
          <input checked type="checkbox" :key="value.id" @click="moveToDo(value.id)" />
          <div>{{value.content}}</div>
          <span class="event-time">{{value.time}}</span>
        </li>
      </ul>
    </div>


    <!-- 已取消 -->
    <div class="event-tab" @click="changeCollapse(2,$event)">
      已取消<span :class="{'close-span':!collapse[2].show}"></span>
    </div>
    <div class="event-box" :style="{'height':'auto','display':'block'}">
      <ul>
        <li class="event-list" v-for="value in getCancel" :key="value.id">
          <div class="event-delete">{{value.content}}</div>
          <button class="cancel-btn" @click="moveToDo(value.id)">恢复</button>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
export default {
  data(){
    return {
      collapse:[
        {
            show: true,
        },
        {
            show: true,
        },
        {
            show: true,
        }
      ]
    }
  },
  computed:{
    getToDo(){  //未完成
      return this.$store.getters.getToDo;
    },
    getDone()  //已完成
    {
      return this.$store.getters.getDone;
    },
    getCancel()  //已取消
    {
      return this.$store.getters.getCancel;
    }
  },
  methods:{
    changeCollapse(current,event)
    {
      //拿到当前选项卡的show开启还是关闭属性
      const show = this.collapse[current].show;
      if(show)
      {
        this.closeCollapse(event);  //关闭
      }else{
         this.openCollapse(event);  //打开
      }

      this.collapse[current].show = !show;
    },
    closeCollapse(event)  //关闭
    {
      let element =event.currentTarget.nextElementSibling;
      let ul = element.getElementsByTagName('ul')[0];
      element.style.height = ul.offsetHeight+"px";

      setTimeout(function(){
        element.style.height = "0px";
        setTimeout(function(){
          element.style.display = "none";
        },300)
      },10)

    },
    openCollapse(event)
    {
      let element =event.currentTarget.nextElementSibling;
      let ul = element.getElementsByTagName('ul')[0];
      element.style.height = ul.offsetHeight+"px";
      element.style.display = 'block';

      setTimeout(function(){
        element.style.height = "auto";
      },300)
    },
    moveToDone(id)  //已完成事项
    {
      this.$store.dispatch('eventdone',id);
    },
    moveToDo(id)  //撤销已完成回归未完成
    {
      this.$store.dispatch('eventtodo',id);
    },
    moveCancel(id)  //取消
    {
       this.$store.dispatch('eventcancel',id);
    }
  }
}
</script>








<style lang="scss" rel="stylesheet/scss">
    .event-content {
        .event-tab {
            position: relative;
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
            border-bottom: 1px solid #fff;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            span {
                position: absolute;
                right: 20px;
                top: 15px;
                width: 10px;
                height: 10px;
                content: '';
                border: {
                    top: 2px solid #fff;
                    right: 2px solid #fff;
                }
                transform: rotate(135deg);
                transition: transform .3s;
                &.close-span {
                    transform: rotate(45deg);
                }
            }
        }
        .event-box {
            list-style: none;
            overflow: hidden;
            border: {
                left: 1px solid #eee;
                right: 1px solid #eee;
            }
            transition: height .3s;
            .event-list {
                position: relative;
                min-height: 44px;
                line-height: 25px;
                padding: 10px 100px 10px 50px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                color: #373e40;
                input[type=checkbox] {
                    position: absolute;
                    left: 15px;
                    top: 12px;
                    width: 20px;
                    height: 20px;
                }
                .cancel-btn {
                    position: absolute;
                    right: 10px;
                    top: 7px;
                    width: 50px;
                    height: 30px;
                    line-height: 30px;
                    padding: 0;
                    background: #fff;
                    border: 1px solid #c0ccda;
                    color: #666;
                    font-size: 12px;
                }
                .event-time {
                    position: absolute;
                    right: 10px;
                    top: 0;
                    line-height: 44px;
                    font-size: 12px;
                    color: #aaa;
                }
                .event-delete {
                    text-decoration: line-through;
                    color: #999;
                }
            }
        }
    }
</style>