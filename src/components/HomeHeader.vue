<script setup></script>

<template>
  <header>
    <i class="logo"></i>
    <!-- <img src="../assets/vuegatti logo.png" alt="logo" /> -->
    <div class="iconContainer">
      <font-awesome-icon
        :icon="['far', 'calendar']"
        style="color: var(--color-text); font-size: 1.2rem"
      />
      <font-awesome-icon
        :icon="['far', 'bell']"
        style="color: var(--color-text); font-size: 1.2rem"
      />
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
  background-image: url('../assets/vuegatti logo.png');
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
