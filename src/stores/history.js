import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'
import { applescript } from 'globals'

export const useHistory = defineStore('historyStore', () => {
  const history = ref([])

  const fetchHistory = async () => {
    try {
      const response = await apiClient.get('/history')
      history.value = response.data
    } catch (err) {
      console.log('거래내역 로딩 에러: ', err)
    }
  }

  const updateHistory = async data => {
    try {
      await apiClient.post('/history', data)
      const response = await apiClient.get('/history')
      history.value = response.data
    } catch (error) {
      console.error('거래 내역 추가 실패:', error)
      console.log(error)
    }
  }

  const deleteHistory = async id => {
    try {
      await apiClient.delete(`/history/${id}`)
      history.value = history.value.filter(item => item.id !== id)
    } catch (err) {
      console.log('거래내역 삭제 에러: ', err)
    }
  }

  const monthCalc = month => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return months[month] // month 값이 0~11 범위를 벗어나면 빈 문자열 반환
  }

  const currentDate = ref(new Date())

  const currentMonth = computed(() => currentDate.value.getMonth() + 1)

  const monthlyIncome = computed(() => {
    return history.value
      .filter(
        item =>
          item.type === 'income' &&
          new Date(item.date).getMonth() + 1 === currentMonth.value,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })

  //  이번 달 지출 총합
  const monthlyExpense = computed(() => {
    return history.value
      .filter(
        item =>
          item.type === 'expense' &&
          new Date(item.date).getMonth() + 1 === currentMonth.value,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })

  return {
    history,
    fetchHistory,
    monthCalc,
    monthlyIncome,
    monthlyExpense,
    updateHistory,
    deleteHistory,
  }
})
