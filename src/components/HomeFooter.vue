<script setup>
import { ref } from 'vue'
</script>

<template>
  <footer>
    <span>Copyright 2025. Vuegatti. All Rights Reserved.</span>
    <div class="linkContainer">
      <i></i>
      <a href="https://github.com/Vuegatti">https://github.com/Vuegatti</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  font-size: 0.7rem;
  color: var(--color-text);
  padding: var(--space-m);
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  color: var(--color-text);
  /* text-decoration: none; */
}

i::after {
  content: '';
  background-image: url('@/assets/image/github_logo.png');
  background-size: cover;
  width: 20px;
  height: 20px;
  display: inline-block;
}

.linkContainer {
  display: flex;
  gap: var(--space-s);
  align-items: center;
}

.linkContainer :hover {
  cursor: pointer;
}
</style>
