<template>
    <div class="app-wrap">
      <header-nav>

      </header-nav>
      <router-view></router-view>
    </div>
</template>

<script>
import HeaderNav from './Header'
export default {
  components:{
    HeaderNav,
  }
}
</script>

<style lang="stylus" scoped>
  .app-wrap
    height 100%
    background #000
    display flex
    flex-direction column
    
</style>
