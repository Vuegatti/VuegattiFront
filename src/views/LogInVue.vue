<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <div class="loginPage">
    <div class="logInWrapper">
      <div class="formContainer">
        <h1>Login</h1>
        <p>Glad you're back!</p>
        <form action="">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <BaseButton type="primary">Log In</BaseButton>
        </form>
        <p style="text-align: center">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
    <div>
      <!-- <dotlottie-player
        src="https://lottie.host/854c5717-84ac-4a7e-a572-10767cdd7ad9/lvot0zuptc.lottie"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></dotlottie-player> -->
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
  /* box-shadow: 1 10px 10px rgb(20, 22, 35); */
  /* background: linear-gradient(
    90deg,
    var(--color-background) 0%,
    rgb(41, 44, 63) 80%
  ); */
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
  /* border: 1px solid var(--color-primary); */
  width: 100%;
}
.formContainer form {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  width: 100%;
  gap: var(--space-m);
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
}
</style>
