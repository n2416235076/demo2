import Vue from 'vue'
import Router from 'vue-router'
import NewSongs from '@/components/NewSongs.vue'
import Rank from '@/components/Rank.vue'
import RankInfo from '@/components/RankInfo.vue'
import Plist from '@/components/Plist.vue'
import PlistInfo from '@/components/PlistInfo.vue'
import Singer from '@/components/Singer.vue'
import SingerList from '@/components/SingerList.vue'
import SingerInfo from '@/components/SingerInfo.vue'
import Search from '@/components/Search.vue'

// @/...设置路径别名

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect:"/" //重定向
    },
    {
      //新歌
      path:"/newSongs",
      component:NewSongs,
      name:"NewSongs",
      alias: '/'
    },
    {
      //排行
      path:"/rank",
      component:Rank,
    },
    {
      //排行详情页
      path:"/rank/info/:id",
      component:RankInfo
    },
    {
      // 歌单
      path:"/plist",
      component:Plist
    },
    {
      // 歌单详情
      path:"/plist/info/:id",
      component:PlistInfo
    },
    {
      //歌手类型
      path:"/singer",
      component:Singer
    },
    {
      //歌手列表
      path:"/singer/list/:id",
      component:SingerList
    },
    {
      //歌手歌单页面
      path:"/singer/info/:id",
      component:SingerInfo
    },
    {
      // 搜索
      path:"/search",
      component:Search
    }
  ]
})
