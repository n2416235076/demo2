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
                name    = "filename.xls">
                下载数据
            </download-excel>
        </li>
        <li>
            <button class="tools-btn">导入数据</button>
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
  export default {
    name:"sidebar",
    components:{
        downloadExcel
    },
    data(){
      return {
          json_fields: {
              'id': 'id',
              '内容': 'content',
              '状态': 'type',
              "时间":"time"
          },
  /*        json_data: [
              {
                  "id":1,
                  "content":"备忘录内容",
                  "type":"未完成"
              },
              {
                  "id":1,
                  "content":"备忘录内容",
                  "type":"未完成"
              },
              {
                  "id":1,
                  "content":"备忘录内容",
                  "type":"未完成"
              },
              {
                  "id":1,
                  "content":"备忘录内容",
                  "type":"未完成"
              }
          ],*/
      }
    },
    props:['isShow'],
    computed:{
        json_data(){
            var data = this.$store.getters.getEventList;
            var arr = [];
            for(var i=0;i<data.length;i++)
            {
                var obj = {
                    id:data[i].id,
                    content:data[i].content,
                    time:data[i].time,
                    type:""
                }

                if(data[i].type === 1)
                {
                    obj.type = '未完成';
                }else if(data[i].type === 2)
                {
                    obj.type = '已完成';
                }else if(data[i].type === 3)
                {
                    obj.type = '已取消';
                }

                arr.push(obj);
            }
            return arr;
        }
    },
    methods:{
      openTheme()
      {
        this.$emit('opentheme');  //执行父元素的自定义事件
      },
      openTable()
      {
          this.$emit('opentable');  //执行父元素的事件
      },
      showDialog(){  
          this.$emit('cleardialog');  //执行父元素的事件
      },
    }
  }
</script>


















<style lang="scss" rel="stylesheet/scss">
    .tools-sidebar li .download{
        margin:0 auto;
        height:40px;
        line-height:37px;
        border-radius:6px;
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