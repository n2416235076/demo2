<template>
	<div class="rank-info-content">
		<div class="rank-banner-wrap" :style="{backgroundImage:`url(${imgurl})`}">
			<div class="rank-status container">
				<p>上次更新时间：{{getToday()}}</p>
			</div>
		</div>

		<div class="rank-info-list">
			<mt-cell v-for="(item,index) in songList" :key="index" :title="item.filename" @click.native="playAudio(index)">
				<span class="rank-index" :class="{'rank-list-good' : index<3, 'rank-list-first' : index==0, 'rank-list-second' : index==1, 'rank-list-third' : index==2}">{{index + 1}}</span>
	          	<img src="../assets/images/download_icon.png" width="20" height="20">
	        </mt-cell>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'    // ui框架
	import { PLAY_AUDIO } from '../mixins' // 混入策略
	export default{
		mixins: [PLAY_AUDIO],
		data(){
			return {
				imgurl: '',
				songList: [],
				updateTime: '',
				opacity: 0
			}
		},

		// 设置路由钩子  进来
		beforeRouteEnter(to,from,next){
			//当通过路由的时候一进来执行的
      		//走进钩子后执行的下一步操作
      		next((vm) => {
      			// 显示排行的头部 rankhead.vue
      			vm.$store.commit('showHead',true);

      			// 调用接口获取排行数据
      			vm.getList();

      			// 窗口绑定滚动条事件
      			window.onscroll = () => {
      				vm.opacity = window.pageYOffset / 250  //设置头部透明度
      				vm.$store.commit('setHeadStyle',{background:`rgba(43,162,251,${vm.opacity})`})
      			}
      		})
		},

		// 退出路由
		beforeRouteLeave(to,from,next){
			// 隐藏头部，清除滚动条事件，直接执行通过离开
			this.$store.commit('showHead',false);
			window.onscroll = null;
			next();
		},

		// vue 钩子
		mounted(){
			// 窗口绑定滚动条事件
  			window.onscroll = () => {
  				vm.opacity = window.pageYOffset / 250  //设置头部透明度
  				vm.$store.commit('setHeadStyle',{background:`rgba(43,162,251,${vm.opacity})`})
  			}
		},

		methods:{
			getList(){
				// 提示窗口
				Indicator.open({
					text:'加载中',
					spinnerType:'snake'
				});

				// /rank/info/:id 获取路由地址
				var infoID = this.$route.params.id;

				// get方法异步请求数据
				this.$http.get(`/proxy/rank/info/?rankid=${infoID}&page=1&json=true`).then(({data}) => {
					// 隐藏loading加载
					Indicator.close();
					const {info, songs} = data
					const {banner7url, rankname} = info
					const {list} = songs
					this.imgurl = banner7url.replace('{size}', '400')
					this.songList = list
					this.$store.commit('setHeadTitle', rankname)
				})
			},
			getToday(){
				// 日期方法
				const time = new Date();
				const year = time.getFullYear();
				let month = time.getMonth() + 1;
				let date = time.getDate();
				if(month < 10) month = '0' + month;
				if(date < 10) date = '0' + date;
				return `${year}-${month}-${date}`;
			}
		}
	}
</script>

<style>
	.rank-list-good {
		display: inline-block;
		padding: 2px 8px;
		left: 12px !important;
		border-radius: 8px;
		color: #fff;
		margin-top: 3px !important;
	}
	
	.rank-list-first {
		background-color: #E80000;
	}
	
	.rank-list-second {
		background-color: #FF7200;
	}
	
	.rank-list-third {
		background-color: #F8B300;
	}
</style>