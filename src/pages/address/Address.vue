<template>
    <div class="app-wrap">
        <HeaderNav v-if="$route.fullPath == '/address/list'"></HeaderNav>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderNav from 'index/Header'
// import store from 'store'
export default {
    components:{
        HeaderNav,
    },
    // mounted(){
    //     let address = store.get('address')
    // }
}
</script>

<style lang="stylus" scoped>
.app-wrap{
        height 100%
        display flex
        background #000
        flex-direction column
    }
</style>