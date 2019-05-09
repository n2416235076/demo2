import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// 第三方插件要在原型上添加
Vue.prototype.$http = axios;

export default new Vuex.Store({
	// 所有应用的状态
	state:{
		head:{ //头部配置
			toggle:false,
			title:'',
			style:{'background':'rgba(43,162,251,0)'}
		},
		audio:{ //歌曲相关信息
			songUrl: '', //音乐地址
			imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
			title: '',
			singer: '', //歌手
			currentLength: 0, //音乐播放时长
			songLength: 0, //音乐时长
			currentFlag: false //audio标签播放的进度
		},
		listInfo: { //歌曲播放列表  mixins
			songList: [],
			songIndex: 0
    	},
		audioLoadding:false, //loading加载 
		isPlay: false, //暂停/播放 默认暂停
		showPlayer:false, //是否显示面板详情信息
		detailPlayerFlag:false, //是否显示详情页
		headNav:'head-nav1', //选项卡，默认为新歌

		listenCount:0,   //判断是否首次进来，不自动播放
	},
	// 获取所有状态
	getters:{
		head:state => state.head,
		audio:state => state.audio,
		audioLoadding: state => state.audioLoadding, //接收loading加载
		isPlay: state => state.isPlay,
		detailPlayerFlag:state => state.detailPlayerFlag,
		showPlayer:state => state.showPlayer,
		head: state => state.head,

	    listInfo:state=> state.listInfo,
	    headNav:state => state.headNav
	},
	//修改所有状态
	mutations:{
		setAudio:(state,audio) => {   //设置播放器的音乐信息
			if(!state.listenCount){
				state.showPlayer = true;   //首次播放显示详细信息
			}
			state.listenCount++;
			state.audio = {...(state.audio), ...audio};   //两个对象 合并 es6迭代
		},
		toggleAudioLoadding:(state,flag) => {   //切换loading显示隐藏
	    	state.audioLoadding = flag;
	    },
	    //mixins里面调用此方法 设置歌曲的播放列表
	    setListInfo:(state,{list,index}) => {   
			state.listInfo.songList = list //全部歌曲
			state.listInfo.songIndex = index //歌曲索引
	    },
	    isPlay: (state, flag) => {   //设置播放状态
			state.isPlay = flag
    	},
    	autoPlay:(state) => {   //点击音乐后自动播放
        	state.isPlay = true
    	},
    	showDetailPlayer:(state,flag) => { //修改显示详细信息的状态
    		state.detailPlayerFlag = flag
    	},
    	setLrc:(state,lrc) => {   //设置播放器的音乐歌词
        	state.audio = {...(state.audio), lrc}
    	},
    	setCurrent:(state, flag) => {   //改变audio标签播放的进度
			state.audio.currentFlag = flag
    	},
    	setAudioTime(state, time){   //设置当前音乐已经播放了的时间长度
			state.audio.currentLength = time
		},
		showHead:(state,flag) => {   //设置排行头部显示或隐藏 rankhead.vue
	    	state.head.toggle = flag
	    },
	    setHeadTitle:(state,title) => {   //设置排行头部标题
      		state.head.title = title
    	},
    	setHeadNav:(state,nav) => {   //修改当前点击的导航
      		state.headNav = nav
    	},
    	setHeadStyle:(state,style) => {  //设置排行头部样式
      		state.head.style = style
    	},
    	resetHeadStyle: state => {   //清除头部样式
			state.head.style = {'background': 'rgba(43,162,251,0)'}
		},
	},
	//提交动作
	actions:{
		// mixins里面调用此方法，获取当前播放音乐信息
		getSong:({commit,state},hash) => {
			commit('toggleAudioLoadding',true);  //显示loading加载
			//发送一个get请求
        	axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
        		data = data.data;
        		//组装信息
        		const songUrl = data.play_url
				const imgUrl = data.img
				const title = data.audio_name
				const songLength = data.timelength / 1000
				const singer = data.author_name
				const currentLength = 0;
				const lrc = data.lyrics;//歌词
		        const audio = {songUrl, imgUrl, title, singer, songLength, currentLength}
		        commit('setAudio',audio)   //设置播放音乐
		        commit('setLrc',lrc)   //设置播放的歌词
		        commit('toggleAudioLoadding',false)  //隐藏loading加载
		        commit('autoPlay'); //点击后自动音乐播放
        	});
		},
		prev:({dispatch,state}) => {   //上一首
			var list = state.listInfo.songList; //获取播放列表
			if(state.listInfo.songIndex == 0){
				// 当前播放的为第一首
				state.listInfo.songIndex = list.length - 1;
			}else{
				state.listInfo.songIndex--; // 播放上一首
			}
			// 获取歌曲秘钥
			var hash = list[state.listInfo.songIndex].hash;

			// 获取音乐的信息
			dispatch('getSong',hash);
		},
		next:({dispatch,state}) => { //下一首
			var list = state.listInfo.songList; //获取播放列表
			if(state.listInfo.songIndex == list.length - 1){
				// 已经播放到最后一首
				state.listInfo.songIndex = 0;
			}else{
				++state.listInfo.songIndex; //播放下一首
			}
			// 获取歌曲秘钥
			var hash = list[state.listInfo.songIndex].hash;

			//获取音乐的信息
			dispatch('getSong',hash);
		}
	}
});
