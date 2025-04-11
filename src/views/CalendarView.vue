<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/utils/axios.js'

const ID = localStorage.getItem('userId')
console.log(ID)

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

  const res = await apiClient.get('/history')
  const history = res.data.filter(
    h => h.userID === ID && h.date.startsWith(prefix),
  )

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
  apiClient.get('/history').then(res => {
    const filtered = res.data.filter(h => h.userID === ID && h.date === date)
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
  userID: ID,
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

  await apiClient.post('/history', payload)
  await fetchHistory()
  selectDate(selectedDate.value)

  newItem.value = {
    userID: ID,
    title: '',
    amount: '',
    category: '',
    type: '',
    bank: '',
    details: '',
  }
}

const showForm = ref(false)

const deleteItem = async id => {
  await apiClient.delete(`/history/${id}`)
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
            </div>
            <div>
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
            <input v-model="newItem.category" placeholder="카테고리" />
            <select v-model="newItem.bank" placeholder="은행">
              <option value="" disabled>선택하세요</option>
              <option value="KB">국민은행</option>
              <option value="Shinhan">신한은행</option>
              <option value="Woori">우리은행</option>
              <option value="Hana">하나은행</option>
              <option value="Nonghyup">농협은행</option>
              <option value="IBK">기업은행</option>
              <option value="Toss">토스뱅크</option>
              <option value="Kakao">카카오뱅크</option>
              <option value="MG">새마을금고</option>
            </select>
            <input v-model="newItem.details" placeholder="상세 내용" />
            <button class="add-btn" @click="addNewItem">내역 추가</button>
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
  color: #333;

  max-height: 60vh;

  box-sizing: border-box;

  width: 100%;
}

.calendar-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  justify-content: center;
  gap: 10px;
  height: 70vh;
}

.calendar-box {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  width: 1000px;
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  margin-bottom: 20px;
}

.month {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #222;
}

.header-top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}

.nav-btn {
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.nav-btn:hover {
  background: #d0d0d0;
}

.summary {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 20px;
  flex-wrap: wrap;
  gap: 10px;
  color: #444;
}

.income > span {
  color: #0077ff;
}
.expense > span {
  color: #e53935;
}
.total > span {
  color: #2e7d32;
  font-size: 20px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}
.weekday.sunday {
  color: #e53935;
}
.weekday.saturday {
  color: #1e88e5;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.calendar-day {
  background: #fafafa;
  color: #333;
  border-radius: 10px;
  padding: 8px;
  width: 9vw;
  height: 7.5vh;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: background 0.2s ease;
  border: 1px solid #eee;
}
.calendar-day:hover {
  background: #f0f0f0;
}
.calendar-day.empty {
  background: transparent;
  cursor: default;
}
.calendar-day.selected {
  border: 2px solid #2e7d32;
  box-shadow: 0 0 8px #81c784;
}

.date-label {
  font-weight: bold;
}
.daily-income {
  font-size: 10px;
  color: #1e88e5;
}
.daily-expense {
  font-size: 10px;
  color: #e53935;
}

.sidebar {
  position: fixed;
  right: 0;
  height: 77.5vh;
  width: 15vw;
  background: #1e1e1e;
  padding: 20px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  color: white;
  z-index: 1000;
}

.close {
  background: transparent;
  color: white;
  font-size: 16px;
  float: right;
  border: none;
  cursor: pointer;
}

.memo-summary {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 14px;
}
.memo-summary .label {
  font-weight: bold;
}

.memo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.memo-item,
.memo-plus {
  background: #2c2c2c;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.memo-header-row {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.memo-amount.income {
  color: #64b5f6;
}
.memo-amount.expense {
  color: #ef5350;
}
.memo-title {
  margin-top: 6px;
  font-size: 14px;
}
.memo-details,
.memo-bank {
  font-size: 12px;
  color: #bbb;
  margin-top: 4px;
}
.memo-bank {
  text-align: right;
}

.delete-btn {
  background: #ff4d4d;
  border: none;
  color: white;
  padding: 4px 8px;
  margin-top: 8px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  float: right;
}
.delete-btn:hover {
  background: #e53935;
}

.toggle-form-btn {
  width: 100%;
  display: block;
  margin: 0 auto;
  background: #444;
  color: white;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}
.toggle-form-btn:hover {
  background: #666;
}

.memo-form input,
.memo-form select {
  height: 40px;
  width: 100%;
  padding: 6px 10px;
  margin-top: 15px;
  background: #2e2e2e;
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
}

.category-buttons {
  margin-top: 10px;
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
  background: #333;
  padding: 6px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 13px;
}
.grid-income p:hover,
.grid-expense p:hover {
  background: #555;
}

.add-btn {
  margin-top: 10px;
  width: 100%;
  background: #4caf50;
  border: none;
  padding: 8px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.add-btn:hover {
  background: #43a047;
}
</style>
