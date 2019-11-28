<template>
  <div v-if="goodsList.length>0">
    <div class="order-content" v-for="(goodInfo,index) in goodsList" :key="index">
      <div class="order-content-time">{{goodInfo.time}}</div>
      <div class="order-content-detail">
        <div class="info-cover">
          <img :src="goodInfo.goodInfo[0].cover" />
        </div>
        <div class="info-conten-detail">
          <div class="info-detail">
            <div class="info-title">{{goodInfo.name}}</div>
          </div>
          <div class="info-detail">
            <div class="info-style">X{{goodInfo.sum}}</div>
          </div>
        </div>
        <div class="info-price">
          <div class="info-price">¥{{goodInfo.goodInfo[0].price.slice(0,-3)}}</div>
        </div>
      </div>
      <div class="order-content-status">
        <div class="order-content-pay">
          <div class="pay-and-amount">
            <div class="pay-price">¥{{~~(goodInfo.goodInfo[0].price.slice(0,-3))+~~(goodInfo.priceSend)}}</div>
            <div class="pay-amount">共{{goodInfo.sum}}件</div>
          </div>
        </div>
        <div class="order-status">已关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "store";
export default {
  data() {
    return {
      goodsList: []
    };
  },
  mounted() {
    let goodsList = store.get("goodsList");
    this.goodsList = goodsList;
  }
};
</script>

<style lang="stylus" scoped>
.order-content{
    background: #1c1a1b;
    border-radius: .10256rem;
    margin-bottom: .20513rem;
    padding: .20513rem;
    .order-content-time{
        padding-bottom: .10256rem;
        border-bottom: 2px solid #262425;
    }
    .order-content-detail{
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-align: end;
        align-items: flex-end;
        padding-top: .10256rem;
        padding-bottom: .20513rem;
        border-bottom: 2px solid #262425;
        .info-cover{
            width: .68376rem;
            height: .68376rem;
            overflow: hidden;
            border-radius: .06838rem;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            margin-right: .10256rem;
                img{
                    width: .68376rem;
                    height: .68376rem;
                }
        }
        .info-conten-detail{
            width: 3.76068rem;
            .info-detail{
                display: flex;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -ms-flex-align: center;
                align-items: center;
                .info-title{
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    padding-right: .08547rem;
                    margin-bottom: .10256rem;
                }
            }
        }
        .info-price{
            font-size: .34188rem;
            font-weight: 500;
        }
    }
    .order-content-status{
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-align: center;
        align-items: center;
        padding-top: .20513rem;
        .order-content-pay{
            .pay-and-amount{
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                .pay-price{
                    color: #ff5e00;
                    font-size: .34188rem;
                    font-family: DINCond-Bold;
                    margin-right: .41026rem;
                }
            }
        }
    }
}

</style>