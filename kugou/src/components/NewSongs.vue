<template>
	<div>
		<!-- 轮播图 -->
		<mt-swipe :auto="5000">
			<mt-swipe-item v-for="(item,index) in banners" :key="index">
				<a :href="item.extra.tourl">
					<img :src="item.imgurl" :title="item.title">
				</a>
			</mt-swipe-item>
		</mt-swipe>
		<!-- 音乐列表 -->
		<!-- @click.native 原生点击事件，防止冒泡，mint-ui插件使用 -->
		<mt-cell v-for="(song, index) in songList" :title="song.filename" :key="index" @click.native="playAudio(index)">
			<img src="../assets/images/download_icon.png" width="20" height="20">
		</mt-cell>
	</div>
</template>

<script>
	// 加载第三方插件 加载提示框，支持自定义文本和加载图标。 http://www.yoyo88.cn/study/vue/177.html
	import { Indicator } from 'mint-ui'
	import { PLAY_AUDIO } from '../mixins' //混入策略
	import { mapGetters } from 'vuex'   //获取vuex里面所有的状态

	export default{
		mixins: [PLAY_AUDIO], //把操作封装到公共组件中
		data(){
			return {
				banners:[], //广告列表
				songList:[] //音乐列表
			}
		},
		created(){ //生命周期，钩子
			this.getSongs();
		},
		computed:{
			/*mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性*/
			...mapGetters(['listInfo','audio'])
		},
		methods:{
			getSongs(){
				// 启用loading加载
				Indicator.open({
					text:'加载中...', //文本内容
					spinnerType:'double-bounce' //加载图标的类型
				});
				// 请求数据
				// json=true 接口参数，根据网站要求
				this.$http.get('/proxy/?json=true').then(({data}) => {
			        this.banners = data.banner;
			        this.songList = data.data;
			    }).then(() => {
			    	//关闭loading加载
			    	Indicator.close();  
			    });
			},
			/*download(obj){
				var songUrl = obj.songUrl;
				if(songUrl){
					this.$http.get(`/download?action=action`).then((data)=>{
						console.log(data);
					});
				}
			}*/
		}
	}
</script>

<style>
	.mint-swipe {
		height: 39vw !important;
	}
	
	.mint-swipe-indicator {
		width: 12px !important;
		height: 12px !important;
	}
	
	.mint-swipe-indicators {
		bottom: 5px !important;
	}
</style>