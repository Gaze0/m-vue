<template>
  <div class="nav-wrap">
    <div class="nav-bar" v-if="$route.path=='/index/home'">
      <span class="nav-item nav-active active" >演出</span>
    </div>
    <div class="nav-bar" v-if="$route.fullPath=='/shop/mall'">
      <router-link tag="span" to="/shop/mall" active-class="active"  class="nav-item nav-active" >推荐</router-link>
      <router-link tag="span" to="/shop/all" active-class="active" class="nav-item nav-active" >分类</router-link>
    </div>
    <div class="nav-bar" v-if="$route.fullPath=='/shop/all'">
      <router-link tag="span" to="/shop/mall" active-class="active"  class="nav-item nav-active" >推荐</router-link>
      <router-link tag="span" to="/shop/all" active-class="active" class="nav-item nav-active" >分类</router-link>
    </div>
    <div class="nav-bar" v-if="$route.fullPath=='/video/videoList'">
      <span class="nav-item nav-active active" >视频</span>
    </div>


    <div class="nav-icons" v-if="$route.path=='/index/home'">
      <router-link tag='span' to='/city' class="nav-ico-location">
        <i class="iconfont yo-ico">&#xe6b7;</i>
        <span class="nav-city">{{$store.state.cityInfo.nm}}</span>
      </router-link>
      <span class="nav-icon-screening" @click="searchIsShow">
        <i class="iconfont yo-ico">&#xe633;</i>
      </span>
    </div>


    <div class="nav-icons" v-if="$route.fullPath=='/video/videoList'">
      <span class="nav-icon-screening" @click="searchIsShow">
        <i class="iconfont yo-ico">&#xe633;</i>
      </span>
    </div>
  </div>
</template>

<script>
import store from 'store'
export default {
  data(){
    return {
        isshow:true,
    }
  },
  // created(){
  //   if(this.nowCity==''){
  //     console.log(this.nowCity)
  //    
  //   }
  // },
  mounted(){
    // let city = sessionStorage.getItem('city')
    // if(city==''){
    //   city='北京'
    // }
    // this.nowCity = city
    store.set('currentCity',{'id':'1','nm':'北京'})
  },
  methods:{
    searchIsShow(){
        this.$emit('getSearchIsShow',this.isshow)
    }
  }
};
</script>

<style lang="stylus" scoped>
.nav-wrap
  display flex
  justify-content space-between
  align-items center
  .nav-bar
    .active
      font-size 0.2906rem
      font-weight 500
      color #fff
      &:after
        content ''
        display block
        width 0.64957rem
        margin-top 6px
        border-bottom 4px solid #ff5e00
        border-top-left-radius 4px
        border-top-right-radius 4px
    // .nav-item
    //   margin-right: .06838rem;
    //   cursor: pointer;
    //   width: .64957rem;
    //   display: inline-block;
    //   text-align: center;
    .nav-active
      margin-right: .06838rem;
      cursor: pointer;
      width: .64957rem;
      display: inline-block;
      text-align: center;
   
  .nav-icons
    display flex
    .nav-ico-location
      color #b3b3b3
      padding-left 0.20513rem
      .nav-city
        font-family DINCond-Black
        font-size 0.23932rem
        padding-bottom 0.08547rem
      .iconfont
        font-size .45rem
        vertical-align middle
    .nav-icon-screening
      color #b3b3b3
      padding 0.08513rem 0 0 0.20513rem
      vertical-align bottom
      .iconfont
        font-size .25rem
        vertical-align bottom
</style>