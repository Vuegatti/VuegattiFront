<script setup>
import { useHistory } from '@/stores/history'
import ListForm from './ListForm.vue'
import ModifyForm from './ModifyForm.vue'
import { onMounted, computed, ref } from 'vue'

const historyList = useHistory()

const { fetchHistory, deleteHistory, moveMonth } = useHistory()

const monthlyIncome = computed(() => historyList.monthlyIncome.toLocaleString())
const monthlyExpense = computed(() =>
  historyList.monthlyExpense.toLocaleString(),
)

const showModal = ref(false)

const openForm = () => {
  showModal.value = true
}

const closeForm = isSubmitted => {
  if (isSubmitted) {
    showModal.value = false
  }
}

const selectedItem = ref(null)

const openModify = item => {
  selectedItem.value = item
}
const closeModify = isSubmitted => {
  if (isSubmitted) {
    selectedItem.value = null
  }
}

const deleteItem = async id => {
  await deleteHistory(id)
}

const moveToPreviousMonth = () => {
  moveMonth(-1)
}
const moveToNextMonth = () => {
  moveMonth(1)
}

const filteredHistory = computed(() => {
  const month = historyList.currentMonth
  return historyList.getHistoryByMonth(month)
})

onMounted(async () => {
  await fetchHistory()
})
</script>

<template>
  <div class="consumption-page">
    <h2>
      <span class="move-month" @click="moveToPreviousMonth">←</span>
      {{ historyList.currentMonthName }}
      <span class="move-month" @click="moveToNextMonth">→</span>
    </h2>
    <div class="text-container">
      <div class="text-income">
        <span>총 수입은 </span>
        <span class="income-text">{{ monthlyIncome }} 원</span>
      </div>
      <div class="text-expense">
        <span>총 지출은 </span>
        <span class="expense-text">{{ monthlyExpense }} 원</span>
      </div>
    </div>
    <ListForm v-if="showModal" @close="closeForm" />
    <ModifyForm v-if="selectedItem" :list="selectedItem" @close="closeModify" />
    <div class="historypage">
      <div class="history-header">
        <button>유형</button>
        <p>날짜</p>
        <p>카테고리</p>
        <p>제목</p>
        <p>금액</p>
        <p>상세</p>
        <div style="visibility: hidden">icon</div>
        <div style="visibility: hidden">scroll</div>
      </div>
      <ul class="history-list">
        <li
          v-for="list in filteredHistory"
          :key="list.id"
          class="history-container"
        >
          <button
            :class="
              list.type === 'expense' ? 'expense-button' : 'income-button'
            "
          >
            {{ list.type === 'expense' ? '지출' : '수입' }}
          </button>
          <p>{{ list.date }}</p>
          <p>{{ list.category }}</p>
          <p>{{ list.title }}</p>
          <p :class="list.type === 'expense' ? 'primary' : 'secondary'">
            {{ list.amount.toLocaleString() }}
          </p>
          <p>{{ list.details }}</p>
          <div class="icon-zip">
            <i
              class="fa-solid fa-pen-to-square"
              @click.stop="openModify(list)"
            ></i>
            <i class="fa-solid fa-trash" @click="deleteItem(list.id)"></i>
          </div>
        </li>
      </ul>
      <i
        class="fa-solid fa-circle-plus fa-2xl circle-button"
        @click="openForm"
      ></i>
    </div>
  </div>
</template>

<style scoped>
.consumption-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h2 {
  color: var(--color-text);
  text-align: center;
  font-size: 80px;
  margin: 0;
}
.text-container {
  display: flex;
  justify-content: space-evenly;
  font-size: 25px;
  line-height: var(--space-l);
}
.text-income {
  color: var(--color-text);
}

.text-expense {
  color: var(--color-text);
}
.historypage {
  margin: var(--space-l);
}

.history-header {
  display: flex;
  justify-content: space-around;
  width: 71vi;
  padding: 0 var(--space-s);
  margin: var(--space-s) auto;
  font-weight: bold;
  background-color: var(--color-text);
  border-radius: var(--space-s);
  box-sizing: border-box;
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
.history-list {
  max-height: 50vh;
  padding: 0;
  margin: 0 auto;
  width: 71vi;
  overflow-y: auto;
  box-sizing: border-box;
}

.history-container {
  padding: var(--space-s);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-text);
  width: 70vi;
  margin: 0 auto;
  line-height: var(--space-l);
}

.history-container:hover {
  background-color: var(--color-text);
  opacity: 0.8;
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
.fa-trash {
  cursor: pointer;
  transition: 0.3s;
}

.fa-trash:hover {
  color: var(--color-primary);
  opacity: 0.8;
}
.fa-pen-to-square {
  cursor: pointer;
  transition: 0.3s;
}
.fa-pen-to-square:hover {
  color: var(--success);
  opacity: 0.9;
}

button {
  padding: 2px var(--space-s);
  font-size: 16px;
  border: none;
  color: var(--color-text);
  cursor: default;
}

.move-month {
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;
}
.move-month:hover {
  font-size: 25px;
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
  position: relative;
  font-size: 2.5rem;
  color: var(--success);
  opacity: 0.9;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 2rem;
  cursor: pointer;
}
.circle-button:hover {
  opacity: 1;
}

.income-text {
  color: var(--color-accent-blue);
}

.expense-text {
  color: var(--color-accent-red);
}
</style>
