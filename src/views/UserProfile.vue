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
    <div class="profile-wrapper">
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
    </div>

    <!-- 카드 슬라이드 -->
    <div class="card-wrapper">
      <CardSlide />
    </div>
  </div>
</template>

<style scoped>
/* 프로필 + 카드 합친 영역 */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 1rem; /* 카드와 프로필 사이 여백 */
  color: var(--color-text);
  transform: scale(0.85);
  transform-origin: top center;
}

.profile-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.card-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

/* 프로필 내용 */
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.user-profile {
  margin: 1vh 0 1vh;
}

.month {
  font-size: 3vw;
  margin: 0 0 1vh 0;
}

.summary {
  font-size: 1.6vw;
  margin-bottom: 0.5vh;
  border-bottom: 0.1vh solid var(--color-text);
}

.total {
  font-size: 2.5vw;
}
</style>
