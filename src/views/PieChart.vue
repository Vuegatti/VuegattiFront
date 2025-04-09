<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const pieData = {
  labels: ['외식', '쇼핑', '교통비', '기타'],
  datasets: [
    {
      backgroundColor: ['#7de3e1', '#ff7373', '#ffbb55', '#ffe4a1'],
      data: [25, 20, 15, 40],
      borderWidth: 0,
    },
  ],
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false, // 비율 유지 비활성화
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#f8f4f2',
        font: {
          size: 20,
          family: 'Pretendard',
        },
        padding: 20,
      },
    },
  },
}
</script>

<template>
  <div class="pie-container">
    <span class="pie-title">카테고리별 지출 비율</span>
    <div class="pie-chart">
      <Pie :data="pieData" :options="pieOptions" />
    </div>
  </div>
</template>

<style scoped>
.pie-container {
  width: 960px;
  max-width: 100%;
  padding: 2rem;
  border: 1px solid var(--color-text);
  border-radius: 20px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.pie-title {
  text-align: center;
  color: #f8f4f2;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Pretendard';
  margin-bottom: 1rem;
}

.pie-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}
</style>
