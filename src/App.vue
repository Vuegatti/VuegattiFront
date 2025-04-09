<script setup>
import SideBar from './components/SideBar.vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
import HomePage from './views/HomePage.vue'
import LogIn from './views/LogInVue.vue'
</script>

<template>
  <div class="layout">
    <header>
      <HomeHeader />
    </header>

    <main>
      <SideBar />
      <RouterView />
    </main>

    <footer>
      <HomeFooter />
    </footer>
  </div>
</template>

<style scoped>
.layout > header {
  position: sticky;
}
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
