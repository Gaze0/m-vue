<template>
  <div class="main-wrap">
    <div class="main">
      <div v-if="showList.length>0||banList.length>0">
        <!-- <div class="banner">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="https://img.zhengzai.tv/files/2019/11/11/5dc91e814c403.jpeg" alt />
              </div>
              <div class="swiper-slide">
                <img src="https://img.zhengzai.tv/files/2019/04/29/5cc6756d6b2f0.jpg" />
              </div>
              <div class="swiper-slide">
                <img src="https://img.zhengzai.tv/files/2019/10/30/5db962968726c.jpg" />
              </div>
              <div class="swiper-slide">
                <img src="https://img.zhengzai.tv/files/2019/11/11/5dc8df1564271.jpeg" />
              </div>
            </div>
            <div class="swiper-pagination bar" style="width:1.8rem"></div>
          </div>
        </div> -->
        <Banner  @getBanList="getBanList"></Banner>
        <div class="list-wrap" v-if="showList.length>0">
          <show-list v-for="show in showList" :key="show.id" :show="show"></show-list>
        </div>
        <div class="list-wrap" v-else>
          <div class="empty-ticket-list">
            <div class="empty-background"></div> 
              <div class="empty-text">
                目前无在售演出，只好睡觉咯
              </div>
          </div>
          <!-- <show-list v-for="show in showList" :key="show.id" :show="show"></show-list> -->
        </div>
      </div>
      <!-- showList.length>0 -->
      <div v-else>
        <Loading></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import BScroll from "better-scroll";
import ShowList from "./ShowList";
import Banner from "./Banner";
import { get } from "utils/http";
import Loading from 'components/Loading'
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import "../../libs/swiper.css";

import { INFO_ACTIVE } from '../../store/active-type'
export default {
  data() {
    return {
      showList: [],
      banList:[],
      total:'',
    };
  },
  
  async mounted() {
    let page = 1;
    // let city =
    //请求第一页
    await this.$store.dispatch({
            type:INFO_ACTIVE,
            payload:{
              day: 0,
              type: 0,
              order:'default',
              sort:'desc',
            }
          })
          // console.log(this.$store.state.loading)
    let result = this.$store.state.showList
    this.total = result.total;
    this.showList = [...result.data];
    // console.log(this.showList)
    let city= this.$store.state.cityInfo.nm
    page++;
    let {days,order_by,sort,type}=this.$store.state
    let bScroll = new BScroll(".main-wrap", {
      pullUpLoad: true,
      click: true,
      probeType: 2
    });
    bScroll.on("pullingUp", async () => {
      if (this.showList.length < this.total) {
        let result = await get({
          url: "/api/user/performance",
          params: {
            city_name: city,
            page: page,
            size: 10,
            days,
            type,
            order_by,
            sort,
          }
        });
        this.showList = [...this.showList, ...result.data];
        await this.$nextTick();
        bScroll.refresh();
        page++;
      } else {
        Toast({
          message: "到底了...",
          position: "bottom",
          duration: 1000
        });
      }

      bScroll.finishPullUp();
    });
  },
  methods: {
    getBanList(data){
      this.banList=data
    }
  },
  components: {
    ShowList,
    Banner,
    Loading
  },
  updated(){
    // this.$store.state.loading=false
  },
  watch:{
    '$store.state.showList':function(){
      this.total=this.$store.state.showList.total
      this.showList=[...this.$store.state.showList.data]
    },
  }

};
</script>

<style lang="stylus" >
.main-wrap
  flex 1
  margin-top 0.20513rem
  padding 0 0.20513rem 0
  background #000
  display flex
  flex-direction column
  overflow-y scroll
  .main
    // overflow-y scroll
    // flex-direction column
    // display flex
    .banner
      margin-bottom 0.20513rem
      width 100%
      height 2.94017rem
      .swiper-container
        height 100%
        .swiper-wrapper
          .swiper-slide
            img
              height 100%
        .my-bullet
          width 0.1rem
          height 0.1rem
          border-radius 100%
          background #ccc
          display inline-block
          margin-right 0.2rem
        .my-bullet-active
          width 0.2rem
          height 0.1rem
          display inline-block
          border-radius 100%
          opacity 1
          background #007aff
    .list-wrap
      flex 1
      // background red
      font-size 0.20513rem
      font-family PingFangSC-Semibold
      color #fff
      .empty-ticket-list
        padding-top: 1.02564rem;
        text-align: center;
        .empty-background
          width: 1.86325rem;
          height: 1.53846rem;
          margin: 0 auto;
          background: url('../../assets/img/empty_tickets.5ada3f3.png') no-repeat 0 0;
          background-size: cover
        .empty-text
          padding:.20513rem 0;
          color: #a2a2a2;
</style>