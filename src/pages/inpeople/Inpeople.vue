<template>
    <div class="app-wrap">
        <HeaderNav v-if="$route.fullPath=='/inpeople/peoplelist'"></HeaderNav>
        <!-- <InpeopleMain></InpeopleMain> -->
        <router-view></router-view>

    </div>
</template>

<script>
import HeaderNav from 'index/Header'
// import InpeopleMain from './InpeopleMain'
export default {
    components:{
        HeaderNav,
        // InpeopleMain
    }
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