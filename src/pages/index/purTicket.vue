<template>
  <div class="ticket-wrap" v-if="allTicket.length>0">
    <div class="ticket-purchase-content">
      <div class="purchase-select-type">
        <p class="select-text">选择票种</p>
        <div class="purchase-all-type">
          <div class="ticket-types-content">
            <span
              class="ticket-type"
              v-for="(ticket,index) in allTicket"
              :key="index"
              :class="[ticket[0].isDisabled?'ticket-type-disable':'',index==active?'ticket-type-selected':'']"
              @click="selectTicketType(index)"
            >{{ticket[0].title}}</span>
            <!-- <span class="ticket-type ticket-type-disable">现场票</span> -->
          </div>
          <!---->
        </div>
      </div>
      <div class="purchase-select-time" v-if="showTime" v-show="showTime">
        <p class="select-text">选择时间</p>
        <div class="purchase-all-time">
          <div
            v-if="allTicket[active][0].title=='现场票'"
            :class="selectTime==2?'ticket-type-selected':''"
            @click="selectTimeClick(allTicket[active][0].startAndEnd)"
            class="ticket-type ticket-type-disable"
          >
            <span>{{allTicket[active][0].time_end|timeEnd()}}未开始</span>
          </div>
          <div
            v-else-if="allTicket[active][0].title=='早鸟票'"
            :class="selectTime==0?'ticket-type-selected':''"
            @click="selectTimeClick(allTicket[active][0].startAndEnd)"
            class="ticket-type ticket-type-disable"
          >
            <span>{{allTicket[active][0].time_end|timeEnd()}}已结束</span>
          </div>
          <div
            v-else-if="allTicket[active][0].title=='预售票'"
            class="ticket-type"
            :class="selectTime==1?'ticket-type-selected':''"
            @click="selectTimeClick(allTicket[active][0].startAndEnd)"
          >
            <span>{{allTicket[active][0].time_end|timeEnd()}}</span>
          </div>
        </div>
      </div>
      <div class="order-detail-list" v-if="numberActive" v-show="numberActive">
        <p class="order-detail-text">选择数量</p>
        <div class="order-detail-content">
          <div class="order-detail">
            <div class="order-detail-title">{{allTicket[active][0].title}}</div>
            <div class="order-detail-price">¥{{allTicket[active][0].price|price()}}</div>
            <div class="goods-amount-active">
              <span class="goods-amount-less cssicon yo-ico" @click="less">&#xe643;</span>
              <span class="goods-amount-num">{{sum}}</span>
              <span class="goods-amount-more cssicon yo-ico" @click="more">&#xe642;</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block" ><img style="width:100%;height:100%" src="../../assets/img/pay.png" alt=""></div>
      </div>
    </van-overlay>

    <div data-state="true" class="mark" v-if="markShow" @click="hideMark">
      <div class="bried-info">
        <div class="bried-info-title">{{title}}</div>
        <div class="bried-info-main">
          <div class="bried-info-item cssicon info-time"> <i class="yo-ico">&#xe600;</i>{{allTicket[active][0].time_end|timeEnd()}}</div>
          <div class="bried-info-item cssicon info-site"><i class="yo-ico">&#xe6b7;</i>{{cityName}}·{{fieldName}}</div>
          <div class="bried-info-item cssicon info-ticket"><i class="yo-ico">&#xe602;</i>{{allTicket[active][0].title}} X{{sum}}</div>
        </div>
        <div class="bried-next-btn" @click="submit">确定</div>
        
      </div>
    </div>

    <div class="purchase-next-btn" v-if="numberActive" v-show="numberActive">
      <div class="purchase-total">
        <span class="total-text">合计(不含运费):</span>
        <span class="total-price">¥{{allTicket[active][0].price*sum}}</span>
      </div>
      <div class="pay-btn pay-able" v-if="allTicket[active][0].title=='预售票'" @click="setTlement">结算</div>
      <div class="pay-btn pay-able pay-dis" v-if="allTicket[active][0].title=='早鸟票'">已结束</div>
      <div class="pay-btn pay-able pay-dis" v-if="allTicket[active][0].title=='现场票'">未开始</div>
    </div>
  </div>
