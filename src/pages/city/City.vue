<template>
    <div class="app-wrap">
        <HeaderNav></HeaderNav>
        <CityList></CityList>
    </div>
</template>

<script>
import HeaderNav from 'index/Header'
import CityList from './CityList'
export default {
    components:{
        HeaderNav,
        CityList
    }
}
</script>

<style lang="stylus" scoped>
    .app-wrap{
        height 100%
        display flex
        flex-direction column
    }
</style>