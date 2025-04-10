<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const bank = ref('')
const accountNumber = ref('')
const balance = ref('')
</script>

<template>
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
  </div>
</template>

<style scoped>
* {
  color: var(--color-text);
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
</style>
