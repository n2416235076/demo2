<template>
	<div class="header">
		<HeadLogo />
		<RankHead v-if="head.toggle" :title="head.title" :cStyle="head.style" />
		<HeadNav v-else />
	</div>
</template>

<script>
	import HeadLogo from './HeadLogo'
	import RankHead from './RankHead'
	import HeadNav from './HeadNav'
	import { mapGetters } from 'vuex'  //获取到vuex当中所有的getters选项
	export default {
		computed:{
			// ...引用
			...mapGetters(['head'])   //取到getters里面的head选项
		},
		components:{
			HeadLogo,
			RankHead,
			HeadNav
		}
	}
</script>