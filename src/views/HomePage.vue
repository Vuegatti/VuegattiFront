<script setup>
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import UserProfile from './UserProfile.vue'

</script>

<template>
<div class="main-area">
  <div class="container">
    <div class="left">
      <UserProfile />
    </div>
    <div class="right">
      <BarChart />
      <PieChart />
    </div>
  </div>
  </div>
</template>

<style scoped>
.main-area {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 80vh; /* 헤더/푸터 각 10vh 기준 */
  width: 100vw;

  overflow: hidden; /* 스크롤 방지 */
  padding: 0;
  box-sizing: border-box;
  padding-top: 4vh;
}
.container {
  display: flex;
  background-color: var(--color-background);
  color: #f8f4f2;
  width: 90%; /*100%;*/
  max-height: 100%; /*80vh*/
  padding: 0;
  overflow: hidden;
  align-items: stretch;
}

/* 왼쪽 컬럼 */
.left {
  flex: 1;
  /* max-height: 30vh; */
  padding: 2rem;
  display: flex;
  flex-direction: column; /*  세로 배치 */
  justify-content: space-evenly; /* 위쪽부터 정렬 */
  align-items: center; /* 가운데 정렬 (선택사항) */
  padding: 2vh 2vw;
  height: 100%; /* 부모 height 채움 */
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
  margin-bottom: 0;
  justify-content: space-between;
}
</style>
