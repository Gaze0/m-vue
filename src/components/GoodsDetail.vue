<template>
  <div class="content-wrap" >
    <div class="content" v-if="bannerImg.length>0">
      <Banner :goodsImg="bannerImg"></Banner>
      <!-- <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in bannerImg" :key="banner.id">
            <img :src="banner.relation_img" alt @click="$router.push(`/index/detail/${banner.id}`)" />
          </div>
        </div>
        <div class="swiper-pagination bar" style="width:1.8rem;height:.2rem"></div>
      </div>
      </div>-->
      <div class="main">
        <div class="good-detail-content">
          <div class="good-detail-item good-detail-notice" v-if="goodsInfo.notice">
            <div class="notice-text">{{goodsInfo.notice}}</div>
          </div>
          <div class="good-detail-info">
            <div class="detail-info-title">
              <div class="detail-info-name">{{goodsInfo.title}}</div>
              <!---->
            </div>
            <div class="detail-info-price">¥{{goodsInfo.price_st.slice(0,-3)}}</div>
          </div>
          <div class="good-detail-item good-detail-description">
            <strong class="description-text">商品详情</strong>
            <div class="detail-description">
              <transition name="bounce">
                <div
                  class="detail-description-text"
                  ref = "detail"
                >
                  <div class="detail-rich-text" v-html="goodsInfo.detail"></div>
                </div>
              </transition>
              <div @click="isShow">
                <div class="detail-description-more">
                  {{isAll}}
                  <transition>
                    <span
                      :class="isshow?'description-pack-up':'description-more-icon'"
                      class="yo-ico"
                      ref="rotate"
                    >&#xe609;</span>
                  </transition>
                </div>
              </div>
            </div>
          </div>
          <div class="instructions-service">
            <span class="instructions-service-text">联系客服</span>
            <a href="tel:400-1680-650" class="instructions-service-tel">
              <i class="iconfont yo-ico" style="font-size:.4rem">&#xe623;</i>4001680650
            </a>
            <a href="mailto:kefu@zhengzai.tv" class="instructions-service-email">
              <i class="iconfont yo-ico" style="font-size:.24rem">&#xe651;</i>kefu@zhengzai.tv
            </a>
          </div>
        </div>
      </div>
      <div class="foot-btn">
        <div class="ticket-detail-footer">
          <div class="only-buy-btn" @click="buyGoods">购买</div>
        </div>
      </div>
      <div data-state="true" class="mark" v-show="maskIsShow">
        <div class="detail-select-good-type">
          <div class="select-good-cover">
            <img :src="buyGoodsImg" />
          </div>
          <div class="selected-good-type" v-if='specsIsActive'>
            <span class="selected-good-price">¥{{products[0].price.slice(0,-3)}}</span> 
            <span class="selected-good-tip"></span>
          </div>
          <span class="selected-none" v-else>未选择</span>
          <span data-state="true" class="select-good-close yo-ico" @click="closeGoods">&#xe63d;</span>
          <div class="please-select-type">
            <!---->
            <div class="detail-type-model" >
              <div class="detail-type"
              v-for="(model,index) in typeModel"
              :key="index">
                <div class="type-title">{{model.name}}</div>
                <div class="type-list">
                  <div class="type-list-item"
                    v-for="(value,inx) in model.model_value"
                    :key="inx"
                    :class="value.value==id[index]?'active':''"
                    ref="isdisable"
                    @click="select(index,inx)">
                    {{value.value}}
                    <!-- <div :v-for='value.id' >{{value.value}}</div> -->
                    </div>
                </div>
              </div>

            </div>
            <div class="select-goods-amount">
              <div class="goods-amount-active">
                <span class="goods-amount-text">数量</span>
                <span class="goods-amount-less yo-ico" @click="cutNum">&#xe643;</span>
                <span class="goods-amount-num">{{goodsSum}}</span>
                <span class="goods-amount-more yo-ico" @click="addNum">&#xe642;</span>
              </div>
            </div>
            <div class="confirm-the-style confirm-style-active" @click="submitTip()">确认</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="height:100%;width:100%;background:#000">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "../libs/swiper.css";
