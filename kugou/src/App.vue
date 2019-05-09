<template>
	<div id="app">
		<!-- 头部 -->
		<Head />
		<!-- 主体 路由引进 -->
		<div class="main">
			<!-- keep-alive 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。 -->
			<keep-alive>
				<!-- router-view 子路由组件，内嵌路由 -->
				<router-view></router-view>
			</keep-alive>
		</div>	
		<Player />
		<DetailPlayer />
	</div>
</template>

<script>
	import Head from './components/header/head'
	import Player from './components/Player'
	import DetailPlayer from './components/DetailPlayer'
	export default{
		components:{ //组件
			Head,
			Player,
			DetailPlayer
		}
	}
</script>
