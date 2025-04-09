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
      <Bar :data="chartData" :options="chartOptions" />

      <div class="message-box">
        <span style="color: var(--color-primary)">소비</span>가 더 많아요!
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-chart {
  display: flex;
  align-items: center;
}

.chart-container {
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--color-text);
  border-radius: 20px;
  flex-direction: row;
}

.message-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
}
</style>
