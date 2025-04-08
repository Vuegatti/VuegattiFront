<script setup>
import { useHistory } from '@/stores/history'
import { useAccount } from '@/stores/account'
import { onMounted, computed, ref } from 'vue'

const historyList = useHistory()

const buttonInfo = computed(() => {
  return historyList.history.map(list => {
    if (list.type === 'expense') {
      return {
        text: '지출',
        class: 'expense-button',
        color: 'primary',
      }
    } else if (list.type === 'income') {
      return {
        text: '수입',
        class: 'income-button',
        color: 'secondary',
      }
    }
  })
})

const thisMonth = new Date().getMonth()
const currentMonthName = computed(() => {
  return historyList.monthCalc(thisMonth)
})

onMounted(() => {
  historyList.fetchHistory()
})
</script>

<template>
  <HomeHeader />
  <h2>{{ currentMonthName }}</h2>
  <div class="text-container">
    <div class="text-income">
      <p>이번달 총 수입은</p>
      <p>2,000,000 입니다.</p>
    </div>
    <div class="text-expense">
      <p>이번달 총 지출은</p>
      <p>2,000,000 입니다.</p>
    </div>
  </div>

  <div class="historypage">
    <div class="history-header">
      <button>유형</button>
      <p>날짜</p>
      <p>카테고리</p>
      <p>제목</p>
      <p>금액</p>
      <p>상세</p>
      <div style="visibility: hidden">icon</div>
    </div>
    <ul>
      <li
        v-for="(list, index) in historyList.history"
        :key="list.id"
        class="history-container"
      >
        <button :class="buttonInfo[index].class">
          {{ buttonInfo[index].text }}
        </button>
        <p>{{ list.date }}</p>
        <p>{{ list.category }}</p>
        <p>{{ list.title }}</p>
        <p :class="buttonInfo[index].color">
          {{ list.amount.toLocaleString() }}
        </p>

        <p>{{ list.details }}</p>
        <div class="icon-zip">
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
      </li>
    </ul>
    <i class="fa-solid fa-circle-plus fa-2xl circle-button"></i>
  </div>
</template>

<style scoped>
h2 {
  color: var(--color-text);
  text-align: center;
  font-size: 80px;
  margin: 0;
}
.text-container {
  display: flex;
  justify-content: center;
  gap: var(--space-l);
  font-size: 25px;
  line-height: var(--space-s);
}
.text-income {
  color: var(--color-text);
}

.text-expense {
  color: var(--color-text);
}

.history-header {
  display: flex;
  justify-content: space-around;
  width: 900px;
  padding: 0 var(--space-s);
  margin: 0 auto;
  font-weight: bold;
  background-color: var(--color-text);
  border-radius: var(--space-s);
}

.history-header p {
  flex: 1;
  text-align: center;
}

.history-header > button {
  color: black;
  font-weight: bold;
  background-color: var(--color-text);
}

.history-container {
  padding: var(--space-s);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-text);
  width: 900px;
  margin: 0 auto;
  line-height: var(--space-l);
}
.history-container p {
  margin: 0 10px;
  flex: 1;
  text-align: center;
}

.icon-zip {
  display: flex;
  gap: 1rem;
}

button {
  padding: 2px var(--space-s);
  font-size: 16px;
  border: none;
  color: white;
  cursor: default;
}

.expense-button {
  background-color: var(--color-primary);
  border-radius: var(--space-s);
  opacity: 0.6;
}

.income-button {
  background-color: var(--color-secondary);
  border-radius: var(--space-s);
  opacity: 0.6;
}

.primary {
  color: var(--color-primary);
}
.secondary {
  color: var(--color-secondary);
}

.circle-button {
  color: var(--color-primary);
  opacity: 0.8;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
.circle-button:hover {
  opacity: 1;
}
</style>
