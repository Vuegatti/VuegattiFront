<script setup>
import { ref, computed } from 'vue'

// 월 이름을 다 표시할건지?
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const now = new Date()
const currentMonth = ref(monthNames[now.getMonth()])

// 임시 고정값
const income = ref(1000000) //db에서 불러와야함
const expense = ref(1000000) //db에서 불러와야함

// 계산: 남은 금액
// 수입이 더 많을때, 지출이 더 많을 때 색상 구분 - 아직안함
const total = computed(() => income.value - expense.value)
</script>

<template>
  <div class="profile">
    <div class="user-profile">
      <!-- 프로필 이미지 (나중에 라이브러리 연동) -->
      <!-- 임시 이미지 -->
      <img src="https://picsum.photos/100/100" alt="profile" />
    </div>
    <!-- 몇 월 인지 -->
    <h2 class="month">{{ currentMonth }}<span>의 내 소비</span></h2>
    <!-- 수입/지출 -->
    <div>
      <p>+ {{ income.toLocaleString() }}</p>
      <p>- {{ expense.toLocaleString() }}</p>
    </div>
    <!-- <hr /> -->
    <!-- 남은 금액 -->
    <div>{{ total.toLocaleString() }}<span>원</span></div>
  </div>
</template>

<style scoped>
.profile {
  color: var(--color-text);
}
</style>
