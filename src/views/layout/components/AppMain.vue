<template>
  <section class="app-main">
    <github-corner></github-corner>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :exclude="/.*Detail.*/">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import GithubCorner from '@/components/GithubCorner'
  export default {
    name: 'AppMain',
    components:{
      GithubCorner
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style scoped>
  .app-main {
    width: 100%;
    height:100%;
    position: relative;
    overflow-x: hidden;
  }
  .github-corner{
    z-index: 6;
  }
</style>
