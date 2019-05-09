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


    <!--切换主题组件-->
    <n-theme :is-show="theme" @close="theme = false"></n-theme>

    <!-- 编辑数据，筛选组件 -->
    <n-table @deldialog="delData" :is-show="table" @close="table = false"></n-table>


    <transition name="dialog">
        <n-dialog v-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
    </transition>

    <n-footer></n-footer>
  </div>
</template>


<script>
import nHeader from './components/header.vue'
import nFooter from './components/footer.vue'
import nSidebar from './components/sidebar.vue' //侧滑菜单
import nTheme from './components/theme.vue'  //主题选择
import nAdd from "./components/event_add.vue"  //添加组件
import nList from './components/event_list.vue' //列表组件
import nTable from './components/event_table.vue' //编辑数据组件
import nDialog from './components/dialog.vue';  //删除和上传的两个弹框组件

export default {
  components:{
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
      table:false, //div容器是否显示
      theme:false, //颜色主题组件是否显示
      dialog: false, //删除组件
      dialog_type: '',  //删除类型
      tips: '',
      del_info: {
          index: 0,
          id: 0
      }

    }
  },
  computed:{
    getTheme(){ // 获取主题色
        return this.$store.getters.getTheme;
    }
  },
  methods:{
    changePages(){
      if(this.table)
      {
        this.table = !this.table
      }else if(this.theme){
        this.theme = !this.theme   //切换主题元素的显示和隐藏
      }else{
        this.tools = !this.tools   //侧边栏显示还是隐藏
      }
    },
    delData(index,id)
    {
      //删除数据
      this.dialog = true;
      this.dialog_type = "del";
      this.tips = '删除后无法恢复，确认删除吗？';
      this.del_info = {
        id:id,
        index:index
      }

    },
    sureDialog()
    {
      var self = this;
      switch(self.dialog_type)
      {
        case "clear":   //清空
          self.$store.dispatch('clearevent');
          self.$toast('清空数据成功');
          break;
        case "del":   //删除
          self.$store.dispatch('delevent',self.del_info);
          self.$toast('删除成功');
          break;
      }

      this.dialog = false;
    },
    clearData()
    {
      //清空数据
      this.tools = false;
      this.dialog = true;
      this.dialog_type = 'clear';
      this.tips = '清空后无法恢复，确认清空吗？';
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