<script setup>
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import UserProfile from './UserProfile.vue'
import { ref, onMounted } from 'vue'
import { useHistory } from '@/stores/history'

const isNewbie = ref(false)
const historyStore = useHistory()
console.log('데이터로딩', historyStore.history)

onMounted(async () => {
  await historyStore.fetchHistory()
  console.log('길이', historyStore.history.length)
  if (historyStore.history.length === 0) {
    isNewbie.value = true
  }
})
</script>

<template>
  <!-- <div class="page">
    <SideBar />
    <div class="main">
      <HomeHeader /> -->

  <div class="container">
    <div class="left">
      <UserProfile />
    </div>
    <div class="right">
      <BarChart />
      <PieChart />
    </div>
  </div>
  <h2 class="newbie" v-if="isNewbie">계좌 등록을 해주세요!</h2>
</template>

<style scoped>
.container {
  display: flex;
  /* flex-wrap: wrap; */
  background-color: var(--color-background);
  color: #f8f4f2;
  width: 100%;
  padding: 0;
  max-height: 80vh;
  /* height: 100vh; */
  /* overflow: hidden; */
}

/* 왼쪽 컬럼 */
.left {
  flex: 1;
  /* max-height: 30vh; */
  padding: 2rem;
  display: flex;
  flex-direction: column; /* ✅ 추가: 세로 배치! */
  justify-content: flex-start; /* 위쪽부터 정렬 */
  align-items: center; /* 가운데 정렬 (선택사항) */
}

/* 오른쪽 컬럼 */
.right {
  flex: 1;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0rem;
  width: 100%;
  position: relative;
  right: 100px;
  margin-bottom: 50px;
  /* overflow: hidden; */
}

.newbie {
  padding: var(--space-l);
  display: block;
  text-align: center;
  color: var(--color-text);
  font-size: 5rem;
  position: absolute;
  left: 25%;
  bottom: 50%;
  background-color: var(--color-accent-blue);
}
</style>
