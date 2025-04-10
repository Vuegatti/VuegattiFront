<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useHistory } from '@/stores/history'
import { onMounted, ref, computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const historyStore = useHistory()
// 파이차트 데이터
const pieData = ref({ labels: [], datasets: [] })

const isNewbie = computed(() => historyStore.monthlyExpense === 0)

// onMounted로 historyStore에서 데이터 가져오고 pieData에 넣기
onMounted(async () => {
  await historyStore.fetchHistory()
  const { labels, data } = historyStore.getCategories('bikdh') // ID 전달

  pieData.value = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [' #ff7576', ' #3bb9a1', ' #a6c1ee', '#FFDA93'],
        data: data,
        borderWidth: 0,
      },
    ],
  }
})

console.log('지출', historyStore.monthlyExpense)
//파이차트 옵션
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false, // 비율 유지 비활성화
  layout: {
    padding: 10, //차트와 테두리 사이 여백
  },
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true, // 범례에 심볼 스타일 사용
        pointStyle: 'rectRounded', // 사각형 대신 원형
        color: '#f8f4f2',
        font: {
          size: 20,
          family: 'Pretendard',
        },
        padding: 10,
      },
    },
  },
  //hover 효과
  elements: {
    arc: {
      hoverOffset: 8, // 부드럽게 튀어나오는 정도
    },
  },
  animations: {
    animateRotate: true,
    animateScale: true,
  },
}
</script>

<template>
  <div class="pie-container">
    <p class="pie-title newbie" v-if="isNewbie">이번 달 지출이 없습니다!</p>
    <div class="pie-chart">
      <Pie :data="pieData" :options="pieOptions" />
    </div>
    <span class="pie-title">카테고리별 지출 비율</span>
  </div>
</template>

<style scoped>
.pie-container {
  width: 100%;
  max-width: 880px;
  transform: scale(0.95); /* ✅ 마찬가지로 살짝 줄이기 */
  transform-origin: top center;
  overflow: visible;
  padding: 0;
  border: 1px solid var(--color-text);
  border-radius: 20px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;
  position: relative;
  bottom: 20px;
  height: auto; /* ✅ 고정 높이 제거 */
  max-height: none; /* ✅ 잘림 제거 */
}

.pie-title {
  text-align: center;
  color: #f8f4f2;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Pretendard';
  margin-bottom: 2rem;
}

.pie-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  align-items: center;
  position: relative;
  top: 10px;
}
</style>
