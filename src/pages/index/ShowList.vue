<template>

    <router-link
      tag="div"
     class="ticket-main-content" 
      :to="`/index/detail/${show.id}`"
    >
      <div class="ticket-poster">
        <img :src="show.img_poster" />
      </div>
      <div class="ticket-info">
        <div class="ticket-info-title">{{show.title}}</div>
        <div class="time-and-tips">
          <div class="ticket-info-time">
            <span class="info-time-text">时间:</span>
            <span class="info-time">{{show.time_start|time()}} 周日</span>
          </div>
        </div>
        <div class="ticket-info-location">
          <span class="info-location-text">地点:</span>
          <span class="info-location">{{show.field_name}}</span>
        </div>
        <div class="ticket-info-tags">标签</div>
        <div class="price-and-favorites">
          <div class="ticket-info-price">
            <span class="info-price">¥{{show.price|price()}}</span>
            <span class="info-price-up">起</span>
          </div>
          <div class="ticket-info-favorites">
            <span class="info-favorites-icon iconfont yo-ico">&#xe906;</span>
            <span class="info-favorites-amount">{{show.save_count}}</span>
          </div>
        </div>
      </div>
    </router-link>

</template>

<script>
export default {
  props:{
    show:{
      type:Object
    },
  },
  filters:{
    time(val){
      return val.slice(0,10)
    },
    price(val){
      return val.slice(0,val.length-1)
    }
  }
};
</script>

<style lang="stylus" scoped>
    
        
        .ticket-main-content{
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            margin-bottom: .20513rem;
            background: #1b1a1b;
            border-radius: .10256rem;
            overflow: hidden;
            .ticket-poster{
                width: 1.69231rem;
                height: 2.25641rem;
                border-radius: .10256rem;
                -ms-flex-negative: 0;
                flex-shrink: 0;
                overflow: hidden;
                img{
                    width: 1.69231rem;
                    height: 2.25641rem;
                    max-width: 100%;
                    border: 0;
                }
            }
            .ticket-info{
                width: 4.47863rem;
                padding: .13675rem .20513rem 0;
                .ticket-info-title{
                    height: .5812rem;
                    font-weight: 600;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    margin-bottom: .03419rem
                   
                }
                 .time-and-tips{
                        display: flex;
                        -ms-flex-pack: start;
                        justify-content: flex-start;
                        -ms-flex-align: center;
                        align-items: center;
                        .ticket-info-time{
                            .info-time-text{
                                    font-size: .17094rem;
                                font-family: PingFangSC-Regular;
                                color: #757575;
                            }
                            .info-time{
                                font-size: .17094rem;
                                font-family: PingFangSC-Regular;
                                color: #757575;
                            }
                        }
                    }
                    .ticket-info-location{
                        .info-location-text{
                                font-size: .17094rem;
                            font-family: PingFangSC-Regular;
                            color: #757575;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            word-break: break-all;
                        }
                        .info-location{
                                font-size: .17094rem;
                            font-family: PingFangSC-Regular;
                            color: #757575;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            word-break: break-all;
                        }
                        
                    }
                    .ticket-info-tags{
                            padding: .03419rem .08547rem;
                            font-size: pxToem(8px);
                            background: #fff;
                            border-radius: .10256rem;
                            font-family: PingFangSC-Regular;
                            opacity: 0;
                        }
                    .price-and-favorites{
                    display: flex;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        -ms-flex-align: center;
                        align-items: center;
                        .ticket-info-price{
                            .info-price{
                                font-size: .41026rem;
                                font-family: DINCond-Black;
                                font-weight: 900;
                                color: #ff5e00;
                            }
                            .info-price-up{
                                    font-size: .17094rem;
                                font-family: PingFangSC-Regular;
                                color: #ff5e00;
                            }
                        }
                        .ticket-info-favorites{
                            .info-favorites-icon{
                              font-size .35rem
                              vertical-align middle
                            }
                            .info-favorites-amount{
                                font-size: .2906rem;
                                margin-left .05rem
                                font-family: DINCond-Black;
                                vertical-align middle
                                font-weight: 900;
                                color: #b3b3b3;
                            }
                        }
                    }
            }
        }
    
</style>