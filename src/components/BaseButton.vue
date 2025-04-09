<script setup>
defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary'].includes(value),
  },
})
</script>

<template>
  <button :class="['button', color]" type="submit">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1.2rem;
  font-family: 'Noto Sans', sans-serif;
  cursor: pointer;
  transition: 0.3s;
}

.button.primary {
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-background) 90%
  );
}

.button.secondary {
  background: linear-gradient(
    90deg,
    var(--color-secondary) 0%,
    var(--color-background) 90%
  );
}
.button:hover {
  filter: brightness(1.2);
}
</style>