</template>

<script>
import { get } from "utils/http";
import moment from "moment";
import Vue from 'vue';
import { Overlay } from 'vant';

Vue.use(Overlay);
export default {
  data() {
    return {
      allTicket: [],
      active: -1,
      showTime: false,
      timeActive: false,
      numberActive: false,
      selectTime: -1,
      sum: 1,
      performance:{},
      markShow:false,
      cityName:'',
      fieldName:'',
      title:'',
      show:false,
    };
  },
  async mounted() {
    
    let {id,cityName,fieldName,title} = this.$route.params
    this.title = title
    this.fieldName = fieldName
    this.cityName = cityName
    // console.log(this.$route.params)
    let result = await get({
      url: "/api/user/ticketV539?",
      params: {
        performance_id: id,
        amid: 0
      }
    });
    // console.log(result);
    this.performance = result.performance
    this.allTicket = result.data;

    this.allTicket.forEach(val => {
      var now = moment()
        .locale("zh-cn")
        .format("YYYY-MM-DD HH:mm:ss");
      if (now > val[0].time_end) {
        (val[0].isDisabled = true), (val[0].startAndEnd = 0); //结束
      } else if (now < val[0].time_end && now > val[0].time_start) {
        (val[0].isDisabled = false), (val[0].startAndEnd = 1); //预售
      } else if (now < val[0].time_start) {
        (val[0].isDisabled = true), (val[0].startAndEnd = 2); //未开始
      }
    });
    // console.log(this.allTicket);
  },
  methods: {
    selectTicketType(index) {
      this.sum = 1;
      this.numberActive = false;
      this.active = index;
      this.showTime = true;
    },
    selectTimeClick(num) {
      this.numberActive = true;
      this.selectTime = num;
    },
    setTlement() {
      this.markShow=true
    },
    hideMark(){
      this.markShow= false
    },
    submit(){
      this.show=true
      // alert("付钱")
    },
    less() {
      this.sum--;
      if (this.sum <= 1) {
        this.sum = 1;
      }
    },
    more() {
      this.sum++;
    }
  },
  filters: {
    timeEnd(val) {
      return val.slice(0, -9).replace(/-/g, ".");
    },
    price(val) {
      return val.slice(0, -3);
    }
  }
};
</script>

