<script setup></script>

<template>
  <div class="viewWrapper">
    <div class="buttonContainer">
      <router-link to="/logIn"
        ><button class="logInButton">LogIn</button></router-link
      >
      <router-link to="/signIn"
        ><button class="SignInButton">SignIn</button></router-link
      >
    </div>
    <div class="logoContainer">
      <i class="logo"></i>
      <span>Like Bugatti</span>
    </div>

    <div class="iconContainer"></div>
    <img />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap');
/* 로그인, 회원가입 버튼 */
.buttonContainer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-l);
  margin-top: var(--space-l);
  margin-right: var(--space-l);
}

.logInButton {
  padding: 15px 25px;
  background-color: transparent;
  border: 3px solid var(--color-text);
  border-radius: 10px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-text);
  transition: all 0.3s ease;
}
.logInButton:hover {
  background-color: var(--color-text);
  color: var(--color-primary);
  cursor: pointer;
  transform: translateY(-2px);
}

.SignInButton {
  padding: 15px 25px;
  border: 3px solid var(--color-primary);
  background-color: var(--color-primary);
  border-radius: 10px;
  font-family: 'Noto Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  font-style: italic;
  color: var(--color-text);
  transition: all 0.3s ease;
}
.SignInButton:hover {
  cursor: pointer;
  transform: translateY(-2px);
  background-color: var(--color-text);
  color: var(--color-primary);
  border: 3px solid var(--color-text);
}
/* 로고 */
.logoContainer {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: var(--space-l);
  gap: var(--space-m);
}

.logo::after {
  content: '';
  background-image: url('@/assets/image/vuegatti_logo.png');
  background-size: cover;
  width: 550px;
  height: 150px;
  display: inline-block;
  background-position: center;
}
span {
  border: 3px solid var(--color-text);
  padding: 15px;
  font-family: 'Noto Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  font-style: italic;
  color: var(--color-text);
}

.viewWrapper {
  background-image: url('@/assets/image/main_background.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: calc(100vh - 60px);
  width: 100vw;
  background-position: 80% center;
}
</style>
