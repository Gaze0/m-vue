<template>
  <div class="banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="banner in bannerList"
          :key="banner.id"
        >
          <img :style="($route.fullPath=='/index/home')?' width:100%':''" v-if='banner.cover' :src="banner.cover" alt @click="$router.push(`/index/detail/${banner.id}`)" />
          <img :style="($route.fullPath=='/index/home')?' width:100%':''" v-else :src="banner.relation_img" alt @click="$router.push(`/index/detail/${banner.id}`)" />
        </div>
        
      </div>
      <!-- <div class="swiper-wrapper" v-else-if="$route.fullPath=='/shop/mall'">
        <div class="swiper-slide">
          <img  src="https://img.zhengzai.tv/files/2019/09/26/5d8c504925481.png" alt />
        </div>
        <div class="swiper-slide">
          <img src="https://img.zhengzai.tv/files/2019/08/30/5d6889152139d.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://img.zhengzai.tv/files/2019/04/29/5cc67863e4e2f.jpg" />
        </div>
      </div> -->
      <div class="swiper-pagination bar" style="width:1.8rem"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "../../libs/swiper.css";
import { get } from 'utils/http'
export default {
  props:{
      goodsImg:{
        type:Array
      },
  },
  data(){
    return {
        bannerList:[],
    }
  },
  async mounted() {
    // console.log(this.goodsImg)
    let result
    if(this.goodsImg){
       result = this.goodsImg
    }else{
      let type;
      if(this.$route.fullPath=='/shop/mall'){
          type = 3
      }else if(this.$route.fullPath=='/index/home'){
        type = 4
      }
      result = await get({
        url:'/mediaapi/banner/list',
        params:{
          type,
        }
      })
    }
    
    this.bannerList = result
    this.putBanList();
    await this.$nextTick();
    this._initSwiper();
  },
  methods: {
    putBanList(){
      this.$emit('getBanList',this.bannerList)
    },
    _initSwiper() {
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          //   dynamicBullets: true,
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        }
      });
    }
  },
};
</script>

<style lang="stylus" scoped>
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
</style>