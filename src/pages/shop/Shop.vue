<template>
    <div class="app-wrap">
        <header-nav>
            
        </header-nav>
       <div class="main-con" v-if="($route.fullPath=='/shop/mall')||($route.fullPath=='/shop/all')">
        <transition
        :enter-active-class="`animated ${enterClassName}`"
        :leave-active-class="`animated ${leaveClassName}`"
      >
        <router-view></router-view>
        </transition>
       </div>
       <div v-else>
           <router-view></router-view>
       </div>
    </div>
</template>

<script>
import 'animate.css'
import headerNav from '../index/Header'

export default {
    data(){
        return {
            enterClassName:'',
            leaveClassName:''
        }
    },
    mounted(){
        // console.log(this.$refs.GetImg())
    },
    components:{
        headerNav,
    },
    // methods:{
    //     GetImg(imgs){
    //         this.bannerImg = imgs
    //     }
    // }
    watch:{
        $route(to,from){
        console.log(to,from)
        if(to.name=='mall'&&from.name=='all'){
            this.enterClassName = 'slideInLeft'
            this.leaveClassName = 'slideOutRight'
        }else if(to.name=='all'&&from.name=='mall'){
            this.enterClassName = 'slideInRight'
            this.leaveClassName = 'slideOutLeft'
        }
        }
    }
}
</script>

<style lang="stylus" scoped>
.app-wrap{
    height 100%
    background #000
    display flex
    flex-direction column
    position relative
    .main-con{
        height 100%
        overflow scroll
    }
}
</style>