<style lang="stylus" scoped>
.ticket-wrap{
    flex 1
    .ticket-purchase-content{
        padding: 0 .20513rem 1.36752rem;
        .purchase-select-type{
            .select-text{
                padding: .20513rem;
                font-size: .2735rem;
                color: #cdcdcd;
            }
            .purchase-all-type{
                background: #1c1a1b;
                border-radius: .06838rem;
                .ticket-types-content{
                    padding: .20513rem;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: start;
                    justify-content: flex-start;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    
                    .ticket-type{
                        height: .34188rem;
                        padding: 0 .25641rem;
                        margin: .20513rem .41026rem .20513rem 0;
                        text-align: center;
                        color: #fff;
                        border: 1px solid #fff;
                        border-radius: .83761rem;
                        line-height: .34188rem;
                    }
                    .ticket-type{
                        height: .34188rem;
                        padding: 0 .25641rem;
                        margin: .20513rem .41026rem .20513rem 0;
                        text-align: center;
                        color: #fff;
                        border: 1px solid #fff;
                        border-radius: .83761rem;
                        line-height: .34188rem;
                    }
                    .ticket-type-disable {
                        background: #4d4d4d;
                        border: 1px solid #4d4d4d;
                        color: #000;
                    }
                    .ticket-type-selected{
                      background: #ff5e00;
                      color: #fff;
                      border: 1px solid #ff5e00;
                    }
                }
                
            }
        }
        .purchase-select-time{
            .select-text{
                padding: .20513rem;
                font-size: .2735rem;
                color: #cdcdcd;
            }
            .purchase-all-time{
                padding: .20513rem;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-pack: start;
                justify-content: flex-start;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                background: #1c1a1b;
                border-radius: .06838rem;
                .ticket-type{
                    height: .34188rem;
                    padding: 0 .25641rem;
                    margin: .20513rem .41026rem .20513rem 0;
                    text-align: center;
                    color: #fff;
                    border: 1px solid #fff;
                    border-radius: .83761rem;
                    line-height: .34188rem;
                }
                .ticket-type-disable {
                    background: #4d4d4d;
                    border: 1px solid #4d4d4d;
                    color: #000;
                }
                .ticket-type-selected {
                    background: #ff5e00;
                    color: #fff;
                    border: 1px solid #ff5e00;
                }
            }
        }
        .order-detail-list{
            .order-detail-text{
                font-size: .23932rem;
                color: #cdcdcd;
            }
            .order-detail-content{
                background: #1c1a1b;
                margin-top: .20513rem;
                border-radius: .06838rem;
                padding: .20513rem;
                .order-detail{
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: center;
                    align-items: center;
                    padding: .06838rem;
                    .order-detail-title{
                        width: 1.88034rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-family: PingFangSC-Regular;
                        color: #cdcdcd;
                    }
                    .order-detail-price{
                        font-size: .34188rem;
                        font-family: DINCond-Black;
                        font-weight: 900;
                        color: #cdcdcd;
                    }
                    .goods-amount-active{
                        display: flex;
                        -ms-flex-align: center;
                        align-items: center;
                        .goods-amount-less.cssicon{
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
                        .cssicon{
                            font-size: .34188rem;
                            padding: 0 .13675rem;
                            color: #979797;
                        }
                    }
                }
            }
        }
    }
    .purchase-next-btn{
        position: fixed;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-align: end;
        align-items: flex-end;
        bottom: 0;
        padding: .13675rem .20513rem;
        width: 94%;
        max-width: 640px;
        background: #1c1a1b;
        .purchase-total{
            display: inline-block;
            .total-price{
                font-size: .2735rem;
                font-weight: 500;
                color: #ff5e00;
            }
        }
        .pay-btn{
            display: inline-block;
            padding: .10256rem .20513rem;
            text-align: center;
            font-size: .30769rem;
            border-radius: .06838rem;
        }
        .pay-able{
            background: #ff5e00;
            color: #fff;
        }
        .pay-dis{
            background: #4d4d4d;
            color: #1c1a1b;
        }
    }
    .mark{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.8);
      z-index: 998;
      .bried-info{
        position: fixed;
        bottom: 40%;
        margin: .20513rem;
        background: #1e1e1e;
        z-index: 1001;
        padding: .20513rem;
        background: #312e2f;
        border-radius: .06838rem;
        .bried-info-title{
          width: 5.58974rem;
          margin: 0 auto;
          padding-bottom: .20513rem;
          border-bottom: 1px solid #484848;
          font-size: .2735rem;
          color: #f2f2f2;
        }
        .bried-info-main{
          padding: .20513rem 0;
          border-bottom: 1px solid #484848;
          color: #b3b3b3;
          .bried-info-item{
            padding: .03419rem 0;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            i{
              margin-right .2rem
            }
          }
        }
        .bried-next-btn{
          margin: .20513rem auto 0;
          display: block;
          width: 3.76068rem;
          padding: .13675rem .20513rem .20513rem;
          background: #ff5e00;
          color: #fff;
          text-align: center;
          font-size: .23932rem;
          border-radius: 3.76068rem;
        }
      }
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 120px;
      height: 120px;
      background-color: #fff;
    }
}
</style>