<template>
  <div class="shop-all-wrap">
    <div class="shop-all">
      <div> 
        <div v-if='goodsList.length>0'>
          <div class="goods-sreening">
            <div class="goods-type-sreening">
              <div class="sreening-all-selections">
                <span  :class=" navIndex==1?'sreening-is-selected sreening-all':'sreening-all'" @click = "handleClick(1)">全部</span>
                <span :class="  navIndex==2?'sreening-is-selected  sreening-slection':' sreening-slection'" @click = "handleClick(2)">周边</span>
              </div>
            </div>
            <div class="goods-all-sort">
              <div class="goods-sort" :class="selected==1?'sort-is-selected':''" @click="select(1)">综合</div>
              <div class="goods-sort" :class="selected==2?'sort-is-selected':''" @click="select(2)">
                销量
                <div class="sort-switch-btn">
                  <svg aria-hidden="true" class="icon">
                    <use :xlink:href="arr[sale]"></use>
                  </svg>
                </div>
              </div>
              <div class="goods-sort"  :class="selected==3?'sort-is-selected':''" @click="select(3)">
                价格
                <div class="sort-switch-btn">
                  <svg aria-hidden="true" class="icon">
                    <use :xlink:href="arr[price]" />
                  </svg>
                </div>
              </div>
              <div class="goods-sort" :class="selected==4?'sort-is-selected':''" @click="select(4)">
                上架时间
                <div class="sort-switch-btn">
                  <svg aria-hidden="true" class="icon">
                    <use :xlink:href="arr[time]" />
                  </svg>
                </div>
              </div>
              <div class="goods-sort"  :class="selected==5?'sort-is-selected':''" @click="select(5)">筛选</div>
            </div>
          </div>
          <div class="goods-content">
                <div class="main-goods-list">
                  <div class="goods-list">
                      <ShopMainGoods
                          v-for="(good,index) in goodsList"
                          :key="index"
                          :good="good"
                      ></ShopMainGoods>
                  </div>
                </div>
          </div>
        </div>
        
        <div v-else>
          <Loading></Loading>
        </div>
        
      </div>
    </div>
    <!-- <GoodsMark></GoodsMark> -->
  </div>
</template>

<script>
import '../assets/icons/iconfont'
import ShopMainGoods from './ShopMainGoods'
import { get } from "utils/http";
import Loading from 'components/Loading'
import BScroll from "better-scroll";
import GoodsMark from './GoodsMark'
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
data() {
    return {
      navIndex:1,
      goodsList: [],
      arr:['#icontouzantongpiao','#icontouzantongpiao-copy1','#icontouzantongpiao-copy'],
      sale:0,
      price:0,
      time:0,
      selected:1,
      total:0
    };
  },
  async mounted() {
    let page = 1;
    await this.$store.dispatch('goodsActive',{
        payload:{
          page,
          per_page: 10,
          start_price: 0,
          end_price: -1,
          sort_kind: 0,
          order: 0,
        }
    })
    console.log(123)
    console.log(this.$store.state.goods)
    let result = this.$store.state.goods.goodsAll
    this.total = result.total;
    this.goodsList = result.data;
    page++;
    let bScroll = new BScroll(".shop-all-wrap", {
      pullUpLoad: true,
      click: true,
      probeType: 2
    });
    let { per_page, start_price, end_price, sort_kind, order} = this.$store.state.goods
    bScroll.on('pullingUp',async()=>{
        if(this.goodsList.length<this.total){
            let result = await get({
              url:'/api/user/goodMainList',
              params:{
                  page,
                  per_page,
                  start_price,
                  end_price,
                  sort_kind,
                  order,
                }
            })
        // console.log(result)
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
    ShopMainGoods,
    Loading,
    GoodsMark
  },
  methods:{
    async handleClick(navIndex){
        this.navIndex = navIndex
        // await this.$store.dispatch('goodsActive',{
        //   payload:{
        //     page: 1,
        //     per_page: 10,
        //     sort_one: 7,
        //     start_price: 0,
        //     end_price: -1,
        //     sort_kind: 0,
        //     order: 0,
        //   }
      // })
      // consol
    },
    async select(index){
      this.selected = index
      let sort_kind,order
      if(index==2){
        this.time=0
        this.price=0
        this.sale++
        if(this.sale==1){
          sort_kind=1
          order=0
        }else if(this.sale==2){
          sort_kind=1
          order = 1
        }else if(this.sale>=3){
          this.sale=1
        }
      }else if(index==3){
        this.time=0
        this.sale=0
        this.price++
        if(this.price==1){
          sort_kind=2
          order=0
        }else if(this.price==2){
          sort_kind=2
          order = 1
        }else if(this.price>=3){
          this.price=1
        }
      }else if(index==4){
        this.price=0
        this.sale=0
        this.time++
        if(this.time==1){
          order=0
          sort_kind=3
        }else if(this.time==2){
          order = 1
          sort_kind=3
        }else if(this.time>=3){
          this.time=1
        }
        
      }else if(index=1){
        this.price=0
        this.sale=0
        this.time=0
        sort_kind=0
        order =0
      }else{

      }
      await this.$store.dispatch('goodsActive',{
            payload:{
            page:1,
            per_page: 10,
            start_price: 0,
            end_price: -1,
            sort_kind,
            order,
          }
        })
      let result = this.$store.state.goods.goodsAll
      this.total = result.total;
      this.goodsList = result.data
    }
  },
  watch:{
    // navIndex:async function(){
    //     await this.$store.dispatch('goodsActive',{
    //       payload:{
    //         page: 1,
    //         per_page: 10,
    //         sort_one: 7,
    //         start_price: 0,
    //         end_price: -1,
    //         sort_kind: 0,
    //         order: 0,
    //       }
    //   })
    // }
  }
};
</script>

<style lang="stylus" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
    .shop-all-wrap{
        position absolute
        top: 1.4547rem;
        height 100%
        overflow scroll
        // background red
        .goods-sreening{
            position: relative;
            z-index: 222;
            margin: 0 .20513rem;
            overflow: hidden;
            background: #000;
            .goods-type-sreening{
                height: .31282rem;
                width: 6.41026rem;
                padding: .10256rem 0;
                overflow-x: scroll;
                .sreening-all-selections{
                    display flex
                    justify-content: space-around;
                    white-space: nowrap;
                    span{
                        display: inline-block;
                        font-size: .20513rem;
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                    }
                    .sreening-slection{
                        margin 0 .54701rem
                    }
                    .sreening-is-selected{
                        color: #ff5e00;
                    }
                }
            }
            .goods-all-sort{
                display flex
                justify-content: space-between;
                height: .25026rem;
                padding: .08547rem .41026rem;
                border-radius: .06838rem;
                margin-bottom: .20513rem;
                background: #1b1a1b
                .goods-sort{
                    font-size: .17094rem;
                    font-family: PingFangSC-Regular;
                    .sort-switch-btn{
                      display: inline-block;
                      .icon{
                        font-size: .17094rem;
                        width: 1em;
                        height: 1em;
                        vertical-align: -.15em;
                        fill: currentColor;
                        overflow: hidden;
                      }
                    }
                }
                .sort-is-selected{
                    color: #ff5e00;
                }
            }
        }
        .goods-content{
            padding: 0 0.20513rem 0;
        }
    }
</style>