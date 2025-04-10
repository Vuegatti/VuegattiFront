<script setup>
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import UserProfile from './UserProfile.vue'
// import HomeHeader from '../components/HomeHeader.vue'
// import HomeFooter from '../components/HomeFooter.vue'
// import SideBar from '../components/SideBar.vue'
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
</style>
