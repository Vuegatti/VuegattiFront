import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useHistory = defineStore('historyStore', () => {
  const history = ref([])
  const ID = localStorage.getItem('userId')
  const currentDate = ref(new Date())

  const fetchHistory = async () => {
    try {
      const year = currentDate.value.getFullYear()
      const month = (currentDate.value.getMonth() + 1)
        .toString()
        .padStart(2, '0')
      const prefix = `${year}-${month}`

      const response = await apiClient.get(`/history`)
      console.log(ID)
      history.value = response.data.filter(
        h => h.userID === ID && h.date.startsWith(prefix),
      )
    } catch (err) {
      console.log('거래내역 로딩 에러: ', err)
    }
  }

  const updateHistory = async data => {
    try {
      await apiClient.post('/history', data)
      fetchHistory()
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
  const modifyHistory = async updatedItem => {
    try {
      await apiClient.put(`/history/${updatedItem.id}`, updatedItem)
      fetchHistory()
    } catch (error) {
      console.error('거래 내역 수정 실패:', error)
    }
  }

  const moveMonth = direction => {
    const current = new Date(currentDate.value)
    current.setMonth(current.getMonth() + direction)
    currentDate.value = current
    fetchHistory()
  }

  const getHistoryByMonth = month => {
    return history.value.filter(
      item => new Date(item.date).getMonth() === month,
    )
  }

  const currentMonth = computed(() => currentDate.value.getMonth())
  const currentMonthName = computed(() => {
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
    return months[currentMonth.value]
  })

  const monthlyIncome = computed(() => {
    return history.value
      .filter(
        item =>
          item.type === 'income' &&
          new Date(item.date).getMonth() === currentMonth.value,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })

  //  이번 달 지출 총합
  const monthlyExpense = computed(() => {
    return history.value
      .filter(
        item =>
          item.type === 'expense' &&
          new Date(item.date).getMonth() === currentMonth.value,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })

  return {
    history,
    fetchHistory,
    moveMonth,
    monthlyIncome,
    monthlyExpense,
    updateHistory,
    deleteHistory,
    currentMonthName,
    getHistoryByMonth,
    modifyHistory,
    currentMonth,
    ID,
  }
})
