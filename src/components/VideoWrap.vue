<template>
  <div class="video-wrap">
    <div>
        <div class="video-list" v-if="videoList.length>0">

            <VideoList
            v-for="video in videoList"
            :key="video.id"
            :video='video'
            ></VideoList>
        </div>
        <Loading v-else></Loading>
    </div>
  </div>
</template>

<script>
import { VIDEO_ACTIVE } from 'vuestore/active-type'
import { get } from 'utils/http'
import BScroll from "better-scroll";
import Vue from "vue";
import { Toast } from "vant";
import VideoList from './VideoList'
import Loading from 'components/Loading'
Vue.use(Toast);
export default {
    data(){
        return {
            videoList:[]
        }
    },
    async mounted(){
        let page = 1;
        await this.$store.dispatch({
            type:VIDEO_ACTIVE,
            payload:{
                screen:1,
                page,
            }
        })
        let result = this.$store.state.video.videoList
        page++;
        this.videoList = result.data
        let total = result.total
        let screen = this.$store.state.screen
        let bScroll = new BScroll(".video-wrap", {
            pullUpLoad: true,
            click: true,
            probeType: 2
        });
        bScroll.on('pullingUp',async ()=>{
            if(this.videoList.length<total){
                let result = await get({
                    url:'/mediaapi/videos',
                    params:{
                        screen,
                        page,
                        limit: 5
                    }
                })
                console.log(result)
                for(var i=0;i<result.data.length;i++){
                    if(result.data[i].video_duration!=0){
                        let h = Math.floor((~~result.data[i].video_duration)/60);
                        let m = (~~result.data[i].video_duration)%60
                        result.data[i].video_duration = '0'+h+':'+m
                    }
                }
                page++
                this.videoList = [...this.videoList,...result.data]
                await this.$nextTick()
                bScroll.refresh()
                // console.log(bScroll.y)
            }else{
                Toast({
                    message: "到底了...",
                    position: "bottom",
                    duration: 1000
                });
            }
            bScroll.finishPullUp()
        })
    },
    components:{
        VideoList,
        Loading
    },
    watch:{
        '$store.state.video.videoList':function(){
            let result = this.$store.state.video.videoList
            this.videoList = result.data
        }
    }
};
</script>

<style lang="stylus" scoped>
.video-wrap{
    flex 1
    padding 0 0.20513rem
    margin-top .20513rem
    overflow scroll
   
}
</style>