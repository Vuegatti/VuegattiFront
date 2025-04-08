<script setup>
import { ref } from 'vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
</script>

<template>
  <div class="layout">
    <main><HomeHeader /></main>
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
