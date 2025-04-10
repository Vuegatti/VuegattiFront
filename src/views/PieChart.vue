<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useHistory } from '@/stores/history'
import { onMounted, ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const historyStore = useHistory()
// 파이차트 데이터
const pieData = ref({ labels: [], datasets: [] })

// onMounted로 historyStore에서 데이터 가져오고 pieData에 넣기
onMounted(async () => {
  await historyStore.fetchHistory()
  const { labels, data } = historyStore.getCategories('bikdh') // ID 전달

  pieData.value = {
    labels: labels,
    datasets: [
      {
        backgroundColor: ['#6DE1D2', '#FFD63A', '#FFA955', '#F75A5A'],
        data: data,
        borderWidth: 0,
      },
    ],
  }
})

//파이차트 옵션
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false, // 비율 유지 비활성화
  layout: {
    padding: 20, //차트와 테두리 사이 여백
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
        padding: 20,
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
