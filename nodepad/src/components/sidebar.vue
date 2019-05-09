<template>
  <div class="event-tools" :class="{'show-event-tools':isShow}">
	<ul class="tools-sidebar">
        <li>
            <button class="tools-btn" @click="openTheme">切换主题</button>
        </li>
        <li>
            <!-- <button class="tools-btn">下载数据</button> -->
            <download-excel
                class   = "tools-btn download"
                :data   = "json_data"
                :fields = "json_fields"
                worksheet = "My Worksheet"
                name    = "filename.xls"
            >下载数据</download-excel>
        </li>
        <li>
            <!-- <button class="tools-btn">导入数据</button> -->
            <input style="display:none;" id="fileElem" type="file" ref="upload" accept=".xls,.xlsx">
            <button class="tools-btn" href="#" id="fileSelect" @click="openBrowse()">导入数据</button>
        </li>
        <li>
            <button class="tools-btn" @click="openTable">编辑数据</button>
        </li>
        <li>
            <button class="tools-btn" @click="showDialog">清空数据</button>
        </li>
	</ul>
  </div>
</template>

<script>
    import downloadExcel from 'vue-json-excel'
    import XLSX from 'xlsx'
	export default {
		name:'sidebar', //自定义标签
        components:{
            downloadExcel
        },
		data(){
			return {
                json_fields:{
                    'id':'id',
                    'content':'content',
                    'type':'type',
                    'time':'time'
                },
                outputs: [] //导入数据
            }
		},
		props:['isShow'], //接收app n-sidebar is-show

        // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
        mounted() { 
            //绑定监听表格导入事件
            this.$refs.upload.addEventListener('change', e => {
                this.readExcel(e);
            })
        },
        computed:{
            json_data(){
                var data = this.$store.getters.getEventList;
                var arr = [];
                for(var i = 0; i < data.length; i++){
                    var obj = {
                        id:data[i].id,
                        content:data[i].content,
                        time:data[i].time,
                        type:''
                    }
                    if(data[i].type === 1){
                        obj.type = '未完成';
                    }else if(data[i].type === 2){
                        obj.type = '已完成';
                    }else if(data[i].type === 3){
                        obj.type = '已取消';
                    }

                    arr.push(obj); //追加元素到数组
                }
                return arr;
            }
        },
		methods:{
			openTheme(){
				this.$emit('opentheme');// 执行父元素的事件
			},
            openTable(){
                this.$emit('opentable');// 执行父元素的事件，显示编辑列表
            },
            showDialog(){
                this.$emit('cleardialog');// 执行父元素事件，清空数据
            },
            readExcel(e) {//表格导入
                var that = this;
                const files = e.target.files;  //获取文件名
                if(files.length<=0){//如果没有文件名
                    return false;
                }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                    // this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                    this.$toast('上传格式不正确，请上传xls或者xlsx格式');
                    return false;
                }
                
                // FileReader(); 文件上传方法
                const fileReader = new FileReader();
                fileReader.onload = (ev) => {
                    try {
                        const data = ev.target.result;
                        const workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        const wsname = workbook.SheetNames[0];//取第一张表
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内
                        that.outputs = [];//清空接收数据
                        //编辑数据
                        for(var i= 0;i<ws.length;i++){
                            var sheetData = {
                                id:ws[i].id,
                                content:ws[i].content,
                                time:ws[i].time,
                                type:ws[i].type
                            }

                            // 转换type的值，vue只识别1、2、3
                            if(ws[i].type === '未完成'){
                                sheetData.type = 1;
                            }else if(ws[i].type === '已完成'){
                                sheetData.type = 2;
                            }else if(ws[i].type === "已取消"){
                                sheetData.type = 3;
                            }

                            // 对象要是设置后的，ws的type值为中文
                            this.$store.dispatch('addevent',sheetData);
                            that.outputs.push(sheetData);
                        }
                        // console.log(that.outputs);
                        this.$refs.upload.value = '';
                    } catch (e) {
                 
                        return false;
                    }
                };
                // readAsBinaryString 方法会读取指定的 Blob 或 File 对象
                fileReader.readAsBinaryString(files[0]);
            },
            openBrowse(){ 
                // navigator.appName显示浏览器内核信息 判断是否为IE浏览器
                var ie = navigator.appName =="Microsoft Internet Explorer" ? true : false; 
                if(ie){ 
                    // 给上传按钮绑定点击事件  IE
                    document.getElementById("fileElem").click(); 
                     
                }else{
                    // 其他浏览器
                    // document.createEvent创建一个指定类型的事件
                    var a = document.createEvent("MouseEvents");

                    // initEvent初始化新事件对象的属性
                    a.initEvent("click", true, true);  
                    document.getElementById("fileElem").dispatchEvent(a);   
                } 
            } 
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
    .tools-sidebar li .download{
        margin:5px auto;
        height:40px;
        line-height:37px;
        border-radius:6px;
        cursor:pointer;
    }
    .event-tools{
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        width:250px;
        padding:100px 20px 30px;
        box-sizing: border-box;
        transform: translateX(-250px);
        transition: transform .3s;
        text-align: center;
        background: rgba(0,0,0,.5);
        font-size: 16px;
        z-index:9;
        &.show-event-tools{
            transform: translateX(0);
        }
        .tools-sidebar{
            & > li{
                line-height: 60px;
            }
        }
        .tools-btn{
            width:100px;
            height:40px;
            line-height: 26px;
            color: #fff;
            transition: background .3s ease-in;
        }
        pre{
            white-space: pre-wrap;
            font:{
                size: 14px;
                family:  arial,"microsoft yahei";
            }
            line-height: 20px;
        }
    }
</style>