<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import AvartarPicker from '@/components/AvartarPicker.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const route = useRoute()

// 현재 로그인된 사용자 ID
const userId = localStorage.getItem('userId')

// 선택된 아바타
const selectedAvatar = ref(1)
const dbId = ref(null)

const handleSelectedAvatar = value => {
  selectedAvatar.value = value
}

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:5001/account?userID=${userId}`,
    )
    const user = data[0]
    if (user) {
      dbId.value = user.id
      selectedAvatar.value = user.avatarNumber // 기존 아바타 번호 적용
    }
  } catch (err) {
    console.error('유저 정보 불러오기 실패:', err)
  }
})

// 저장 + MyPage로 이동
const saveAvatar = async () => {
  try {
    await axios.patch(`http://localhost:5001/account/${dbId.value}`, {
      avatarNumber: selectedAvatar.value,
    })

    // MyPage로 이동 + avatar 쿼리로 전달
    router.push({
      path: '/mypage',
      query: { avatar: selectedAvatar.value },
    })
  } catch (err) {
    console.error('아바타 저장 실패:', err)
  }
}
</script>

<template>
  <div class="container">
    <h2>My Profile</h2>

    <!-- 아바타 선택 -->
    <AvartarPicker
      :selected="selectedAvatar"
      @update:selectedAvatar="handleSelectedAvatar"
    />

    <!-- 확인 버튼 -->
    <div class="button-wrapper">
      <BaseButton color="primary" @click="saveAvatar">Confirm</BaseButton>
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--color-text);
}

.container {
  text-align: center;
  padding: 2rem;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
