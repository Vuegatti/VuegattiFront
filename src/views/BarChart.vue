<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['3월', '4월'],
  datasets: [
    {
      label: '수입',
      backgroundColor: '#5cd1c7',
      data: [2500000, 1500000],
      borderRadius: 6,
      barThickness: 40,
    },
    {
      label: '지출',
      backgroundColor: '#ff5b5d',
      data: [400000, 300000],
      borderRadius: 6,
      barThickness: 40,
    },
  ],
}

const chartOptions = {
  responsive: true,
  animations: {
    duration: 1000,
    easing: 'easeInBounce',
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#f8f4f2',
        font: {
          size: 14,
          family: 'Pretendard',
        },
      },
    },
    title: {
      display: true,
      text: '월별 수입/지출 현황',
      color: '#f8f4f2',
      font: {
        size: 20,
        family: 'Pretendard',
        weight: 'bold',
      },
      padding: {
        bottom: 16,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#f8f4f2',
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#f8f4f2',
      },
    },
  },
}
</script>

<template>
  <div class="bar-chart">
    <div class="chart-container">
      <div class="chart-box">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <div class="message-box" style="text-align: center">
        <div>지난 달에 비해...</div>
        <div>
          <span
            class="subtle-glitter"
            style="color: var(--color-primary); font-weight: bold"
          >
            소비 </span
          >가 많아요!
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.chart-container {
  display: flex; /* ✅ 가로 배치 */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--color-text);
  border-radius: 20px;
  width: 960px;
  max-width: 100%;
  gap: 2rem; /* ✅ 두 요소 사이 간격 */
}

.chart-box {
  flex: 1;
  max-width: 480px; /* ✅ 막대 차트 너비 제한 */
}

.message-box {
  flex: 1;
  display: flex;
  flex-direction: column; /* 줄바꿈 허용!!!!! 이거때문에 줄바꿈 안됐음 */
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
@keyframes subtle-glitter {
  0%,
  100% {
    opacity: 1;
    text-shadow: 0 0 1px #ffb5b7;
  }
  50% {
    opacity: 0.95;
    text-shadow:
      0 0 2px #ffc1c3,
      0 0 3px #ff9a9e;
  }
}

.subtle-glitter {
  animation: subtle-glitter 2.5s infinite ease-in-out;
}
</style>
