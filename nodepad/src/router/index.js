import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //路径
      name: 'Home', //路由名称，仅在浏览器url地址起作用
      component: Home //组件
    }
  ]
})
