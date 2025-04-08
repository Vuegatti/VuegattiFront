<script setup>
import BarChart from './BarChart.vue'
import CardSlide from './CardSlide.vue'
import PieChart from './PieChart.vue'
import UserProfile from './UserProfile.vue'
</script>

<template>
  <div class="container">
    <div class="left">
      <UserProfile />
    </div>
    <div class="right">
      <CardSlide />
      <BarChart />
      <PieChart />
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
  gap: 1rem;
}
</style>
