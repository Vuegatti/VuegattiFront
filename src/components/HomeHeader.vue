<script setup></script>

<template>
  <header>
    <router-link to="/homepage"><i class="logo"></i></router-link>
    <div class="iconContainer">
      <i
        class="fa-regular fa-calendar"
        style="color: var(--color-text); font-size: 1.2rem"
        @click="$router.push('/calendar')"
      ></i>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: var(--space-m);
  display: flex;
  justify-content: space-between;
}

.logo::after {
  content: '';
  background-image: url('@/assets/image/vuegatti_logo.png');
  background-size: cover;
  width: 100px;
  height: 30px;
  display: inline-block;
  background-position: center;
  margin-left: 50px;
}

.iconContainer {
  display: flex;
  gap: var(--space-m);
  height: 30px;
  align-items: center;
}
.iconContainer > .fa-regular {
  cursor: pointer;
}
</style>
