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

  height: 80vh;
  width: 100vw;

  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  padding-top: 4vh;
}
.container {
  display: flex;
  background-color: var(--color-background);
  color: #f8f4f2;
  width: 90%;
  max-height: 100%;
  padding: 0;
  overflow: hidden;
  align-items: stretch;
}

/* 왼쪽 컬럼 */
.left {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 2vh 2vw;
  height: 100%;
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
