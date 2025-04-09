<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const income = ref(0)
const expense = ref(0)

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

const newItem = ref({
  userID: 'bikdh',
  title: '',
  amount: '',
  category: '',
  type: '',
  bank: '',
  details: '',
})

const selectCategory = category => {
  newItem.value.category = category
}

const addNewItem = async () => {
  if (!selectedDate.value) return

  const payload = {
    ...newItem.value,
    amount: Number(newItem.value.amount),
    date: selectedDate.value,
  }

  await axios.post('http://localhost:5001/history', payload)

  await fetchHistory()
  selectDate(selectedDate.value)

  newItem.value = {
    title: '',
    amount: '',
    category: '',
    type: 'income',
    bank: '',
    details: '',
  }
}
const showForm = ref(false)
const deleteItem = async id => {
  await axios.delete(`http://localhost:5001/history/${id}`)
  await fetchHistory()
  selectDate(selectedDate.value)
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
              <p class="income">
                수입:
                <span>{{ income.toLocaleString() }}원</span>
              </p>
              <p class="expense">
                지출:
                <span>{{ expense.toLocaleString() }}원</span>
              </p>
              <p class="total">
                총 결산:
                <span> {{ (income - expense).toLocaleString() }}원</span>
              </p>
            </div>
          </div>
        </div>

        <div class="calendar-main">
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
          <span class="expense">{{ selectedExpense.toLocaleString() }}원</span>
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
          <button class="delete-btn" @click="deleteItem(item.id)">삭제</button>
        </div>

        <div class="memo-plus">
          <button class="toggle-form-btn" @click="showForm = !showForm">
            {{ showForm ? '닫기' : '새 내역 추가' }}
          </button>
          <div class="memo-form" v-if="showForm">
            <input v-model="newItem.title" placeholder="제목" />
            <input v-model="newItem.amount" type="number" placeholder="금액" />
            <input v-model="newItem.category" placeholder="카테고리" />
            <select v-model="newItem.type">
              <option value="" disabled>선택하세요</option>
              <option value="income">수입</option>
              <option value="expense">지출</option>
            </select>
            <div class="category-buttons">
              <div class="grid-income" v-if="newItem.type === 'income'">
                <p @click="selectCategory('월급')">💰 월급</p>
                <p @click="selectCategory('부수입')">💵 부수입</p>
                <p @click="selectCategory('금융소득')">📈 금융소득</p>
                <p @click="selectCategory('용돈')">🤑 용돈</p>
                <p @click="selectCategory('상여')">💸 상여</p>
                <p @click="selectCategory('기타')">기타</p>
              </div>
              <div class="grid-expense" v-if="newItem.type === 'expense'">
                <p @click="selectCategory('식비')">🍜 식비</p>
                <p @click="selectCategory('교통')">🚗 교통</p>
                <p @click="selectCategory('부모님')">👪 부모님</p>
                <p @click="selectCategory('회비')">💰 회비</p>
                <p @click="selectCategory('건강')">😷 건강</p>
                <p @click="selectCategory('구독료')">💱 구독료</p>
                <p @click="selectCategory('교육')">📚 교육</p>
                <p @click="selectCategory('미용')">💈 미용</p>
                <p @click="selectCategory('생활용품')">🏠 생활용품</p>
                <p @click="selectCategory('기타')">기타</p>
              </div>
            </div>
            <br />
            <input v-model="newItem.bank" placeholder="은행" />
            <input v-model="newItem.details" placeholder="상세 내용" />
            <button class="add-btn" @click="addNewItem">내역 추가</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-buttons {
  margin: 10px 0;
}
.grid-income,
.grid-expense {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}
.grid-income p,
.grid-expense p {
  background: #444;
  padding: 6px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  color: white;
}
.grid-income p:hover,
.grid-expense p:hover {
  background: #666;
}
.calendar-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--color-background);
  color: var(--color-text);
  min-height: 100vh;
  padding: 40px 100px;
  box-sizing: border-box;
  margin-top: 20px;
}

.calendar-container {
  display: grid;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
  gap: 5px;
}
.calendar-box {
  display: flex;
  flex-direction: column;
  width: 1000px;
  justify-content: center;
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
  justify-content: flex-start;
  font-size: 14px;
  flex-wrap: wrap;
  padding: 0 20px;
}

.income {
  font-size: 15px;
  font-weight: bold;
}
.income > span {
  font-size: 15px;
  color: var(--color-accent-blue);
}
.expense {
  font-weight: bold;
  font-size: 15px;
}
.expense > span {
  font-size: 15px;
  color: var(--color-accent-red);
}
.total {
  font-size: 30px;
  font-weight: bold;
}
.total > span {
  font-size: 30px;
  font-weight: bold;
  color: var(--success);
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
}
.weekday.sunday {
  color: var(--color-accent-red);
}
.weekday.saturday {
  color: var(--color-accent-blue);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 100%;
  opacity: 75%;
}

.calendar-day {
  background: var(--color-text);
  color: var(--color-background);
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
  color: var(--color-accent-red);
}
.calendar-day.saturday .date-label {
  color: var(--color-accent-blue);
}
.calendar-day.selected {
  border: 2px solid var(--success);
  box-shadow: 0 0 8px var(--success);
}

.date-label {
  font-weight: bold;
}
.daily-income {
  color: var(--color-accent-blue);
  font-size: 12px;
}
.daily-expense {
  color: var(--color-accent-red);
  font-size: 12px;
}

.sidebar {
  position: sticky;
  top: 0px;
  right: 0;
  height: 100vh;
  width: 345px;
  background: #2b2b2b;
  padding: 20px;
  border-radius: 12px;
  color: var(--color-text);
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
  gap: 10px;
}
.memo-header-row {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.memo-category {
  color: var(--color-text);
}
.memo-amount.income {
  color: var(--color-accent-blue);
}
.memo-amount.expense {
  color: var(--color-accent-red);
}
.memo-title {
  font-size: 14px;
  margin-top: 5px;
}
.memo-details {
  font-size: 12px;
  color: var(--color-text);
}
.memo-bank {
  font-size: 12px;
  color: var(--color-text);
  text-align: right;
  margin-top: 8px;
}

.memo-plus {
  background: #1f1f1f;
  padding: 15px;
  border-radius: 10px;
  gap: 10px;
}
.memo-form > input,
select {
  color: var(--color-text);
  opacity: 30%;
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
  color: var(--color-text);
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}
.nav-btn:hover {
  background: #666;
}
.toggle-form-btn {
  left: -10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 8px;
  background: #888;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
}
.toggle-form-btn:hover {
  background: #aaa;
}
.delete-btn {
  margin-top: 8px;
  background: #c62828;
  color: var(--color-text);
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}
.delete-btn:hover {
  background: #e53935;
}
</style>
