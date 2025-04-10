<script setup>
import AvartarPicker from '@/components/AvartarPicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useAccount } from '@/stores/account.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const accountStore = useAccount()
const router = useRouter()
const Username = ref('')
const Password = ref('')
const ConfirmPassword = ref('')
const Email = ref('')
const regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
const PhoneNumber = ref('')
const regPhoneNumber = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/
const avatarNumber = ref(1)

const isUsernameValid = ref(true)
const isPasswordValid = ref(true)
const isConfirmPasswordValid = ref(true)
const isEmailValid = ref(true)
const isPhoneNumberValid = ref(true)

const handleSelectedAvatar = value => {
  avatarNumber.value = value
  console.log('선택된 아바타 번호:', value)
}

const updateUser = () => {
  const user = {
    username: Username.value,
    password: Password.value,
    email: Email.value,
    phoneNumber: PhoneNumber.value,
    avatarNumber: avatarNumber.value,
  }

  accountStore.updateAccount(user)
  alert('회원가입이 완료되었습니다.')
  router.push('/logIn')
}

const validateUsername = () => {
  if (Username.value.length < 3 || Username.value.length > 20) {
    isUsernameValid.value = false

    return false
  }
  isUsernameValid.value = true

  return true
}
const validatePassword = () => {
  if (Password.value.length < 6 || Password.value.length > 20) {
    isPasswordValid.value = false
    return false
  }
  isPasswordValid.value = true
  return true
}
const validateConfirmPassword = () => {
  if (ConfirmPassword.value !== Password.value) {
    isConfirmPasswordValid.value = false
    return false
  }
  isConfirmPasswordValid.value = true
  return true
}
const validateEmail = () => {
  if (!regEmail.test(Email.value)) {
    isEmailValid.value = false
    return false
  }
  isEmailValid.value = true
  return true
}
const validatePhoneNumber = () => {
  if (!regPhoneNumber.test(PhoneNumber.value)) {
    isPhoneNumberValid.value = false
    return false
  }
  isPhoneNumberValid.value = true
  return true
}
</script>

<template>
  <div class="SignInPage">
    <i class="logo"></i>
    <div class="container">
      <div><AvartarPicker @update:selectedAvatar="handleSelectedAvatar" /></div>
      <div class="signInContainer">
        <h1>Sign In</h1>
        <form action="">
          <div class="usernameWrapper">
            <input
              type="text"
              class="username"
              placeholder="Username"
              v-model="Username"
              required
              @blur="validateUsername"
            />
            <div class="tooltipWrapper" v-if="!isUsernameValid">
              <i
                class="fa-solid fa-circle-exclamation"
                style="color: var(--danger); padding: 0.7rem"
              />
              <div class="tooltipBubble">
                3글자 이상 20글자 이하로 입력해주세요.
              </div>
            </div>
          </div>
          <div class="passwordWrapper">
            <input
              type="password"
              placeholder="Password"
              v-model="Password"
              required
              @blur="validatePassword"
            />
            <div class="tooltipWrapper" v-if="!isPasswordValid">
              <i
                class="fa-solid fa-circle-exclamation"
                style="color: var(--danger); padding: 0.7rem"
              />
              <div class="tooltipBubble">
                6글자 이상 20글자 이하로 입력해주세요.
              </div>
            </div>
          </div>
          <div class="comfirmPasswordWrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="ConfirmPassword"
              required
              @blur="validateConfirmPassword"
            />
            <div class="tooltipWrapper" v-if="!isConfirmPasswordValid">
              <i
                class="fa-solid fa-circle-exclamation"
                style="color: var(--danger); padding: 0.7rem"
              />
              <div class="tooltipBubble">비밀번호가 일치하지 않습니다.</div>
            </div>
          </div>
          <div class="emailWrapper">
            <input
              type="email"
              placeholder="Email"
              v-model="Email"
              required
              @blur="validateEmail"
            />
            <div class="tooltipWrapper" v-if="!isEmailValid">
              <i
                class="fa-solid fa-circle-exclamation"
                style="color: var(--danger); padding: 0.7rem"
              />
              <div class="tooltipBubble">
                sample@test.com의 형식으로 입력해주세요.
              </div>
            </div>
          </div>
          <div class="phoneNumberWrapper">
            <input
              type="text"
              placeholder="Phone Number"
              v-model="PhoneNumber"
              required
              @blur="validatePhoneNumber"
            />
            <div class="tooltipWrapper" v-if="!isPhoneNumberValid">
              <i
                class="fa-solid fa-circle-exclamation"
                style="color: var(--danger); padding: 0.7rem"
              />
              <div class="tooltipBubble">
                010-1234-1234의 형식으로 입력해주세요.
              </div>
            </div>
          </div>
          <BaseButton type="primary" @click="updateUser">Sign In</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo::after {
  content: '';
  background-image: url('@/assets/image/vuegatti_logo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: block;
  width: 400px;
  height: 100px;
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
  /* border: 1px solid rgba(248, 244, 242, 0.503); */
  background-color: transparent;
  color: white;
  font-size: 1rem;
  border: none;
  flex: 1;
}

input::placeholder {
  color: var(--color-text);
}

/* input 요소 체크 */

.usernameWrapper,
.passwordWrapper,
.comfirmPasswordWrapper,
.emailWrapper,
.phoneNumberWrapper {
  border: 1px solid rgba(248, 244, 242, 0.503);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.errorIconWrapper {
  position: relative;
  margin-left: 8px;
  color: #e74c3c;
}

.tooltipBubble {
  position: absolute;
  background-color: #fff;
  color: #333;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

/* 말풍선 화살표 */
.tooltipBubble::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent var(--color-text) transparent;
}
</style>
