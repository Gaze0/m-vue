<template>
  <div>
    <header>
    <div class="ticket-header">
      <div class="header-main">
        <div class="header-logo-more">
          <div class="header-more" @click="showNav()"></div>
          <div class="header-logo"></div>
        </div>
      </div>
      <div class="mark"  @click="hideNav()" :style="{display:isShowNav?'block':'none'}">
        <div class="user-menu" @click.stop = "showNav()">
          <div class="menu-logo">
            <div class="menu-logo-img"></div>
          </div>
          <div class="user-menu-main">
            <router-link class="menu-user-info" tag="div" to="/login">
              <div class="user-info-headshot">
                <img
                  src="../../assets/img/head.png"
                />
              </div>
              <div class="user-info-name">未登录</div>
            </router-link>
            <div class="menu-main-list">
              <router-link tag="li" to="/index"  @click="hideNav()"  class="main-list-content" active-class="menu-active">
                <div class="list-content">
                  <span class="list-content-icon">
                    <i class="yo-ico" style="font-size:.4769rem;">&#xe602;</i>
                  </span>
                  <span class="list-content-title">演出</span>
                </div>
                <span class="list-content-more yo-ico">&#xe612;</span>
              </router-link >
              <router-link tag="li" to="/shop"  @click="hideNav()"  class="main-list-content" active-class="menu-active">
                <div class="list-content">
                  <span class="list-content-icon">
                    <i class="yo-ico" style="font-size:.3969rem;">&#xe618;</i>
                  </span>
                  <span class="list-content-title">商城</span>
                </div>
                <span class="list-content-more yo-ico">&#xe612;</span>
              </router-link >
              <router-link tag="li" to="/video"   @click="hideNav()" class="main-list-content" active-class="menu-active">
                <div class="list-content">
                  <span class="list-content-icon">
                    <i class="yo-ico" style="font-size:.4269rem;">&#xe685;</i>
                  </span>
                  <span class="list-content-title">视频</span>
                </div>
                <span class="list-content-more yo-ico">&#xe612;</span>
              </router-link >
              <router-link tag="li" to="/inpeople"  @click="hideNav()"  class="main-list-content" active-class="menu-active">
                <div class="list-content">
                  <span class="list-content-icon">
                    <i class="yo-ico" style="font-size:.4069rem;">&#xe601;</i>
                  </span>
                  <span class="list-content-title">入场人</span>
                </div>
                <span class="list-content-more yo-ico">&#xe612;</span>
              </router-link >
              <router-link tag="li" to="/order"   @click="hideNav()" class="main-list-content" active-class="menu-active">
                <div class="list-content">
                  <span class="list-content-icon">
                    <i class="yo-ico" style="font-size:.4269rem;">&#xe627;</i>
                  </span>
                  <span class="list-content-title">我的订单</span>
                </div>
                <span class="list-content-more yo-ico">&#xe612;</span>
              </router-link >
              <router-link tag="li" to="/address"  @click="hideNav()"  class="main-list-content" active-class="menu-active">
                <div class="list-content">
                  <span class="list-content-icon">
                    <i class="yo-ico" style="font-size:.4269rem;">&#xe6b7;</i>
                  </span>
                  <span class="list-content-title">我的地址</span>
                </div>
                <span class="list-content-more yo-ico">&#xe612;</span>
              </router-link >
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav v-if="$route.fullPath!='/city'">
      <Nav @getSearchIsShow="getSearchIsShow"></Nav>
    </nav>
    <TicketScreen
    v-if="$route.fullPath=='/index/home'"
    @getSearchIsShow="getSearchIsShow"
    :style="{display:searchIsShow?'block':'none'}"
    ></TicketScreen>

    <VideoScreen  
    v-else-if="$route.fullPath=='/video/videoList'"
    @getSearchIsShow="getSearchIsShow"
    :style="{display:searchIsShow?'block':'none'}"
    ></VideoScreen>
  </header>
  </div>
</template>

