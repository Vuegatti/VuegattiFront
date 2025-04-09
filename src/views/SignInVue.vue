<script setup>
import AvartarPicker from '@/components/AvartarPicker.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <div class="SignInPage">
    <i class="logo"></i>
    <div class="container">
      <div><AvartarPicker /></div>
      <div class="signInContainer">
        <h1>Sign In</h1>
        <form action="">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Phone Number" />
          <BaseButton type="primary">Sign In</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
i::after {
  content: '';
  background-image: url('@/assets/image/vuegatti_logo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: block;
  width: 400px;
  height: 100px;
  margin-top: -3rem;
}

.SignInPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
}

.container {
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.container > div:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signInContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  border-radius: 10px;
  padding: 2rem;
  border: 1px solid rgba(248, 244, 242, 0.503);
}

.signInContainer h1 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(248, 244, 242, 0.503);
  background-color: transparent;
  color: white;
  font-size: 1rem;
  outline: none;
}

input::placeholder {
  color: var(--color-text);
}
</style>
