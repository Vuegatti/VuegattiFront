<script setup></script>

<template>
  <header>
    <i class="logo"></i>
    <!-- <img src="../assets/vuegatti logo.png" alt="logo" /> -->
    <div class="iconContainer">
      <i
        class="fa-regular fa-calendar"
        style="color: var(--color-text); font-size: 1.2rem"
      ></i>
      <i
        class="fa-regular fa-bell"
        style="color: var(--color-text); font-size: 1.2rem"
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
}

.iconContainer {
  display: flex;
  gap: var(--space-m);
  height: 30px;
  align-items: center;
}
</style>
