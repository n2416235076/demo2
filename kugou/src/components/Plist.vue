<template>
	<div class="rank">
		<mt-cell v-for="(value,index) in list" :key="index" :title="value.specialname" is-link :to="`/plist/info/${value.specialid}`">
			<img slot="icon" :src="value.imgurl.replace('{size}', '400')" width="60" height="60">
		</mt-cell>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	export default{
		data(){
			return {
				list:[]
			}
		},
		created(){
			this.getList();
		},
		methods:{
			getList(){
				//显示提醒框
		      	Indicator.open({
		        	text: '加载中...',
		        	spinnerType: 'snake'
		      	});

		      	// 接口请求数据
		      	this.$http.get('/proxy/plist/index&json=true').then(({data}) => {
		      		//关闭提醒框
			        Indicator.close();
			        this.list = data.plist.list.info
		      	})
			}
		}
	}
</script>

<style>
	.rank .mint-cell-title img{
		 	margin-right: 10px;
		}
		
	.rank .mint-cell-wrapper{
			font-size: 16px;
		}
</style>