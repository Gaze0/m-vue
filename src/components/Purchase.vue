<template>
  <div class="purchase-wrap">
    <div v-if="goodInfo.length>0">
        <div class="purchase-detail-content">
            <div class="address-info detail-info" @click="changeAddress">
                <div class="address-info-icon yo-ico">&#xe6b7;</div>
                <div class="address-info-detail" v-if="address">
                    <div class="info-name-tel">
                        <div class="info-name">{{address.name}}</div> 
                        <div class="info-tel">{{address.phoneNum}}</div>
                    </div> 
                     <div class="info-location">{{address.pro}}{{address.city}}{{address.area}}{{address.detailAddress}}</div>
                </div>
                <div class="address-info-detail" v-else>
                <div>请选择收货地址</div>
                </div>
                <div class="address-info-icon-more yo-ico">&#xe612;</div>
            </div>
            <div class="products-info detail-info">
                <div class="info-cover">
                <img :src="goodInfo[0].cover" />
                </div>
                <div>
                <div class="info-detail">
                    <div class="info-title">{{name}}</div>
                    <div class="info-price">¥{{goodInfo[0].price}}</div>
                </div>
                <div class="info-detail">
                    <div class="info-style">{{product.value}}</div>
                    <div class="info-style">X{{sum}}</div>
                </div>
                </div>
            </div>
            <div class="order-info detail-info">
                <p>订单明细</p>
                <div class="info-detail">
                <div class="info-every-product">
                    <div class="info-name">{{name}}</div>
                    <div class="info-style">
                    <span>{{product.value}}</span>
                    <span class="info-style-amount">X{{sum}}</span>
                    </div>
                    <div class="info-price">¥{{goodInfo[0].price.slice(0,-3)}}</div>
                </div>
                <div class="order-express">
                    <span>快递费</span>
                    <span>¥{{priceSend.slice(0,-3)}}</span>
                </div>
                </div>
                <div class="order-total">
                <span class="order-total-text">总计</span>
                <span class="order-total-price">¥{{~~(goodInfo[0].price.slice(0,-3) * sum) + ~~(priceSend.slice(0,-3))}}</span>
                </div>
            </div>
            <div class="pay-way">
                <div class="pay-way-title">选择支付方式</div>
                <div class="pay-way-content">
                <div class="wechat-pay "
                 @click="weChect"
                 :class="wechect?'wechat-active':''"
                 >
                    <div class="pay-icon-text">
                    <span class="pay-way-icon yo-ico">&#xe650;</span>
                    <span class="pay-way-text">微信</span>
                    </div>
                    <div class="pay-dot"></div>
                </div>
                <div class="alipay-pay" 
                @click="aliPay"
                :class="alipay?'alipay-active':''"
                >
                    <div class="pay-icon-text">
                    <span class="pay-way-icon yo-ico" style="font-size:.53rem">&#xe64f;</span>
                    <span class="pay-way-text" >支付宝</span>
                    </div>
                    <div class="pay-dot"></div>
                </div>
                </div>
            </div>
        </div>
        <div class="purchase-pay-btn" @click="subMoney">
            <span class="pay-btn">立即支付 ¥ {{~~(goodInfo[0].price.slice(0,-3) * sum) + ~~(priceSend.slice(0,-3))}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { mapState } from 'vuex'
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
    data(){
        return {
            goodInfo:[],
            product:[],
            // sum:0,
            // name:'',
            priceSend:'',
            wechect:true,
            alipay:false,
            address:''
        }
    },
    mounted(){
        // console.log(mapState)
        // console.log(this.$store.state.address.index)
        let index = store.get('index')
        // console.log(index)
        let address = store.get('address')||[]
        
        this.address = address[index]
        // console.log(this.$store.state.purchase)
        let {goodInfo,priceSend} = this.$store.state.purchase
        this.goodInfo = goodInfo
        // console.log(goodInfo[0].product_model)
        this.product = this.goodInfo[0].product_model[0]
        // this.sum=sum,
        // this.name=name
        this.priceSend = priceSend
        // console.log(this.sum)
    },
    methods:{
        aliPay(){
            this.alipay = true,
            this.wechect = false
        },
        weChect(){
            this.alipay = false,
            this.wechect = true
        },
        changeAddress(){
            this.$router.push('/address/list')
        },
        subMoney(){
            let that = this
            if(this.address){
                 Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                    onClose(){
                        that.$store.dispatch('getGoods',that.$store.state.purchase)
                    }
                });
                // Toast.loading({
                //     message: '加载中...',
                //     forbidClick: true,
                //     loadingType: 'spinner',
                //     onClose(){
                        
                //     }
                // });
            }else{
                Toast({
                    message: "请添加地址",
                    position: "center",
                    duration: 3000
                });
              
            }
        }
    },
    computed:{
        ...mapState({
            sum:state=>state.purchase.sum,
            name:state=>state.purchase.name
        })
    }
};
</script>


