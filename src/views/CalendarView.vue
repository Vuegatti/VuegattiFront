<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const income = ref(0)
const expense = ref(0)
const fixedIncome = ref(2500000)
const fixedExpense = ref(100000)
const currentDate = ref(new Date(2025, 3))

const daysInMonth = ref([])
const selectedDate = ref(null)
const selectedHistory = ref([])
const selectedIncome = ref(0)
const selectedExpense = ref(0)

const formatMonth = date =>
  date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
    })
    .replace('.', '')

const fetchHistory = async () => {
  const year = currentDate.value.getFullYear()
  const month = (currentDate.value.getMonth() + 1).toString().padStart(2, '0')
  const prefix = `${year}-${month}`

  const res = await axios.get('http://localhost:5001/history')
  const history = res.data.filter(h => h.date.startsWith(prefix))

  income.value = 0
  expense.value = 0

  const days = []
  const firstDayOfWeek = new Date(`${prefix}-01`).getDay()
  const totalDays = new Date(
    year,
    currentDate.value.getMonth() + 1,
    0,
  ).getDate()

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ empty: true })
  }

  for (let i = 1; i <= totalDays; i++) {
    const dayStr = i.toString().padStart(2, '0')
    const date = `${prefix}-${dayStr}`
    days.push({
      date,
      day: i,
      income: 0,
      expense: 0,
    })
  }

  history.forEach(h => {
    const day = Number(h.date.slice(-2))
    const dayData = days.find(d => d.day === day)
    if (!dayData) return
    if (h.type === 'income') {
      dayData.income += h.amount
      income.value += h.amount
    } else {
      dayData.expense += h.amount
      expense.value += h.amount
    }
  })

  daysInMonth.value = days
  selectedDate.value = null
}

const selectDate = date => {
  selectedDate.value = date
  axios.get('http://localhost:5001/history').then(res => {
    const filtered = res.data.filter(h => h.date === date)
    selectedHistory.value = filtered
    selectedIncome.value = filtered
      .filter(i => i.type === 'income')
      .reduce((a, b) => a + b.amount, 0)
    selectedExpense.value = filtered
      .filter(i => i.type === 'expense')
      .reduce((a, b) => a + b.amount, 0)
  })
}

const changeMonth = direction => {
  if (direction === 'prev') {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1)
  } else if (direction === 'next') {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1)
  }
  fetchHistory()
}

