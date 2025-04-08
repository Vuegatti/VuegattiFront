import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

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

  return { history, fetchHistory, monthCalc }
})
