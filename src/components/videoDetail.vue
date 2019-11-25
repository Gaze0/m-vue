<template>
  <div class="video-wrap">
    <div v-if="isPayload.length>0">
        <div class="con" >
        <video
            controls="controls"
            width="100%"
            :poster="videoInfo.video_pic"
            :src="videoInfo.playSet[0].url"
        ></video>
        </div>
        <div class="pgcvideo-info">
        <div class="info_main clearfix">
            <div class="info-title">
            <span class="span-border"></span>
            <span class="title-text">{{videoInfo.video_name}}</span>
            </div>
            <pre class="info-desc" v-html="videoInfo.video_desc">

            </pre>
            <div class="info-from">
            <div class="info-creator">
                <span class="creator_name">{{videoInfo.creator_name}}</span>
                <span class="created_at">于{{videoInfo.created_at}}上传</span>
            </div>
            <div class="play_count">观看量 {{videoInfo.play_count}}</div>
            </div>
        </div>
        </div>
    </div>
    <Loading v-else></Loading>
  </div>
</template>

<script>
import { get } from "utils/http";
import Loading from 'components/Loading'
import moment from 'moment'
export default {
  data() {
    return {
      videoInfo: {},
      isPayload:[]
    };
  },
  // http://1255322887.vod2.myqcloud.com/0b5d4a55vodtranscq1255322887/e6d9c5305285890796034967030/v.f40.mp4
  async mounted() {
      console.log(this.videoInfo)
    let id = this.$route.params.id;
    // console.log(this.$route)
    let result = await get({
      url: "/mediaapi/video/info",
      params: {
        id
      }
    });
    this.videoInfo = result;
    this.isPayload = result.playSet
    let createTime = this.videoInfo.created_at + '001'
    // console.log(new Date().getTime())
    this.videoInfo.created_at=moment(+createTime).format("YYYY.MM.DD")
  },
  components:{
      Loading
  }
};
</script>

<style lang="stylus" scoped>
    .video-wrap{
        flex 1
        overflow scroll
        .con{

        }
        .pgcvideo-info{
            position: relative;
            padding: .34188rem .20513rem;
            background: #1c1a1b;
            .info-title{
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                font-size: .23932rem;
                color: #fff;
                .span-border{
                    display: inline-block;
                    width: .08547rem;
                    height: .64957rem;
                    background: #fb5d12;
                    border-radius: 0 .06838rem .06838rem 0;
                }
                .title-text{
                    padding-left: .20513rem;
                }
            }
            .info-desc{
                white-space: pre-wrap;
                word-wrap: break-word;
                padding: .20513rem;
                color: #9FA17D;
            }
            .info-from{
                display: flex;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -ms-flex-align: center;
                align-items: center;
                padding: .06838rem .20513rem;
                color: #464546;
                .play_count{
                    padding-left: .10256rem;
                }
            }
        }
        
    }
</style>