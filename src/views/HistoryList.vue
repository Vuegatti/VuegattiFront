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

historyList.monthCalc(new Date().getMonth())
console.log(new Date().getMonth())

onMounted(() => {
  historyList.fetchHistory()
})
</script>

<template>
  <h2>{{ monthCal }}</h2>
  <div class="historypage">
    <ul>
      <li
        v-for="(list, index) in historyList.history"
        :key="list.id"
        class="history-container"
      >
        <p>{{ list.date }}</p>
        <p>{{ list.category }}</p>
        <p>{{ list.title }}</p>
        <p :class="buttonInfo[index].color">
          {{ list.amount.toLocaleString() }}
        </p>
        <button :class="buttonInfo[index].class">
          {{ buttonInfo[index].text }}
        </button>

        <p>{{ list.details }}</p>
        <div class="icon-zip">
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
      </li>
    </ul>
    <button>버튼입니다</button>
  </div>
</template>

<style scoped>
.history-container {
  padding: var(--space-s);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-text);
  width: 900px;
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
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  color: white;
  cursor: pointer;
}

.expense-button {
  background-color: var(--color-primary);
  border-radius: 50%;
  opacity: 0.8;
}

.income-button {
  background-color: var(--color-secondary);
  border-radius: 50%;
  opacity: 0.8;
}

.primary {
  color: var(--color-primary);
}
.secondary {
  color: var(--color-secondary);
}
</style>
