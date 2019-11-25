<template>
  <div class="mark">
    <div class="ticket-screening">
      <span data-state="true" @click="close" class="ticket-screening-close yo-ico">&#xe63d;</span>
      <div class="ticket-screening-time">
        <p class="ticket-screening-type">排序方式</p>
        <div class="ticket-screening-options">
             <span 
            v-for="(video,index) in videoOrder"
            :key="video.id"
            :data-video="video.screen"
            :class="[video.marg?'screening-option-margin screening-option':'screening-option',index==videoactive?'screening-option-selected':'']"
            @click="videoclick(index)"
            >{{video.name}}</span>
          <!-- <span class="screening-option screening-option-selected">推荐</span>
          <span class="screening-option screening-option-margin">热度</span>
          <span class="screening-option">时间</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VIDEO_ACTIVE } from 'vuestore/active-type'
export default {

    data(){
        return{
            searchIsShow:false,
            videoactive:0,
            videoOrder:[
              {id:0,name:'推荐',screen:'1'},
              {id:1,name:'热度',screen:'2',marg:'true'},
              {id:2,name:'时间',screen:'3'},
            ],
        }
    },
    methods:{
        close(){
            this.$emit('getSearchIsShow',this.searchIsShow)
        },
        videoclick(index){
            this.videoactive=index
            this.$store.dispatch({
                type:VIDEO_ACTIVE,
                payload:{
                    screen:this.videoOrder[this.videoactive].screen,
                    page:1
                }
            })
            this.$emit('getSearchIsShow',this.searchIsShow)
           
        }
    }

};
</script>

<style lang="stylus" scoped>
.mark{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 998;
    .ticket-screening{
        position: fixed;
        top: 36%;
        width: 6rem;
        margin: .20513rem;
        background: #1e1e1e;
        z-index: 1001;
        .ticket-screening-close{
            position: absolute;
            top: 0;
            right: 0;
            padding: .20513rem;
            font-size: .34188rem;
            color: #514f50;
        }
        .ticket-screening-time{
            .ticket-screening-type{
                padding: .20513rem 0;
                text-align: center;
                font-size: .23932rem;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
            }
            .ticket-screening-options{
                display: flex;
                flex-wrap: wrap;
                padding: .17094rem .36026rem;
                .screening-option{
                    display: inline-block;
                    width: 1.53846rem;
                    height: .47863rem;
                    border: 1px solid #cdcdcd;
                    border-radius: .23932rem;
                    line-height: .47863rem;
                    text-align: center;
                    margin-bottom: .23932rem;
                }
                .screening-option-selected{
                    color: #fff;
                    background: #ff5e00;
                    border: 1px solid #ff5e00;
                }
                .screening-option-margin{
                    margin: 0 .2735rem;
                }
            }
        }
    }
}
</style>