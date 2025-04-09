<script setup>
import AvartarPicker from '@/components/AvartarPicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useAccount } from '@/stores/account.js'
import { ref } from 'vue'
import Avatar from '@/components/AvatarPicture.vue'

const accountStore = useAccount()

const Username = ref('')
const isUsernameValid = ref(true)
const Password = ref('')
const ConfirmPassword = ref('')
const Email = ref('')
const regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
const PhoneNumber = ref('')
const regPhoneNumber = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
const avatarNumber = ref(1)

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
}

const validateUsername = () => {
  if (Username.value.length < 3 || Username.value.length > 20) {
    // alert('Username must be between 3 and 20 characters')
    isUsernameValid.value = false // 유효하지 않으면 false

    return false
  }
  isUsernameValid.value = true // 유효하면 true

  return true
}
const validatePassword = () => {
  if (Password.value.length < 8 || Password.value.length > 20) {
    alert('Password must be between 8 and 20 characters')
    return false
  }
  return true
}
const validateConfirmPassword = () => {
  if (ConfirmPassword.value !== Password.value) {
    alert('Passwords do not match')
    return false
  }
  return true
}
const validateEmail = () => {
  if (!regEmail.test(Email.value)) {
    alert('Invalid email format')
    return false
  }
  return true
}
const validatePhoneNumber = () => {
  if (!regPhoneNumber.test(PhoneNumber.value)) {
    alert('Invalid phone number format. Use XXX-XXX-XXXX')
    return false
  }
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
            />
            <!-- <i
              class="fa-solid fa-circle-exclamation"
              style="color: var(--danger); padding: 0.7rem"
              v-show="!isUsernameValid"
            ></i> -->
          </div>
          <input type="password" placeholder="Password" v-model="Password" />
          <input type="password" placeholder="Confirm Password" />
          <input type="email" placeholder="Email" v-model="Email" />
          <input type="text" placeholder="Phone Number" v-model="PhoneNumber" />
          <BaseButton type="primary" @click.prevent="updateUser"
            >Sign In</BaseButton
          >
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
  outline: none;
}

input::placeholder {
  color: var(--color-text);
}

/* input 요소 체크 */

.usernameWrapper {
  border: 1px solid rgba(248, 244, 242, 0.503);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
