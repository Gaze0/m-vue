<template>
  <div data-state="true" class="mark">
    <div data-state="true" class="mark">
      <div class="goods-screening">
        <div class="goods-screening-content">
          <div class="goods-screening-price">
            <div class="screening-price-text">价格</div>
            <div class="screening-price-price">¥0-500+</div>
          </div>
          <div class="goods-screening-select">
              <van-slider v-model="value" @change="onChange" />
          </div>
          <!---->
        </div>
        <div class="goods-screening-btn">
          <span class="screening-btn-reset">重置</span>
          <span class="screening-btn-submit">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Slider } from "vant";

Vue.use(Slider);
export default {
    data() {
    return {
      value: 50
    };
  },

  methods: {
    onChange(value) {
      this.$toast('当前值：' + value);
    }
  }
};
</script>

<style lang="stylus">
    .mark{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        z-index: 998;
        .goods-screening{
            position: fixed;
            top: 2.5641rem;
            width: 6rem;
            left: 50%;
            transform: translateX(-3.00855rem);
            background: #1e1e1e;
            z-index: 1001;
            .goods-screening-price{
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                -ms-flex-pack: justify;
                justify-content: space-between;
                padding: .17094rem .41026rem;
                .screening-price-text{
                        color: #fff;
                    font-size: .2735rem;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                }
                .screening-price-price{
                    color: #ff5e00;
                    font-size: .34188rem;
                    font-family: DINCond-Bold;
                }
            }
            .goods-screening-select{
                padding-top: .61538rem;
                .dot-and-line{
                    width: 4.75214rem;
                        margin: 0 auto;
                }
                .min-and-max{
                    display: flex;
                    width: 4.75214rem;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    margin-left: .68376rem;
                    padding-bottom: .41026rem;
                    span{
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                        color: #cdcdcd;
                    }
                }
            }
            .goods-screening-btn{
                display: flex;
                -ms-flex-pack: justify;
                justify-content: space-between;
                padding: .17094rem .41026rem;
                .screening-btn-reset{
                    width: 2.39316rem;
                    height: .47863rem;
                    text-align: center;
                    border: 2px solid #cdcdcd;
                    border-radius: 2px;
                    color: #cdcdcd;
                    line-height: .47863rem;
                    font-size: .23932rem;
                    font-weight: 600;
                }
                .screening-btn-submit{
                    width: 2.39316rem;
                    height: .47863rem;
                    text-align: center;
                    border: 2px solid #cdcdcd;
                    border-radius: 2px;
                    line-height: .47863rem;
                    font-size: .23932rem;
                    font-weight: 600;
                    border: 2px solid #ff5e00;
                    border-radius: 2px;
                    background: #ff5e00;
                    color: #fff;
                }
            }
        }
    }
</style>