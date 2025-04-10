<script setup>
import AvartarPicker from '@/components/AvartarPicker.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedAvatar = ref(null)

const handleSelectedAvatar = value => {
  selectedAvatar.value = value
}

const goBackWithAvatar = () => {
  router.push({
    path: '/mypage',
    query: { avatar: selectedAvatar.value },
  })
}
</script>

<template>
  <div class="container">
    <h2>My Profile</h2>
    <AvartarPicker @update:selectedAvatar="handleSelectedAvatar" />
    <BaseButton color="primary" @click="goBackWithAvatar">Confirm</BaseButton>
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
