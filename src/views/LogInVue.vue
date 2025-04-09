<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { useAccount } from '@/stores/account.js'
import { ref } from 'vue'
const accountStore = useAccount()
const Username = ref('')
const setUser = () => {
  const logInUsername = Username.value
  accountStore.logIn(logInUsername)
}
</script>

<template>
  <div class="loginPage">
    <div class="logInWrapper">
      <div class="formContainer">
        <h1>Login</h1>
        <p>Glad you're back!</p>
        <form action="">
          <input type="text" placeholder="Username" v-model="Username" />
          <input type="password" placeholder="Password" />
          <BaseButton type="primary" @click.prevent="setUser"
            >Log In</BaseButton
          >
        </form>
        <p style="text-align: center">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
    <div>
      <img src="@/assets/image/Vuegatti_main.png" alt="Vuegatti" />
    </div>
  </div>
</template>

<style scoped>
/* * {
  color: var(--color-text);
}

.loginPage {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
}

.logInWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(248, 244, 242, 0.503);
  border-radius: 10px;
  width: 20vw;
  height: 60vh;
  padding: var(--space-l);

}

.loginPage h1 {
  font-size: 3rem;
  margin-bottom: 0;
}

.loginPage p {
  font-size: 1rem;
  margin-top: var(--space-s);
}

.formContainer {
  width: 100%;
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
  font-size: 1.2rem;
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
} */
</style>
