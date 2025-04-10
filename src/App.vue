<script setup>
import { useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="layout">
    <header>
      <HomeHeader
        v-if="
          !route.path.startsWith('/logIn') &&
          !route.path.startsWith('/signIn') &&
          !route.path.startsWith('/main')
        "
      />
    </header>

    <main>
      <SideBar
        v-if="
          !route.path.startsWith('/logIn') &&
          !route.path.startsWith('/signIn') &&
          !route.path.startsWith('/main')
        "
      />
      <RouterView />
    </main>

    <footer>
      <HomeFooter
        v-if="
          !route.path.startsWith('/logIn') &&
          !route.path.startsWith('/signIn') &&
          !route.path.startsWith('/main')
        "
      />
    </footer>
  </div>
</template>

<style scoped>
.layout > header {
  position: sticky;
  top: 0;
  z-index: 100;
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
