<template>
  <div class="show-list">
    <div class="order-list-wrapper">
      <div class="order-header-title">
        <router-link tag="span" active-class="title-border-active" to="/order/orderlist/ticketlist">演出订单</router-link>
        <router-link tag="span" active-class="title-border-active" to="/order/orderlist/malllist">商品订单</router-link>
      </div>
      <div infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
    .show-list{
        .order-list-wrapper{
            padding: .20564rem .20513rem;
            .order-header-title{
                display: flex;
                -ms-flex-pack: distribute;
                justify-content: space-around;
                color: #fff;
                font-size: .2735rem;
                font-weight: 600;
                line-height: .51282rem;
                padding-bottom: .13675rem;
                .title-border-active{
                    border-bottom: 4px solid #ff5e00;
                }
            }
            
        }
    }
</style>