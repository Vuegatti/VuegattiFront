<script setup>
import SideBar from './components/SideBar.vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
</script>

<template>
  <div class="layout">
    <header><HomeHeader /></header>
    <main><RouterView /></main>
    <HomeFooter />
    <SideBar />
    <router-view />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
