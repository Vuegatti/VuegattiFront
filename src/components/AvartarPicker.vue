<script setup>
import { ref } from 'vue'
import Avatar from '@/components/AvatarPicture.vue'

const selected = ref(1)
// ✅ emit 함수 선언
const emit = defineEmits(['update:selectedAvatar'])

// ✅ selected 값이 바뀔 때마다 emit 호출
const selectAvatar = i => {
  selected.value = i
  emit('update:selectedAvatar', i) // 부모에게 알림
}
</script>

<template>
  <div class="avatar-picker">
    <!-- 선택된 아바타 크게 보여주기 -->
    <Avatar
      :toyNumber="selected"
      :size="144"
      :rounded="24"
      class="selected-avatar"
    />

    <!-- 전체 아바타 리스트 -->
    <div class="avatar-grid">
      <Avatar
        v-for="i in 18"
        :key="i"
        :toyNumber="i"
        :size="76"
        :rounded="12"
        :class="{ selected: i === selected }"
        @click="selectAvatar(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.avatar-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.selected-avatar {
  margin-bottom: 16px;
  /* border: 4px solid white; */
  border-radius: 24px;
}
.avatar-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  border-radius: 12px;
}
</style>
