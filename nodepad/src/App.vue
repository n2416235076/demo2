<template>
  <div id="app" :class="[getTheme]">
    <n-header @tools="changePages"></n-header>
    <section class="container" :class="{'hide':table}">

      <n-add></n-add>
      <n-list></n-list>

      <n-sidebar :is-show="tools"
                 @opentheme="theme = true;tools = false"
                 @opentable="table = true;tools = false"
                 @cleardialog="clearData"
      ></n-sidebar>
    </section>

    <n-theme :is-show="theme"></n-theme>
        
    <n-table @deldialog="delData" @close="table = false" :is-show="table" ></n-table>
    <transition name="dialog">
      <n-dialog v-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
    </transition>  
        
    <n-footer></n-footer>
  </div>
</template>

<script>
  import nHeader from './components/header.vue' //头部
  import nFooter from './components/footer.vue' //底部
  import nSidebar from './components/sidebar.vue' //标题
  import nTheme from './components/theme.vue' //弹出栏
  import nAdd from './components/event_add.vue' //添加
  import nList from './components/event_list.vue' //列表
  import nTable from './components/event_table.vue'//编辑
  import nDialog from './components/dialog.vue'//删除、上传
  export default {
    components:{ //组件集
      nHeader,
      nFooter,
      nSidebar,
      nTheme,
      nAdd,
      nList,
      nTable,
      nDialog
    },
    data(){
      return {
        tools:false,//默认是否打开侧滑菜单
        table:false,//div容器是否显示
        theme:false,//颜色主题组件是否显示
        dialog:false,//删除组件
        dialog_type:false,//删除类型
        tips:'',//删除提示信息
        del_info:{
          index:0,
          id:0
        }
      } 
    },
    computed:{
      // 更改样式
      getTheme(){
        // 调用vuex中getters.js里面的getTheme函数，接收状态值
        // 本地的getTheme函数调用getters.js中的getTheme函数，获取state.theme
        return this.$store.getters.getTheme;
      }
    },
    methods:{
      changePages(){
        if(this.table){
          this.table = !this.table;
        }else if(this.theme){
          this.theme = !this.theme;
        }else{
          this.tools = !this.tools;
        }
      },
      delData(index,id){
        // 删除数据
        this.dialog = true;
        this.dialog_type = 'del';
        this.tips = '删除后无法恢复，确认删除吗？';
        this.del_info = {
          id:id,
          index:index
        }
      },
      clearData(){
        // 清空数据
        this.tools = false;
        this.dialog = true;
        this.dialog_type = 'clear',
        this.tips = '清空后无法恢复，确定清空吗？';
      },
      sureDialog(){
        var self = this;
        switch(self.dialog_type){
          case 'clear':
            self.$store.dispatch('clearevent');
            self.$toast('清空数据成功');
            break;
          case 'del':
            console.log(self.del_info);
            self.$store.dispatch('delevent',self.del_info);
            self.$toast('删除成功');
            break;
        }
        this.dialog = false;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" src="../static/theme.scss"></style>
<style lang="scss" rel="stylesheet/scss">
    html,body,ul,li,input,p{
        margin:0;
        padding:0;
    }
    body{
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
    }
    input,button{
        -webkit-tap-highlight-color: transparent;
    }
    input[type=text]{
        -webkit-appearance: none;
    }
    button{
        padding:7px 0;
        outline: none;
        text-align: center;
        border-radius: 4px;
        box-sizing: border-box;
        font:{
            size:inherit;
            family: inherit;
        }
        cursor: pointer;
    }
    html,body{
        height: 100%;
    }
    ::-webkit-scrollbar{
        width: 0;
    }
    body,#app{
        width:100%;
        overflow-x: hidden;
    }
    #app{
        height: 100%;
        padding-bottom: 60px;
        box-sizing: border-box;
    }

    ul{
        list-style: none;
    }
    .container{
        width:100%;
        padding: 0 10px;
        max-width:800px;
        margin:auto;
        box-sizing: border-box;
        &.hide{
            display: none;
        }
    }
    .dialog-enter-active, .dialog-leave-active {
        transition: opacity .3s;
    }
    .dialog-enter, .dialog-leave-to{
        opacity: 0;
    }
</style>