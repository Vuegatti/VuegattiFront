<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { useAccount } from '@/stores/account.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const accountStore = useAccount()
const Username = ref('')
const Password = ref('')
const users = ref([])
const router = useRouter()

const setUser = () => {
  const logInUsername = Username.value
  accountStore.logIn(logInUsername)
}

const validateUser = () => {
  const foundUser = users.value.find(user => user.username === Username.value)
  if (!foundUser) {
    alert('아이디가 존재하지 않습니다.')
    return
  }
  if (foundUser.password !== Password.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  setUser()
  router.push('/homepage')
}

onMounted(async () => {
  await accountStore.fetchAccount()
  users.value = accountStore.accountInfo
})
</script>

<template>
  <div class="loginPage">
    <div class="logInWrapper">
      <div class="formContainer">
        <h1>Login</h1>
        <p>Glad you're back!</p>
        <form @submit.prevent="validateUser">
          <input
            type="text"
            placeholder="Username"
            v-model="Username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            v-model="Password"
            required
          />
          <BaseButton color="primary" type="submit">Log In</BaseButton>
        </form>
        <p style="text-align: center">
          Don't have an account? <router-link to="/signIn">Sign Up</router-link>
        </p>
      </div>
    </div>
    <div>
      <img src="@/assets/image/Vuegatti_main.png" alt="Vuegatti" />
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--color-text);
}

.loginPage {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  min-height: 100vh;
}
.loginPage img {
  max-height: 80vh;
  max-width: 100%;
  object-fit: contain;
}
.logInWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(248, 244, 242, 0.503);
  border-radius: 10px;
  width: 30vw;
  height: 60vh;
  padding: var(--space-l);
}

.loginPage h1 {
  font-size: 2rem;
  margin-bottom: 0;
}

.loginPage p {
  font-size: 1rem;
  margin-top: var(--space-s);
  margin-bottom: var(--space-m);
}

.formContainer {
  width: 100%;
  justify-content: center;
}

.formContainer form {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  width: 100%;
}

.formContainer form * {
  background-color: transparent;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Noto Sans', sans-serif;
}

.formContainer form input {
  border: 1px solid rgba(248, 244, 242, 0.503);
  color: var(--color-text);
}

input::placeholder {
  color: var(--color-text);
  opacity: 1;
}

.formContainer p:nth-child(1) {
  text-align: center;
}
</style>
