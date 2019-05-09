<template>
	<div class="audio-view" :class="{'audio_panel_hide':toggleHide}">
		<!-- 当指定音频/视频的时长数据发生变化时，发生 durationchange 事件 H5方法 点击直接播放 -->
		<audio @durationchange="toPlay()" id="audioPlay" :src="audio.songUrl" @timeupdate="change()" @ended="next()"></audio>
		<!-- 显示/隐藏 -->
		<div class="audio-panel-control" :class="{'toggleContral':toggleHide}" @click="togglePanel">
			<mt-spinner type="snake" :size="27" v-show="audioLoadding"></mt-spinner>
		</div>
		<div class="audio-panel">
			<img :src="audio.imgUrl" alt="" class="player-img" @click="showDetailPlayer()" >
			<div class="player-status" @click="showDetailPlayer()">
				<p class="player-title ellipsis">{{audio.title}}</p><!-- 歌曲名 -->
        		<p class="player-singer ellipsis">{{audio.singer}}</p><!-- 歌手 -->
			</div>
			<div class="player-controls">
				<!-- 播放暂停 -->
		        <span class="player-Play" @click="toggleStatus()" :class="{'player-Pause':isPlay}"></span>
		        <!-- 下一首 -->
		        <span class="player-nextSong" @click="next()"></span>
        	</div>
		</div>
	</div>
</template>

<script>
	/*mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性*/
	import { mapGetters } from 'vuex'; //获取vuex里面所有的状态
	export default {
		name:'player',
		data(){
			return {
				toggleHide:false //面板显示或隐藏，默认显示 bottom="-60"
			}
		},
		computed:{
			...mapGetters(['audio', 'audioLoadding', 'showPlayer', 'isPlay']),
		},
		methods:{
			toPlay(){
				// play() H5的dom方法 开始播放当前的音频或视频。
				document.getElementById('audioPlay').play();
			},
			change(){    //音乐播放进度改变
				var time = document.getElementById('audioPlay').currentTime;
				if(this.audio.currentFlag)  //当改变当前播放位置的时候触发
				{
					//改变audio标签的播放位置
					document.getElementById('audioPlay').currentTime = this.audio.currentLength;

					//改完播放位置之后，就将修改状态设置为false
					this.$store.commit('setCurrent', false);
				}else{
					this.$store.commit('setAudioTime', time);
				}
			},
			togglePanel(){ //显示或隐藏面板
				this.toggleHide = !this.toggleHide;
			},
			toggleStatus(){ // 切换播放状态
				//判断当前状态是播放还是暂停
				if(this.isPlay){
					//当前为播放状态，要暂停 
					//pause();H5方法，暂停播放视频音频
        			document.getElementById('audioPlay').pause();
				}else{
					//当前为暂停状态，要播放
        			document.getElementById('audioPlay').play();
				}
				// 把状态传给mutations
				this.$store.commit('isPlay', !this.isPlay);
			},
			next(){ //切换下一首
				this.$store.dispatch('next'); //提交到action
			},
			showDetailPlayer(){ //显示阴影层详细     引号
				if(this.showPlayer){
					this.$store.commit('showDetailPlayer',true);
				}
			}
		}
	}
</script>