import { get } from "utils/http";
import _ from 'lodash'
import Loading from './Loading'
import Banner from "index/Banner";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      buyGoodsImg:'',
      goodsInfo: {},
      bannerImg: [],
      isshow: false,
      maskIsShow:false,
      specsIsActive:false,
      specsActive:'',
      goodsSum:1,
      products:[],
      typeModel:[],
      id: [],
      goodPrice:'',
      screenProducts:[],
      isAddCut:false,
      moreBtn:true,
      height:0,
      isAll:'查看全部'
    };
  },
  async mounted() {
    this.goodsSum = 1
    this.buyGoodsImg = this.$router.meta
    let id = this.$route.params.id;
    let result = await get({
      url: "/api/user/goodDetailH5",
      params: {
        id
      }
    });
    console.log(result);
    this.goodsInfo = result.good;
    this.bannerImg = result.good.good_imgs;

    let purductResult = await get({
      url:'/api/user/productListV539',
      params:{
        good_id:id
      }
    })
    console.log(purductResult)
    // this.products = purductResult
    this.typeModel = purductResult.model
    for(var i=0;i<this.typeModel.length;i++){
        this.id.push('')
    }
    this.products = purductResult.products
    // console.log(this.id)
    // await this.$nextTick();
    setTimeout(()=>{
      this.getHeight()
    },300)
  },
  methods: {
    //商品详情高度动画
    async getHeight(){
      await this.$nextTick(()=>{
        this.height = this.$refs.detail.offsetHeight
      })
      if(this.$refs.detail.offsetHeight<=400){
        this.moreBtn= false
      }else{
        this.$refs.detail.style.height = '400px'
      }
    },

    //详情是否全显示
    isShow() {
      this.isshow = !this.isshow;
    },
    //是否点击购买
    buyGoods(){
      this.maskIsShow = true
    },
    //关闭购买商品
    closeGoods(){
      this.maskIsShow = false
    },
    //规格
    // specs(){
     
    //     this.specsIsActive = true
      
    // },
    //提交订单
    submitTip(){
      if(this.specsIsActive){
        let id = this.$route.params.id;
        this.$store.dispatch('getPurchase',{
          payload:{
            id,
            goodInfo:this.screenProducts,
            sum:this.goodsSum,
            name:this.goodsInfo.title,
            priceSend:this.goodsInfo.price_send
          }
        })
        // console.log(this.$router.currentRoute.meta)
        // this.$route.params.goodInfo =this.screenProducts 
        // this.$route.params.sum =this.goodsSum
        // this.$router.push(`/shop/purchase/${id}`)
        this.$router.push({name:'purchase',params:{id:id,goodInfo:this.screenProducts,sum:this.goodsSum,name:this.goodsInfo.title,priceSend:this.goodsInfo.price_send}})
      }else{
        Toast({
            message: "请选择商品^_^",
            position: "center",
            duration: 2000
          });
      }
      
    },
    //处理选择的商品
    select(index,ind){
      var itemId = this.typeModel[index].model_value[ind].value; //获取选中的id号
      if(this.id.indexOf(itemId)!=-1){
        this.id.splice(index,1,'')
      }else{
        this.id.splice(index, 1, itemId);
      }
      let flag = 0
      for(var i=0;i<this.id.length;i++){
        flag= 1
        if(this.id[i]==''){
          flag = 0
          break;
        }
      }
      if(flag==1){
        this.specsIsActive = true
        // this.buyGoodsImg = 
        dealProducts(this)
        this.isAddCut = true
      }else if(flag==0){
        this.specsIsActive = false
        this.isAddCut = false
      }
      
      // 处理products
      function dealProducts(that){
        let indexLength = that.id.length
        let index = 0
        let result = that.products
        while(indexLength>index){
          result = result.filter((val)=>{
            return  val.product_model[index].value == that.id[index]
          })
          index++;
        }
        if(result.length==0){
          Toast({
            message: "没这个了，看看别的吧^_^",
            position: "center",
            duration: 3000
          });
          that.isAddCut = false
        }else{
          that.screenProducts = result
          that.buyGoodsImg = result[0].cover
        }
      }
       //替换数组id[]中对应的元素，获得所有选中的id
    },
    //减少数量
    cutNum(){
      if(this.isAddCut){
        this.goodsSum--
        if(this.goodsSum<=1){
          this.goodsSum=1
        }
      }else{
        Toast({
            message: "请先选择款式",
            position: "center",
            duration: 2000
        });
      }
      
    },
    //增加数量
    addNum(){
      if(this.isAddCut){
        this.goodsSum++
        let sum = this.screenProducts.surplus
        if(this.goodsSum>sum){
          this.goodsSum = sum
          Toast({
              message: "这个款式只有这么多额^_^",
              position: "center",
              duration: 3000
          });
        }
      }else{
        Toast({
            message: "请先选择款式",
            position: "center",
            duration: 2000
        });
      }
      

    }
  },
  components: {
    Banner,
    Loading
  },
   watch:{  
      "isshow"(){
        if(this.isshow){
          this.$refs.detail.style.height = this.height + 'px'
          this.isAll = "收起"
        }else{
          this.$refs.detail.style.height = "400px"
          this.isAll = "查看全部"
        }
      }
    }
};
</script>

