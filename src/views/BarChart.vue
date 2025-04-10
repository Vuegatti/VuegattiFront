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

// store에서 수입/지출 데이터 가져오기
import { useHistory } from '@/stores/history'
import { computed, onMounted } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const historyStore = useHistory()

onMounted(() => {
  historyStore.fetchpreHistory() // 데이터 가져오기
})

// 수입 데이터: 3월(이전 달), 4월(현재 달)
const incomeData = computed(() => [
  historyStore.beforemonthlyIncome,
  historyStore.monthlyIncome,
])

// 지출 데이터: 3월(이전 달), 4월(현재 달)
const expenseData = computed(() => [
  historyStore.beforemonthlyExpense,
  historyStore.monthlyExpense,
])

const temp = historyStore.beforemonthlyExpense
console.log(temp)
console.log('인컴데이터', incomeData.value)
// 차트 데이터 정의 (반응형 computed 사용)
const chartData = computed(() => ({
  labels: ['3월', '4월'], // x축 라벨
  datasets: [
    {
      label: '수입',
      backgroundColor: '#5cd1c7',
      data: incomeData.value,
      borderRadius: 6,
      barThickness: 40,
    },
    {
      label: '소비',
      backgroundColor: '#ff5b5d',
      data: expenseData.value,
      borderRadius: 6,
      barThickness: 40,
    },
  ],
}))

// 소비 비교해서 메시지 텍스트만 반환
const spendingMessage = computed(() => {
  if (historyStore.monthlyExpense > historyStore.beforemonthlyExpense) {
    return '더 많아요!'
  } else if (historyStore.monthlyExpense < historyStore.beforemonthlyExpense) {
    return '더 적어요!'
  } else {
    return '같아요!'
  }
})

// 차트 옵션 (스타일 포함)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // 비율 유지 비활성화
  layout: {
    padding: {
      right: 20,
    },
  },
  animations: {
    duration: 1000, // 애니메이션 시간
    easing: 'easeInBounce', // 애니메이션 효과
  },
  plugins: {
    legend: {
      position: 'right', // 범례 위치
      labels: {
        usePointStyle: true, // 범례에 심볼 스타일 사용
        pointStyle: 'rectRounded', // 사각형 대신 원형
        color: '#f8f4f2', // 범례 텍스트 색상
        font: {
          size: 14,
          family: 'Pretendard', // 폰트 지정
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // x축 그리드 라인 색상
      },
      ticks: {
        color: '#f8f4f2', // x축 글씨 색상
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // y축 그리드 라인 색상
      },
      ticks: {
        color: '#f8f4f2', // y축 글씨 색상
      },
    },
  },
}
</script>

<template>
  <div class="bar-chart">
    <div class="chart-container">
      <!-- 차트 박스 -->
      <div class="chart-box">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <!-- ✅ 메시지 박스 -->
      <div class="message-box" style="text-align: center">
        <div>지난 달에 비해...</div>
        <div>
          소비가
          <span
            class="subtle-glitter"
            style="color: var(--color-primary); font-weight: bold"
            >{{ spendingMessage }}</span
          >
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
  width: 100%;
  max-width: 880px; /* ✅ 전체 너비 줄임 */
  transform: scale(0.95);
  transform-origin: top center;
  overflow: visible; /* ✅ 잘림 방지 */
  padding: 1rem;
  border: 1px solid var(--color-text);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.chart-box {
  flex: 1;
  height: 230px; /* 차트 높이 */
  position: relative;
}

.message-box {
  flex: 1;
  display: flex;
  flex-direction: column; /* 줄바꿈 허용!! 이거 안해주면 줄바꿈 안됨*/
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
