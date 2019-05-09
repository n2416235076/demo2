<template>
	<div v-show="detailPlayerFlag">
		<!-- <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div> -->
		<!-- blur();模糊 -->
		<div class="detail_player"
			:style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)', '-webkit-filter':'blur(5px)'}"></div>
		<!-- 歌词部分 -->
		<div class="detail_player-content">
			<!-- 返回按钮 -->
			<div class="detail_player-title container">
				<span class="detail_player-back" @click="hideDetailPlayer()"></span>
				{{audio.title}}
			</div>

			<!-- 中间logo图片 -->
			<div class="detail_player-img">
				<img :src="audio.imgUrl" alt="">
			</div>

			<!-- 歌词部分 -->
			<div class="detail_player-lrc">
				<div class="lrc-content" :style="{marginTop:lrcOffset + 'px'}">
					<p v-for="(item,index) in songLrc" :class="{isCurrentLrc:item.seconds >= audio.currentLength}" :key="index">
						{{item.lrcContent}}
					</p>
				</div>
			</div>

			<!-- 歌曲进度选择 -->
	        <div class="detail_player-range container">
	        	<span class="detail_player-time">{{audio.currentLength | time}}</span>
	        	<mt-range
	        		id="range"
	        		:min="0"
	        		:max="audio.songLength"
	        		v-model="audio.currentLength"
	        		:bar-height="3"
	        		@click.native="rangeChange($event)"
	        		disabled 
	        		style="width: 80%"
	        	></mt-range>
	        	<span class="detail_player-time">{{audio.songLength | time}}</span>
	        </div>

			<!-- 播放状态 -->
	        <div class="detail_player-control player-padding">
	          	<i class="detail_player-btn play-prev player_btn-sm" @click="prev()"></i>

	          	<i class="detail_player-btn play-play player_btn-lg" :class="{'play-pause':isPlay}" @click="toggleStatus()"></i>

	          	<i class="detail_player-btn play-next player_btn-sm" @click="next()"></i>
	        </div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default{
		filters:{ // 过滤器
			time(value){
				var length = Math.floor(parseInt(value));
				var minute = Math.floor(value / 60);
				if(minute < 10){
					minute = '0' + minute;
				}
				var second = length % 60;
				if(second < 10){
					second = '0' + second;
				}
				return minute + ':' + second;
			}
		},
		data(){
			return {rangeValue:0}
		},
		computed:{
			...mapGetters(['audio','detailPlayerFlag','isPlay']),
			songLrc(){ //获取歌词
				if(this.audio.lrc){  //有没有歌词
					// split();把字符串分割成数组
					var temp = this.audio.lrc.split("\r\n");
					// splice();从数组中添加/删除元素，返回被删元素
					temp = temp.splice(0,temp.length - 1);
					temp = temp.map((value) => {
						// substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
						// 00:00
						var time = value.substr(1,5);
						// 具体秒数
						var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
						// 具体歌词，去除时间部分
						var lrcContent = value.substr(10);

						return{
							seconds,  //返回秒数
							lrcContent  //返回秒数对应的歌词
						}
					})
				} 
				return temp;
			},
			lrcOffset(){ //歌词外边距
				if(this.songLrc){
					// querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素
					var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-20)
            		return this.audio.currentLength + offset - this.audio.currentLength
				}
			}
		},
		methods:{
			hideDetailPlayer(){   //隐藏歌词详细
				this.$store.commit('showDetailPlayer',false);
			},
			rangeChange(event){ //设置音乐播放进度
				var offset = event.offsetX; // 当前的x坐标

				//进度条的总长度
		        var rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20

		        //总秒数/总长度 = 每秒的长度 * offset = 当前点击位置的长度
         		//clickLength  当前点击的长度
        		var clickLength = Math.floor(offset * this.audio.songLength / rangeWidth);

        		//判断当前点击的范围是否有超出总的范围
		        if(offset < rangeWidth){

		          	//改变样式元素的长度
		          	this.$store.commit('setAudioTime', clickLength)

		          	//改变audio标签的播放长度
		          	this.$store.commit('setCurrent', true)
		        }
			},
			toggleStatus(){ //切换播放暂停
				if (this.isPlay) {
          			document.getElementById('audioPlay').pause()
        		} else {
          			document.getElementById('audioPlay').play()
        		}
        		this.$store.commit('isPlay', !this.isPlay)
			},
			prev(){  //上一首
				this.$store.dispatch('prev');
			},
			next(){  //下一首
				this.$store.dispatch('next');
			}
		}
	}
</script>