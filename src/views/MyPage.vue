<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Avatar from '@/components/AvatarPicture.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const ID = localStorage.getItem('userId')

const username = ref('')
const password = ref('')
const email = ref('')
const phonenumber = ref('')
const userIdInDB = ref(null)

const avatarNumber = ref(1) ////

onMounted(async () => {
  if (route.query.avatar) {
    avatarNumber.value = parseInt(route.query.avatar)
  } else {
    try {
      const { data } = await axios.get(
        `http://localhost:5001/account?userID=${ID}`,
      )
      console.log('GET 결과:', data)
      const user = data[0]
      if (user) {
        userIdInDB.value = user.id
        username.value = user.username
        password.value = user.password
        email.value = user.email
        phonenumber.value = user.phoneNumber || ''
        avatarNumber.value = user.avatarNumber
      } else {
        alert('사용자 정보를 찾을 수 없습니다.')
      }
    } catch (error) {
      console.error('GET 요청 실패:', error)
    }
  }
})

const save = async () => {
  const updateData = {
    username: username.value,
    password: password.value,
    email: email.value,
    phoneNumber: phonenumber.value,
    avatarNumber: avatarNumber.value,
  }

  if (userIdInDB.value !== null) {
    try {
      await axios.patch(
        `http://localhost:5001/account/${userIdInDB.value}`,
        updateData,
      )
    } catch (error) {
      console.error('PATCH 요청 실패:', error)
    }
  } else {
    alert('사용자 ID를 찾을 수 없습니다.')
  }
}
</script>

<template>
  <div class="mypage-container">
    <div class="mypage-box">
      <h2>My page</h2>
      <p>Edit your information</p>

      <router-link :to="`/mypageprofile`">
        <Avatar :toyNumber="avatarNumber" :size="150" :rounded="24" />
      </router-link>

      <form @submit.prevent="save">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Email" />
        </div>

        <div class="form-group">
          <label for="phonenumber">Phonenumber</label>
          <input
            v-model="phonenumber"
            type="tel"
            id="phonenumber"
            placeholder="Phonenumber"
          />
        </div>

        <div class="button-group">
          <BaseButton color="primary" @click="save">Confirm</BaseButton>
          <BaseButton
            color="secondary"
            @click="$router.push('/BankAccountSelect')"
            >Edit Account</BaseButton
          >
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

form .form-group {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 5px;
  color: var(--color-text);
}

form .form-group label {
  width: 120px;
  text-align: left;
  padding-right: 10px;
  font-weight: bold;
}

form .form-group input {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--color-text);
  border-radius: 6px;
  background-color: transparent;
  color: var(--color-text);
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
