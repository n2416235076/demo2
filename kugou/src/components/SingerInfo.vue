<template>
	<div class="rank-info-content plist-info">
		<!-- 背景 -->
		<div class="rank-banner-wrap" :style="{backgroundImage: `url(${imgurl})`}"></div>

		<!-- 歌手介绍详细 -->
		<div class="plist-desp container">
			<p class="plist-desp-p" :class="{'plist-desp-hide': hideDesc }">{{desc}}</p>
			<img src="../assets/images/close_icon.png" @click="toggleDesc" class="plist-desp-icon" v-if="hideDesc">
			<img src="../assets/images/open_icon.png" @click="toggleDesc" class="plist-desp-icon" v-else>
		</div>
		<div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>

		<!-- 歌单列表 -->
		<div class="rank-info-list">
			<mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
				<img src="../assets/images/download_icon.png" width="20" height="20">
			</mt-cell>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	import { PLAY_AUDIO } from '../mixins'
	export default{
		mixins: [PLAY_AUDIO],
		data(){
			return {
				imgurl: '',
		        songList: [],
		        updateTime: '',
		        desc: '',
		        hideDesc: true,
		        opacity: 0
			}
		},
		//设置路由的钩子 
		beforeRouteEnter(to,from,next){
			//当通过路由的时候一进来执行的
			//走进钩子后执行的下一步操作
			next(vm => {

				//显示排行的头部, rankHead.vue
				vm.$store.commit('showHead',true);

				vm.getList();  //调用接口获取排行数据

				//窗口绑定滚动条事件
				window.onscroll = () => {
					vm.opacity = window.pageYOffset / 250   //头部透明度
					vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
				}
			})
		},
		//当离开这个界面的时候触发的路由钩子
    	beforeRouteLeave(to,form,next){
      		//头部隐藏 滚动条事件清除，执行让他离开了
      		this.$store.commit('showHead', false)
			window.onscroll = null
			next() 
		},
		methods:{
			getList(){
				//提示窗口
        		Indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
        		});

        		// /rank/info/:id
		        var infoID = this.$route.params.id;
		        this.$http.get(`/proxy/singer/info/${infoID}&json=true`).then(({data}) => {
		        	Indicator.close()
		        	// console.log(data);return false;
          			const info = data.info
					const songList = data.songs.list
					this.imgurl = info.imgurl.replace('{size}', '400')
			        this.desc = info.intro
			        this.songList = songList
			        this.$store.commit('setHeadTitle', info.singername)

		        })
			},
			toggleDesc(){
				this.hideDesc = !this.hideDesc
			}
		}
	}
</script>

<style scoped>
  	.rank-banner-wrap {
    	height: 250px;
  	}
</style>