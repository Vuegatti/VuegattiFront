<script setup>
import AvartarPicker from '@/components/AvartarPicker.vue'
import { ref } from 'vue'

// const handleSelectedAvatar = value => {
//   avatarNumber.value = value
//   console.log('선택된 아바타 번호:', value)
// }
</script>

<template>
  <div class="container">
    <h2>My Profile</h2>
    <div><AvartarPicker @update:selectedAvatar="handleSelectedAvatar" /></div>
  </div>
</template>

<style scoped>
* {
  color: var(--color-text);
}

.container h2 {
  text-align: center;
}
</style>
