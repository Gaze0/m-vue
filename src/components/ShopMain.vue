<template>
  <div class="main-wrap">
    <div>
      <div class="main" v-if='goodsList.length>0'>
        <div>
          <Banner></Banner>
          <div class="goods-list-header">
            <span class="goods-list-title">推荐商品</span>
          </div>
          <div class="goods-content">
            <div class="main-goods-list">
              <div class="goods-list">
                <ShopMainGoods 
                  v-for="good in goodsList"
                  :key="good.id"
                  :good="good"
                ></ShopMainGoods>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
          <Loading></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "index/Banner";
import ShopMainGoods from "./ShopMainGoods";
import Loading from 'components/Loading'
import { get } from "utils/http";
import BScroll from "better-scroll";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      goodsList: []
    };
  },
  async mounted() {
    let page = 1;
    let result = await get({
      url: "/api/user/goodMainList",
      params: {
        page,
        per_page: 10,
        order: 0,
        sort_kind: 0
      }
    });
    let total = result.total;
    this.goodsList = result.data;
    page++;
    let bScroll = new BScroll(".main-wrap", {
      pullUpLoad: true,
      click: true,
      probeType: 2
    });

    bScroll.on('pullingUp',async()=>{
        if(this.goodsList.length<total){
            let result = await get({
            url:'/api/user/goodMainList',
            params:{
              page,
              per_page: 10,
              order: 0,
              sort_kind: 0,
            }
        })
          this.goodsList = [...this.goodsList,...result.data]
          await this.$nextTick()
          bScroll.refresh();
          page++
        }else{
           Toast({
            message: "到底了...",
            position: "bottom",
            duration: 1000
          });
        }
         bScroll.finishPullUp();
    })

  },
  components: {
    Banner,
    ShopMainGoods,
    Loading
  },
};
</script>

<style lang="stylus" scoped>
.main-wrap
  height 100%
  margin-top 0.20513rem
  padding 0 0.20513rem 0
  background #000
  display flex
  flex-direction column
  overflow-y scroll
  div
    .main
      .goods-list-header
        padding 0 0.20513rem
        margin-bottom 0.20513rem
        color #cdcdcd
        .goods-list-title
          font-family PingFangSC-Medium
          font-weight 500
          font-size 0.2735rem
</style>