<script setup>
import { ref } from 'vue'
import Avatar from '@/components/AvatarPicture.vue'
import BaseButton from '@/components/BaseButton.vue'

// 폼 입력
const username = ref('idsample')
const password = ref('********')
const email = ref('test@gmail.com')
const phonenumber = ref('010-1234-5678')

// 저장 버튼 핸들러
const save = () => {
  console.log('저장됨:', {
    username: username.value,
    password: password.value,
    email: email.value,
    phonenumber: phonenumber.value,
  })
}
</script>

<template>
  <div class="mypage-container">
    <div class="mypage-box">
      <h2>My page</h2>
      <p>Edit your information</p>

      <!-- 프로필 이미지 -->
      <Avatar :toyNumber="1" :size="150" :rounded="24" />

      <form action="">
        <!-- 입력 폼 -->
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="phonenumber" type="tel" placeholder="Phonenumber" />

        <!-- 버튼 -->
        <div><BaseButton color="primary">Edit Account</BaseButton></div>
        <div>
          <BaseButton color="secondary" @click="save">Confirm</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--color-text);
}
.mypage-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  color: white;
  gap: 5vw;
}

.mypage-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(248, 244, 242, 0.503);
  border-radius: 10px;
  text-align: center;
  width: 50%;
  height: 60%;
  padding: var(--space-l);
}

.mypage-box h2 {
  margin-bottom: 5px;
}
.mypage-box p {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 20px;
}

.formContainer form * {
  background-color: transparent;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1.2rem;
  font-family: 'Noto Sans', sans-serif;
}

form input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  border-radius: 6px;
}

form div {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  color: var(--color-text);
}

form div > * {
  width: 100%;
  padding: 10px; /* ✅ 높이 맞추기 */
  box-sizing: border-box;
}

input::placeholder {
  color: #aaa;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
