<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useAccount } from '@/stores/account.js'

const accountStore = useAccount()
const bank = ref('')
const accountNumber = ref('')
const balance = ref('')
const userId = localStorage.getItem('userId')
// 이미지 클릭으로 select 값 설정
const setBank = name => {
  bank.value = name
}

const save = async () => {
  const bankName = bank.value
  const balanceValue = balance.value
  const currentDB = await accountStore.fetchAccountById(userId)
  const currentBank = currentDB.bank || {}

  console.log('Current Bank:', currentBank)

  currentBank[bankName] = balanceValue

  const newBank = {
    bank: currentBank,
  }

  accountStore.addAccount(newBank, userId)
  alert('계좌 등록이 완료되었습니다.')
}
</script>

<template>
  <div class="register-layout">
    <div class="register-container">
      <div class="register-box">
        <h2>Account registration</h2>

        <form @submit.prevent="save">
          <div class="form-group">
            <select v-model="bank" required>
              <option disabled value="">Bank Name</option>
              <option value="KB">국민</option>
              <option value="Nonghyup">농협</option>
              <option value="MG">새마을</option>
              <option value="Woori">우리</option>
              <option value="Shinhan">신한</option>
              <option value="Kakao">카카오</option>
              <option value="Toss">토스</option>
              <option value="Hana">하나</option>
              <option value="IBK">IBK</option>
            </select>
          </div>

          <div class="form-group">
            <input v-model="accountNumber" placeholder="Account Number" />
          </div>

          <div class="form-group">
            <input v-model="balance" type="number" placeholder="Balance" />
          </div>

          <div class="button-group">
            <BaseButton color="primary">Back</BaseButton>
            <BaseButton color="secondary" @click.prevent="save"
              >Register</BaseButton
            >
          </div>
        </form>
      </div>

      <!-- 오른쪽: 은행 이미지 -->
      <div class="bank-images">
        <img src="@/assets/image/BankIcon_국민.png" @click="setBank('KB')" />
        <img
          src="@/assets/image/BankIcon_농협.png"
          @click="setBank('Nonghyup')"
        />
        <img
          src="@/assets/image/BankIcon_새마을.png"
          @click="setBank('새마을')"
        />
        <img
          src="@/assets/image/BankIcon_신한.png"
          @click="setBank('Shinhan')"
        />
        <img src="@/assets/image/BankIcon_우리.png" @click="setBank('Woori')" />
        <img
          src="@/assets/image/BankIcon_카카오.png"
          @click="setBank('Kakao')"
        />
        <img src="@/assets/image/BankIcon_토스.png" @click="setBank('Toss')" />
        <img src="@/assets/image/BankIcon_하나.png" @click="setBank('Hana')" />
        <img src="@/assets/image/BankIcon_IBK.png" @click="setBank('IBK')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--color-text);
}

.register-layout {
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 40px;
  position: relative;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 5vw;
  align-items: center;
  padding: 8vh;
}

.register-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(248, 244, 242, 0.503);
  border-radius: 10px;
  text-align: center;
  width: 50%;
  height: 70vh;
  padding: var(--space-l);
}
.register-box h2 {
  margin-bottom: 5px;
}

form input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  border-radius: 6px;
  background-color: transparent;
}

form select {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  border-radius: 6px;
  background-color: transparent;
}

form div {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  color: var(--color-text);
}
form div > * {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
input::placeholder {
  color: var(--color-text);
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.bank-images {
  display: grid;
  grid-template-columns: repeat(3, 70px);
  gap: 20px;
  background: #333;
  border: 1px solid rgba(248, 244, 242, 0.503);
  padding: 20px;
  border-radius: 10px;
}

.bank-images img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.2s;
}
.bank-images img:hover {
  transform: scale(1.1);
}
</style>
