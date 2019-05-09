module.exports = {
	'PLAY_AUDIO' : {
		methods:{
			playAudio(index){
				var hash = this.songList[index].hash //获取歌曲秘钥
				var info = {
			        list: this.songList, //歌曲列表
			        index: index //歌曲索引
		        }
		        
		        //设置当前播放的音乐
		        this.$store.commit('setListInfo', info)  

		        //获取当前播放音乐的信息
		        this.$store.dispatch('getSong', hash)
			}
		}
	}
}