<style lang="stylus" scoped>
.purchase-wrap{
    flex 1
    .purchase-detail-content{
        padding: .22564rem .20513rem;
        .address-info{
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            .address-info-icon{
                font-size: .42735rem;
                color: #fff;
            }
            .address-info-detail{
                width: 3.84615rem;
                .info-name-tel{
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    font-size: .23932rem;
                    color: #fff;
                    padding: .03419rem 0;
                }
                .info-location{
                    font-size: .17094rem;
                }
            }
            .address-info-icon-more{
                font-size: .20513rem;
                color: #fff;
            }
        }
        .detail-info{
            padding: .20513rem;
            background: #1c1a1b;
            border-radius: .06838rem;
            margin-bottom: .20513rem;
        }
        .products-info{
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            .info-cover{
                width: .68376rem;
                height: .68376rem;
                border-radius: 4px;
                overflow: hidden;
                -ms-flex-negative: 0;
                flex-shrink: 0;
                margin-right: .20513rem;
                img{
                    width: .68376rem;
                }
            }
            div{
                .info-detail{
                    width: 4.70085rem;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: center;
                    align-items: center;
                    .info-title{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-size: .23932rem;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        padding-right: .08547rem;
                    }
                    .info-price{
                        font-size: .30769rem;
                    }
                    .info-style{
                        font-size: .17094rem;
                    }
                }
            }
        }
        .order-info {
            .info-detail{
                padding: .30769rem 0;
                border-bottom: 2px solid #262425;
                margin-bottom: .20513rem;
                .info-every-product{
                    display: flex;
                    -ms-flex-align: center;
                    align-items: center;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    padding-bottom: .10256rem;
                    .info-name{
                        width: 2.01709rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .info-style{
                        width: 2.05128rem;
                        color: #8e8e8e;
                        font-size: .17094rem;
                        .info-style-amount{
                            margin-left: .20513rem;
                        }
                    }
                    .info-price{
                        font-weight: 500;
                    }
                }
                .order-express{
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: center;
                    align-items: center;
                }
            }
            .order-total{
                display: flex;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -ms-flex-align: center;
                align-items: center;
                .order-total-text{
                    font-size: .23932rem;
                }
                .order-total-price{
                    font-size: .34188rem;
                    color: #ff7b00;
                }
            }
        }
        .pay-way{
            .pay-way-title{
                padding: 0 .20513rem .20513rem;
            }
            .pay-way-content{
                padding: .20513rem;
                background: #1c1a1b;
                border-radius: .06838rem;
                .wechat-pay{
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: center;
                    align-items: center;
                    padding-bottom: .20513rem;
                    .pay-icon-text{
                        .pay-way-icon{
                            font-size: .5316rem;
                            padding-right: .30769rem;
                        }
                        .pay-way-text{
                            font-size: .23932rem;
                            font-family: PingFangSC-Semibold;
                            font-weight: 600;
                        }
                    }
                    .pay-dot{
                        width: .23932rem;
                        height: .23932rem;
                        border: 1px solid #fff;
                        border-radius: 50%;
                        text-align: center;
                        line-height: .17094rem;
                        
                    }
                }
                .wechat-active{
                    .pay-way-icon{
                        color: #41b035;
                    }
                    .pay-dot{
                        &:before{
                            content: "";
                            display: inline-block;
                            width: .13675rem;
                            height: .13675rem;
                            border-radius: 50%;
                            background: #ff5e00;
                        }
                    }
                } 
                .alipay-active {
                    .pay-way-icon{
                        color: #00a7ff;
                    }
                    .pay-dot{
                        &:before{
                            content: "";
                            display: inline-block;
                            width: .13675rem;
                            height: .13675rem;
                            border-radius: 50%;
                            background: #ff5e00;
                        }
                    }
                }
                    
                .alipay-pay{
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: center;
                    align-items: center;
                    .pay-icon-text{
                        .pay-way-icon{
                            font-size: .34188rem;
                            padding-right: .30769rem;
                        }
                        .pay-way-text{
                            font-size: .23932rem;
                            font-family: PingFangSC-Semibold;
                            font-weight: 600;
                        }
                    }
                    .pay-dot{
                        width: .23932rem;
                        height: .23932rem;
                        border: 1px solid #fff;
                        border-radius: 50%;
                        text-align: center;
                        line-height: .17094rem;
                    }
                }
            }
        }
    }
    .purchase-pay-btn{
        position: fixed;
        bottom: 0;
        padding: .13675rem .20513rem .20513rem;
        width: 100%;
        max-width: 640px;
        background: #0d0d0d;
        .pay-btn{
            display: inline-block;
            width: 90%;
            padding: .13675rem;
            background: #ff5e00;
            color: #fff;
            font-weight: 500;
            text-align: center;
            font-size: .30769rem;
            border-radius: .06838rem;
            font-family: PingFangSC-Medium;
        }
    }
}
</style>