<script>
import TicketScreen from './TicketScreen'
import VideoScreen from './VideoScreen'
import Nav from "./Nav";
export default {
  data(){
    return {
      isShowNav:false,
      searchIsShow:false
    }
  },
  // mounted(){
  //   console.log(this.$route)
  // },
  components: {
    Nav,
    TicketScreen,
    VideoScreen
  },
  methods:{
    showNav(){
      this.isShowNav = !this.isShowNav
    },
    hideNav(){
        this.isShowNav = !this.isShowNav
    },
    getSearchIsShow(data){
      this.searchIsShow=data
    }
  }
};
</script>

<style lang="stylus" scoped>
header{
  background-color: #1b1a1b;
  display flex
  flex-direction column
  // margin-bottom 0.20513rem
  .ticket-header{
    height 0.8547rem
    .header-main{
      background #1b1a1b
      height 0.4447rem
      padding 0.20513rem
      display flex
      align-items center
      .header-logo-more{
        .header-more{
          display inline-block
          color #b3b3b3
          width 0.23932rem
          height 0.23932rem
          margin-right 0.2735rem
          background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAP9JREFUSA3tlTsKAjEQho2FIvg4j15ABEEEb2Fl57Hs7Cy0cC30Hlupi4LiI35TJGRJu2OVgZ9kJss/+8/kUaslSxXQroC1dg4KoGk55CPRYpwgAhfmPecrjntjzKAeJDgFc83pUchDxW38KejIgpLl8K5Q/FHiT7RxBXyPZYmdLZutEX9WWeRJf22JjaQL8ACadoZ8Iom9YgJX/G7pb3Sc6BxnOnki1oNEQsUt/DHQPsdr+vyV5Mn+UgHfY8nGzm4ySK+17EZ/3yVyki7BC2jaHfKZJPaKCRT4mjvaCc1Q3Q/f461bUR53wh8qljt6CDRVy3u8ie5rgslSBSqrwA/oJ26JfgdG7gAAAABJRU5ErkJggg==') no-repeat 0 0
          background-size 0.23932rem 0.23932rem
          background-size cover}
        .header-logo{
          display inline-block
          width 2.20513rem
          height 0.20513rem
          background url('data:image/png;base64,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') no-repeat 0 0
          background-size cover}
      }
    }
    .mark{
      display none
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      z-index: 998;
      .user-menu{
        position: fixed;
        left: 0;
        height: 100%;
        width: 4.30769rem;
        background: #1b1a1b;
        z-index: 1105;
        .menu-logo{
          background: #292929;
          padding: .32479rem 0;
          .menu-logo-img{
            width: 3.4188rem;
            height: .20513rem;
            background: url("../../assets/img/logo.png") no-repeat 0 0;
            background-size: cover;
            margin: 0 auto;
          }
         
        }
        .user-menu-main{
          padding-left: .34188rem;
          .menu-user-info{
            display: flex;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -ms-flex-align: center;
            align-items: center;
            padding: .42735rem .17094rem
            .user-info-headshot{
              width: .51282rem;
              height: .51282rem;
              border-radius: 100%;
              overflow: hidden;
              -ms-flex-negative: 0;
              flex-shrink: 0;
              img{
                width: .51282rem;
                height: .51282rem;
                max-width: 100%;
                border: 0;
              }
              
            }
            .user-info-name{
                padding: 0 .34188rem;
                font-size: .23932rem;
                color: #fff;
                letter-spacing: pxTorme(.4px);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
          }
          .menu-main-list{
            
            .main-list-content {
                display: flex;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -ms-flex-align: center;
                align-items: center;
                padding: 0 .17094rem;
                background: #252525;
                width: 3.58974rem;
                height: .68376rem;
                margin-bottom: .20513rem;
                border-radius: .06154rem;
                color: #fff;
                .list-content{
                  .list-content-icon{
                    color #fff
                  }
                  .list-content-title{
                    padding: 0 .34188rem;
                    font-size: .20513rem;
                  }
                }
            }
            .menu-active{
              background: #fb5d12 !important;
            }
          }
        }
      }
    }
  }
}

  nav{
    flex 1
    padding 0 0.20513rem
  }
</style>