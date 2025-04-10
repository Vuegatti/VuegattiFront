<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const bank = ref('')
const accountNumber = ref('')
const balance = ref('')

// 이미지 클릭으로 select 값 설정
const setBank = name => {
  bank.value = name
}
</script>

<template>
  <div class="register-layout">
    <div class="register-container">
      <div class="register-box">
        <h2>Account registration</h2>

        <form>
          <div class="form-group">
            <select v-model="bank" required>
              <option disabled value="">Bank Name</option>
              <option>국민</option>
              <option>농협</option>
              <option>새마을</option>
              <option>신한</option>
              <option>우리</option>
              <option>카카오</option>
              <option>토스</option>
              <option>하나</option>
              <option>IBK</option>
            </select>
          </div>

          <div class="form-group">
            <input v-model="accountNumber" placeholder="Account Number" />
          </div>

          <div class="form-group">
            <input v-model="balance" type="number" placeholder="Balance" />
          </div>

          <div class="button-group">
            <BaseButton color="secondary" @click="save">Register</BaseButton>
            <BaseButton color="primary">Back</BaseButton>
          </div>
        </form>
      </div>

      <!-- 오른쪽: 은행 이미지 -->
      <div class="bank-images">
        <img src="@/assets/image/BankIcon_국민.png" @click="setBank('국민')" />
        <img src="@/assets/image/BankIcon_농협.png" @click="setBank('농협')" />
        <img
          src="@/assets/image/BankIcon_새마을.png"
          @click="setBank('새마을')"
        />
        <img src="@/assets/image/BankIcon_신한.png" @click="setBank('신한')" />
        <img src="@/assets/image/BankIcon_우리.png" @click="setBank('우리')" />
        <img
          src="@/assets/image/BankIcon_카카오.png"
          @click="setBank('카카오')"
        />
        <img src="@/assets/image/BankIcon_토스.png" @click="setBank('토스')" />
        <img src="@/assets/image/BankIcon_하나.png" @click="setBank('하나')" />
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
  align-items: center;
  gap: 40px;
  height: 100vh;
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 5vw;
}
.register-box {
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
.register-box h2 {
  margin-bottom: 5px;
}

.register-box form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

form input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--color-text);
  color: var(--color-background);
  border-radius: 6px;
}

form select {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--color-text);
  color: var(--color-background);
  border-radius: 6px;
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
  color: #aaa;
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
