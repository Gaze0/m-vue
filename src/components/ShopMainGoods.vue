<template>
    <!-- <div class="goods-list"> -->
        <div class="good-content" @click="goodsClick(good.id,good.cover)">
            <div class="main-good-cover">
                <img :src="good.cover" alt="">
            </div>
            <div class="main-good-title">{{good.title}}</div>
            <div class="main-good-buy">
                <span class="main-good-price">¥{{good.price_et}}</span>
                <div class="good-buy-btn">购买</div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>

export default {
    props:{
        good:{
            type:Object
        }
    },
     methods:{
        goodsClick(good_id,img){
            this.$router.push(`/shop/goodsdetail/${good_id}`)
            this.$router.meta = img
        }
    }
}
</script>

<style lang="stylus" scoped>
    // .goods-list{
        .good-content{
            display: inline-block;
            margin-bottom: .20513rem;
            width: 2.90598rem;
            height: 4.35897rem;
            border-radius: .06838rem;
            background: #1c1a1b;
            overflow: hidden;
            // background red;
            .main-good-cover{
                width: 2.90598rem;
                height: 2.90598rem;
                img{
                    width 100%
                    height 100%
                    border 0
                }
            }
            .main-good-title{
                padding: 0 .20513rem;
                height: .64957rem;
                box-sizing: border-box;
                margin: .13675rem 0 .10256rem;
                font-size: .23932rem;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                line-height: .34188rem;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #cdcdcd;
            }
            .main-good-buy{
                display: flex;
                -ms-flex-pack: justify; 
                justify-content: space-between;
                -ms-flex-align: end;
                align-items: flex-end;      
                padding: 0 .20513rem;
                .main-good-price{
                    font-size: .47863rem;
                    font-family: DINCond-Black;
                    font-weight: 900;
                    color: #cdcdcd;
                    line-height: .37607rem;
                }
                .good-buy-btn{
                    height: .30769rem;
                    width: .76923rem;
                    display: inline-block;
                    text-align: center;
                    border-radius: .18803rem;
                    line-height: .30769rem;
                    font-size: .17094rem;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    background: #ff5e00;
                    color: #1c1a1b;
                }
            }
        }
        .good-content:nth-child(2n){
            margin-left: .17094rem;
        }
    // }
</style>