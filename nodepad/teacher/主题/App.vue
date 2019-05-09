<template>
  <div id="app" :class="[getTheme]">
    <n-header @tools="changePages"></n-header>
    <section class="container" :class="{'hide':table}">
      <n-sidebar :is-show="tools"
                 @opentheme="theme = true;tools = false"
      ></n-sidebar>
    </section>


    <!--切换主题组件-->
    <n-theme :is-show="theme" @close="theme = false"></n-theme>


    <n-footer></n-footer>
  </div>
</template>


<script>
import nHeader from './components/header.vue'
import nFooter from './components/footer.vue'
import nSidebar from './components/sidebar.vue' //侧滑菜单
import nTheme from './components/theme.vue'  //主题选择
export default {
  components:{
    nHeader,
    nFooter,
    nSidebar,
    nTheme
  },
  data(){
    return {
      tools:false,//默认是否打开侧滑菜单
      table:false, //div容器是否显示
      theme:false, //颜色主题组件是否显示
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