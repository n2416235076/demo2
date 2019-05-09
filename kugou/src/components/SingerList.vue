<template>
	<div class="singer_list">
		<mt-cell v-for="(item,index) in list" :key="index" is-link :to="`/singer/info/${item.singerid}`" :title="item.singername">
			<img slot="icon" :src="item.imgurl.replace('{size}', '400')" width="60" height="60">
		</mt-cell>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	export default {
		data(){
			return {
				list:[]
			}
		},
		//设置路由的钩子 
		beforeRouteEnter(to,from,next){
			//当通过路由的时候一进来执行的
			//走进钩子后执行的下一步操作
			next(vm => {

				//显示排行的头部, rankHead.vue
				vm.$store.commit('showHead',true);
				vm.$store.commit('setHeadStyle', {'background': '#2CA2F9'})
				vm.getList();  //调用接口获取排行数据
			})
		},
		//当离开这个界面的时候触发的路由钩子
    	beforeRouteLeave(to,form,next){
    		this.$store.commit('showHead', false)
			// 清除头部样式
      		this.$store.commit('resetHeadStyle')
			next() 
		},		
		methods:{
			getList(){
				Indicator.open({
		          	text: '加载中...',
		          	spinnerType: 'snake'
				});
				var singerID = this.$route.params.id;
				this.$http.get(`/proxy/singer/list/${singerID}?json=true`).then(({data})=>{
					Indicator.close()
	        		this.list = data.singers.list.info
					this.$store.commit('setHeadTitle', data.classname)
				})
			}
		}
	}
</script>

<style>
	.singer_list .mint-cell-title img {
		margin-right: 10px
	}
</style>