<style lang="stylus">
.content-wrap{
    display flex
    flex-direction column
    padding:0 0 .68376rem 0;
    overflow scroll
    .content{
      .banner{
          width 100%
          height 2.94017rem
          .swiper-container{

              height 100%
              .swiper-wrapper{
                  background #fff
              .swiper-slide{
                  background #fff
                  width: 375px;
                  border none
              }
                  img{
                      display block
                      margin  auto
                      height 100%
                  }
                  
              
              }
              .my-bullet{
                  width 0.1rem
                  height 0.1rem
                  border-radius 100%
                  background #ccc
                  display inline-block
                  margin-right 0.2rem

              }
              .my-bullet-active{
                  width 0.2rem
                  height 0.1rem
                  display inline-block
                  border-radius 100%
                  opacity 1
                  background #007aff
              }
          }
      }
      .main{
          flex 1
          .good-detail-content{
              padding: 0 .20513rem .30513rem;
               .good-detail-item{
                padding: .17094rem .20513rem;
                background: #1c1a1b;
                margin-bottom: .20513rem;
                .description-text{
                  font-size: .2735rem;
                  font-family: PingFangSC-Medium
                }
                .detail-description{
                  position: relative;
                  background: #1b1a1b;
                  padding-top: .13675rem;
                  .detail-description-text{
                    transition: height 0.4s ease 0s;
                    overflow: hidden
                    
                    .detail-rich-text{
                      p{
                        text-align: left;
                        font-size: .20513rem;
                        font-family: PingFangSC-Regular;
                        color: #a2a2a2!important;
                        img{
                          max-width: 100%;
                          border: 0;
                        }
                      }
                    }
                  }
          
                  .detail-description-more{
                    padding-top: .20513rem;
                    bottom: 0;
                    text-align: center;
                    font-size: .20513rem;
                    color: #fff;
                    .description-more-icon{
                      font-size: .13675rem;
                    }
                  }
                }
              }
              .good-detail-notice{
                text-align: center;
                color: #ff7b00;
                .notice-text{
                  display: inline-block;
                  text-align: left;
                  color: #ff7b00;
                  font-size 12px
                }
              }
              .good-detail-info{
                  display: flex;
                  -ms-flex-pack: justify;
                  justify-content: space-between;
                  -ms-flex-align: start;
                  align-items: flex-start;
                  padding: 0 .20513rem;
                  background: #1c1a1b;
                  margin-bottom: .20513rem;
                  .detail-info-title{
                    color: #fff;
                    width: 3.62393rem;
                    .detail-info-name{
                      margin: .17094rem 0;
                      font-size: .30769rem;
                      font-family: PingFangSC-Medium;
                      font-weight: 500;
                      color: #f2f2f2;
                    }
                  }
                  .detail-info-price{
                    font-size: .92308rem;
                    font-weight: 700;
                    color: #ff7b00;
                  }
              }
             
              .good-detail-description{
                    overflow: hidden;
                  color: #cdcdcd
              }
              .instructions-service{
                display: flex;
                -ms-flex-pack: distribute;
                justify-content: space-around;
                -ms-flex-align: center;
                align-items: center;
                padding: .10256rem 0;
                margin-bottom: .20513rem;
                border-radius: 6px;
                font-size: .20513rem;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: #cdcdcd;
                background: #1b1a1b;
                .instructions-service-text{
                  font-size: .20513rem;
                  font-family: PingFangSC-Semibold;
                  font-weight: 600;
                  color: #cdcdcd;
                }
                .instructions-service-tel,.instructions-service-email{
                  color: #a2a2a2;
                }
              }
          }
      }
      .foot-btn{
          position: fixed;
          bottom: 0;
          width: 100%;
          max-width: 640px;
          background: #1c1a1b;
          padding: .13675rem .20513rem;
          .ticket-detail-footer{
              width: 100%;
              max-width: 640px;
              background: #1c1a1b;
              .only-buy-btn  {
                  width 94%
                  height: .68376rem;
                  background: #ff5e00;
                  border-radius: .10256rem;
                  color: #fff;
                  font-size: .34188rem;
                  font-family: PingFangSC-Semibold;
                  font-weight: 600;
                  text-align: center;
                  line-height: .68376rem;
              }
              .stop-sell-btn{
                  background: #4d4d4d;
                  color: #000;
              }
          }
      }
      .mark{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: 998;
        .detail-select-good-type{
          position: fixed;
          bottom: 0;
          width: 100%;
          max-width: 640px;
          background: #1e1e1e;
          z-index: 1001;
          .select-good-cover{
            width: 1.36752rem;
            height: 1.36752rem;
            position: absolute;
            left: .20513rem;
            top: -.68376rem;
            background: #fff;
            border-radius: .10256rem;
            overflow: hidden;
            img{
              width: 1.36752rem;
              height: 1.36752rem;
            }
          }
          .selected-good-type{
              position: absolute;
              top: 0;
              left: 1.77778rem;
              .selected-good-price{
                font-size: .61538rem;
                font-family: DINCond-Bold;
                font-weight: 700;
                padding-right: .10256rem;
                color: #ff7b00;
              }
              .selected-good-tip{
                font-size: .17094rem;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: #ff7b00;
              }
          }
          .selected-none{
            position: absolute;
            top: .42735rem;
            left: 1.77778rem;
            font-size: .17094rem;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #8e8e8e;
          }
          .select-good-close{
            position: absolute;
            top: 0;
            right: 0;
            padding: .20513rem;
            font-size: .34188rem;
            color: #514f50;
          }
          .please-select-type{
            padding: 1.09402rem .20513rem .41026rem;
            .detail-type-model{
              color: #fff;
              max-height: 2.13675rem;
              overflow: scroll
              .detail-type{
                display: flex;
                margin-bottom: .17094rem;
                .type-title{
                  flex-shrink: 0;
                  height: .42735rem;
                  line-height: .42735rem;
                  font-size: .23932rem;
                  color: #cdcdcd;
                  margin-right: .25641rem;
                }
                .type-list{
                  flex-grow: 1;
                  -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
                  display: -ms-flexbox;
                  display: flex;
                  .type-list-item{
                    padding: .05128rem .23932rem;
                    border: 1px solid #fff;
                    border-radius: .34188rem;
                    margin-right: .17094rem;
                    margin-bottom: .20513rem;
                  }
                 
                }
                .active{
                  background-color: #ff7b00;
                  color: #000;
                  border: 1px solid #ff7b00;
                }
              }
            }
            .select-goods-amount{
              display: flex;
              -ms-flex-pack: justify;
              justify-content: space-between;
              padding: 0 0 .20513rem;
              .goods-amount-active{
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                .goods-amount-text{
                  font-size: .23932rem;
                  font-family: PingFangSC-Regular;
                  color: #cdcdcd;
                  margin-right: .2735rem;
                }
                .goods-amount-less{
                  font-size: .34188rem;
                  padding: 0 .13675rem;
                  color: #979797;
                }
                .goods-amount-num{
                  width: .68376rem;
                  height: .41026rem;
                  background: #2e2e2e;
                  border-radius: .06838rem;
                  text-align: center;
                  line-height: .41026rem;
                  font-size: .23932rem;
                  color: #d8d8d8;
                }
                .goods-amount-more{
                  font-size: .34188rem;
                  padding: 0 .13675rem;
                  color: #979797;
                }
              }
            }
            .confirm-the-style{
              width: 5.60684rem;
              height: .68376rem;
              margin: .20513rem auto 0;
              background: #404040;
              border-radius: .10256rem;
              font-size: .30769rem;
              font-weight: 500;
              font-family: PingFangSC-Medium;
              color: #fff;
              text-align: center;
              line-height: .68376rem;
            }
            .confirm-style-active{
              background: #ff7b00;
              color: #1e1e1e;
            }
          }
        }
      }
    }
    .description-pack-up{
      display: inline-block;
      padding-right: .06838rem;
      font-size: .13675rem;
      transition: transform .4s;
      -ms-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
}
   
</style>