onMounted(fetchHistory)
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-container">
      <div class="calendar-box">
        <div class="calendar-header">
          <div class="header-top">
            <button class="nav-btn" @click="changeMonth('prev')">←</button>
            <h1 class="month">{{ formatMonth(currentDate) }}</h1>
            <button class="nav-btn" @click="changeMonth('next')">→</button>
          </div>

          <div class="summary">
            <div>
              <p>
                수입:
                <span class="income">{{ income.toLocaleString() }}원</span>
              </p>
              <p>고정수입: {{ fixedIncome.toLocaleString() }}원</p>
            </div>
            <div>
              <p>
                지출:
                <span class="expense">{{ expense.toLocaleString() }}원</span>
              </p>
              <p>고정지출: {{ fixedExpense.toLocaleString() }}원</p>
            </div>
            <div class="total">
              <p>{{ (income - expense).toLocaleString() }}원</p>
            </div>
          </div>
        </div>

        <div class="weekdays">
          <div
            v-for="(day, index) in ['일', '월', '화', '수', '목', '금', '토']"
            :key="index"
            class="weekday"
            :class="{ sunday: index === 0, saturday: index === 6 }"
          >
            {{ day }}
          </div>
        </div>

        <div class="calendar-grid">
          <div
            v-for="(day, index) in daysInMonth"
            :key="index"
            class="calendar-day"
            :class="{
              empty: day.empty,
              selected: selectedDate === day.date,
              sunday: index % 7 === 0,
              saturday: index % 7 === 6,
            }"
            @click="!day.empty && selectDate(day.date)"
          >
            <div v-if="!day.empty" class="date-label">{{ day.day }}</div>
            <div v-if="!day.empty" class="amounts">
              <p class="daily-income" v-if="day.income">
                +{{ day.income.toLocaleString() }}
              </p>
              <p class="daily-expense" v-if="day.expense">
                -{{ day.expense.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar" v-if="selectedDate">
        <button class="close" @click="selectedDate = null">닫기</button>
        <div class="memo-header">
          <h2>{{ selectedDate }}</h2>
        </div>

        <div class="memo-summary">
          <p>
            <span class="label">수입</span>
            <span class="income">{{ selectedIncome.toLocaleString() }}원</span>
          </p>
          <p>
            <span class="label">지출</span>
            <span class="expense"
              >{{ selectedExpense.toLocaleString() }}원</span
            >
          </p>
        </div>

        <div class="memo-list">
          <div class="memo-item" v-for="item in selectedHistory" :key="item.id">
            <div class="memo-header-row">
              <span class="memo-category">{{ item.category }}</span>
              <span
                class="memo-amount"
                :class="{
                  income: item.type === 'income',
                  expense: item.type === 'expense',
                }"
              >
                {{ item.type === 'income' ? '+' : '-'
                }}{{ item.amount.toLocaleString() }}원
              </span>
            </div>
            <div class="memo-title">{{ item.title }}</div>
            <div class="memo-details">{{ item.details }}</div>
            <div class="memo-bank">{{ item.bank }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--color-background);
  color: white;
  min-height: 100vh;
  padding: 40px 100px;
  box-sizing: border-box;
}

.calendar-container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
}
.calendar-box {
  width: 1000px;
  flex-shrink: 0;
}

.calendar-header {
  margin-bottom: 20px;
}

.month {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.summary {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  flex-wrap: wrap;
  padding: 0 20px;
}

.income {
  color: #6ec2ff;
}
.expense {
  color: #ff6e6e;
}
.total {
  font-size: 20px;
  font-weight: bold;
  color: #aaffaa;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
}
.weekday.sunday {
  color: red;
}
.weekday.saturday {
  color: #6ec2ff;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 100%;
}

.calendar-day {
  background: white;
  color: black;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.calendar-day.empty {
  background: transparent;
  cursor: default;
}

.calendar-day.sunday .date-label {
  color: red;
}
.calendar-day.saturday .date-label {
  color: #6ec2ff;
}
.calendar-day.selected {
  border: 2px solid #aaffaa;
  box-shadow: 0 0 8px #aaffaa;
}

.date-label {
  font-weight: bold;
}
.daily-income {
  color: #6ec2ff;
  font-size: 12px;
}
.daily-expense {
  color: #ff6e6e;
  font-size: 12px;
}

.sidebar {
  position: absolute;
  top: 40px;
  right: 0;
  height: calc(100% - 80px); /* 위아래 padding 고려 */
  width: 350px;
  background: #2b2b2b;
  padding: 20px;
  border-radius: 12px;
  color: white;
  flex-shrink: 0;
}
.memo-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.memo-summary .label {
  font-weight: bold;
  margin-right: 5px;
}
.memo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.memo-item {
  background: #1f1f1f;
  padding: 15px;
  border-radius: 10px;
}
.memo-header-row {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.memo-category {
  color: #bbb;
}
.memo-amount.income {
  color: #6ec2ff;
}
.memo-amount.expense {
  color: #ff6e6e;
}
.memo-title {
  font-size: 14px;
  margin-top: 5px;
}
.memo-details {
  font-size: 12px;
  color: #999;
}
.memo-bank {
  font-size: 12px;
  color: #aaa;
  text-align: right;
  margin-top: 8px;
}

.header-top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}
.nav-btn {
  background: #444;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}
.nav-btn:hover {
  background: #666;
}
</style>
