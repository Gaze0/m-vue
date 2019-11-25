<template>
  <div class="loading-wrrap">
    <div class="loader">
        <div class="text">Loading...</div>
        <div class="horizontal">
        <div class="circlesup">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
        <div class="circlesdwn">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
        </div>
        <div class="vertical">
        <div class="circlesup">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
        <div class="circlesdwn">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import '../libs/style-1.css'
export default {};
</script>

<style lang="stylus" scoped>
    .loading-wrap{
        position absolute
        width 100%
        height 100%
    }
</style>