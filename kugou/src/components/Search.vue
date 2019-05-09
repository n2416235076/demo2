<template>
	<div>
		<!-- 搜索框 -->
		<div class="search-panel">
			<div class="search-input">
				<span class="search-icon"></span>
				<input type="text" v-model="keyword" @keydown.enter="search">
			</div>
			<a href="javascript:;" class="search-btn" @click="search">搜索</a>
		</div>

		<!-- 热门歌曲 -->
		<div class="search-list" v-if="togglePanel">
			<div class="search-list-title">最近热门</div>
			<mt-cell v-for="(item,index) in hotList" :title="item.keyword" @click.native="replaceInput(index)" :key="index"></mt-cell>
		</div>

		<!-- 搜索结果 -->
		<div class="songs-list" v-if="!togglePanel">
			<div class="search-total">共有{{total}}条搜索结果</div>
			<mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
				<img src="../assets/images/download_icon.png" width="20" height="20">
			</mt-cell>
		</div>
	</div>
</template>

<script>
	import {Indicator} from 'mint-ui'
	import {PLAY_AUDIO} from '../mixins'
	export default{
		mixins:[PLAY_AUDIO],
		data(){
			return {
				keyword:'',
				hotList:[],
				togglePanel:true,
				total:null,
				songList:[]
			}
		},
		created(){
			this.getList();
		},
		methods:{
			getList(){
				Indicator.open({
					text:'加载中',
					spinnerType:'snake'
				});

				this.$http.get('/aproxy/api/v3/search/hot?format=json&plat=0&count=30').then(({data}) => {
					Indicator.close();
					this.hotList = data.data.info;
				})
			},
			replaceInput(id){
				// 点击热门关键词
				this.keyword = this.hotList[id].keyword;
				this.search();
			},
			search(){
				this.togglePanel = false; //隐藏热门歌曲
				Indicator.open({
					text:'加载中',
					spinnerType:'snake'
				});
				this.$http.get(`/aproxy/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=30&showtype=1`).then(({data}) => {
					Indicator.close();
					this.songList = data.data.info;
					this.total = data.data.total;
				});
			}
		}
	}
</script>