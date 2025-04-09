<script setup>
import BarChart from './BarChart.vue'
import CardSlide from './CardSlide.vue'
// import PieChart from './PieChart.vue'
import UserProfile from './UserProfile.vue'
// import HomeHeader from '../components/HomeHeader.vue'
// import HomeFooter from '../components/HomeFooter.vue'
// import SideBar from '../components/SideBar.vue'
console.log('홈페이지 실행')
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
      <CardSlide />
      <BarChart />
      <!-- <PieChart /> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  background-color: var(--color-background);
  color: #f8f4f2;
  width: 100%;
}

/* 왼쪽 컬럼 */
.left {
  flex: 1;
  padding: 1rem;
}

/* 오른쪽 컬럼 */
.right {
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
