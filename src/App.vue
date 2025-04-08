<script setup>
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
</script>

<template>
  <div class="layout">
    <header><HomeHeader /></header>
    <main><RouterView /></main>
    <HomeFooter />
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
