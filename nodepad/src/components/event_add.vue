<template>
  <div class="event-add">
    <input type="text" class="n-input" v-model="content" @keyup.enter="submit" placeholder="待办事项" />
    <button class="add-btn" @click="submit">提交</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        content:'' //返回input框的value值
      }
    },
    methods:{
      submit(){ //点击事件
        let self = this,
            params = {
              id:0, //事项id
              type:1, //未完成
              content:'',//事项内容
              time:'' //事项完成时间
            }

        // 去掉内容两端的空白字符
        self.content = self.content.trim();

        // 判断content内容是否为空
        if(self.content){
          // 获取事项名称
          params.content = self.content;
          // 调用vuex里面定义的状态，dispatch 提交动作
          self.$store.dispatch('addevent',params);
          // 把input框value清空
          self.content = '';
          // $toast() 弹框
          self.$toast('添加成功');
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    .event-add{
        position: relative;
        padding:30px 90px 30px 0;
        font-size: 16px;
        .n-input{
            width:100%;
            height:40px;
            padding:7px 10px;
            line-height: 26px;
            border:1px solid #c0ccda;
            border-radius:4px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            box-sizing: border-box;
            font-size:inherit;
            &:focus {
                outline: none;
            }
        }
        .add-btn{
            position: absolute;
            right:0;
            top:30px;
            width:80px;
            height:40px;
            line-height: 26px;
            color: #fff;
            /*transition: background .3s ease-in;*/
        }
    }
</style>
