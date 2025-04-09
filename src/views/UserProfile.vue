<script setup>
import { ref, computed } from 'vue'
import Avatar from '@/components/AvatarPicture.vue'

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const now = new Date()
const currentMonth = ref(monthNames[now.getMonth()])

// 임시 고정값 --------도현오빠의 함수 사용
const income = ref(1000000) //db에서 불러와야함
const expense = ref(1000000) //db에서 불러와야함

// 계산: 남은 금액
// 수입이 더 많을때, 지출이 더 많을 때 색상 구분 - 아직안함
const total = computed(() => income.value - expense.value)
</script>

<!-- 아바타 프로필 -->
<template>
  <div class="profile">
    <div
      class="user-profile"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
      "
    >
      <Avatar :toyNumber="1" :size="230" :rounded="24" />
    </div>
    <!-- 몇 월 인지 -->
    <h2
      class="month"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
      "
    >
      {{ currentMonth }}<span>의 내 소비</span>
    </h2>
    <!-- 수입/지출 -->
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        border-bottom: 1px solid var(--color-text);
        padding-bottom: 2rem;
      "
    >
      <p>+ {{ income.toLocaleString() }}</p>
      <p>- {{ expense.toLocaleString() }}</p>
    </div>

    <!-- 남은 금액 -->
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
      "
    >
      {{ total.toLocaleString() }}<span>₩</span>
    </div>
  </div>
</template>

<style scoped>
.profile {
  color: var(--color-text);
}
</style>
