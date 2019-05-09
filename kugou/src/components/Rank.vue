<template>
	<div class="rank">
		<mt-cell v-for="(item,index) in songList" :title="item.rankname" :to="`/rank/info/${item.rankid}`" is-link :key="index">
			<!-- slot 自定义显示的内容 -->
			<img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
		</mt-cell>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	export default{
		data(){
			return {
				songList:[]
			}
		},
		created(){ //钩子，自动获取排行列表
			this.getList();
		},
		methods:{
			getList(){
				Indicator.open({
					text:'加载中',
					spinnerType:'snake'
				});
				// 请求代理地址
				this.$http.get('/proxy/rank/list&json=ture').then(({data}) => {
					// 关闭弹窗
					Indicator.close();
					// 获取结果
					this.songList = data.rank.list;
				})
			}
		}
	}
</script>

<style>
	.rank .mint-cell-title img {
		margin-right: 10px;
	}
	
	.rank .mint-cell-wrapper{
		font-size: 16px;
	}
</style>