<script setup>
import { ref, computed, onMounted } from 'vue'
import Avatar from '@/components/AvatarPicture.vue'
import { useHistory } from '@/stores/history'
import CardSlide from '@/views/CardSlide.vue'

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
const historyStore = useHistory()

const monthlyIncome = computed(() =>
  historyStore.monthlyIncome.toLocaleString(),
)
const monthlyExpense = computed(() =>
  historyStore.monthlyExpense.toLocaleString(),
)

const totalAmount = computed(() => {
  return historyStore.monthlyIncome - historyStore.monthlyExpense
})

const totalAmountText = computed(() => totalAmount.value.toLocaleString())

// avatarNumber 동적 할당
const avatarNumber = ref('') // 기본값

onMounted(async () => {
  const userID = localStorage.getItem('userId') // 로그인된 사용자 ID
  const res = await fetch('http://localhost:5001/account')
  const data = await res.json()
  const user = data.find(u => u.id === userID)
  console.log('user', user)
  if (user && user.avatarNumber) {
    avatarNumber.value = user.avatarNumber
  }
})
</script>

<template>
  <div class="profile-container">
    <div class="profile">
      <!-- 아바타 -->
      <div class="user-profile">
        <Avatar :toyNumber="avatarNumber" :size="230" :rounded="24" />
      </div>

      <!-- 월 -->
      <h3 class="month">{{ currentMonth }}<span>의 내 소비</span></h3>

      <!-- 수입/지출 -->
      <div class="summary">
        <p>+ {{ monthlyIncome }}</p>
        <p>- {{ monthlyExpense }}</p>
      </div>

      <!-- 남은 금액 -->
      <div class="total">{{ totalAmountText }}<span>₩</span></div>
    </div>

    <!-- 카드 슬라이드 -->
    <CardSlide />
  </div>
</template>

<style scoped>
/* 프로필 + 카드 합친 영역 */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-text);
  transform: scale(0.85);
  transform-origin: top center;
  margin-left: 150px;
  margin-top: -50px;
}

/* 프로필 내용 */
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 1rem;
}

.month {
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -5px;
}

.summary {
  font-size: 1.8rem;
  text-align: center;
  margin-top: -50px;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-text);
}

.total {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
