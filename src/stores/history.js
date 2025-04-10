import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useHistory = defineStore('historyStore', () => {
  const history = ref([])
  const ID = computed(() => localStorage.getItem('userId'))

  const currentDate = ref(new Date())
  const prehistory = ref([])

  const fetchHistory = async () => {
    try {
      const year = currentDate.value.getFullYear()
      const month = (currentDate.value.getMonth() + 1)
        .toString()
        .padStart(2, '0')
      const prefix = `${year}-${month}`

      const response = await apiClient.get(`/history`)
      history.value = response.data.filter(
        h => h.userID === ID.value && h.date.startsWith(prefix),
      )
    } catch (err) {
      console.log('거래내역 로딩 에러: ', err)
    }
  }

  const fetchpreHistory = async () => {
    try {
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth().toString().padStart(2, '0')
      const prefix = `${year}-${month}`

      const response = await apiClient.get(`/history`)
      prehistory.value = response.data.filter(
        h => h.userID === ID.value && h.date.startsWith(prefix),
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

  const monthlyExpense = computed(() => {
    return history.value
      .filter(
        item =>
          item.type === 'expense' &&
          new Date(item.date).getMonth() === currentMonth.value,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })

  const beforemonthlyIncome = computed(() => {
    return prehistory.value
      .filter(
        item =>
          item.type === 'income' &&
          new Date(item.date).getMonth() === currentMonth.value - 1,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })

  const beforemonthlyExpense = computed(() => {
    return prehistory.value
      .filter(
        item =>
          item.type === 'expense' &&
          new Date(item.date).getMonth() === currentMonth.value - 1,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })

  const getCategories = () => {
    const expenses = history.value.filter(
      item =>
        item.userID === ID.value &&
        item.type === 'expense' &&
        new Date(item.date).getMonth() === currentMonth.value,
    )

    const categorySums = {}
    expenses.forEach(item => {
      if (categorySums[item.category]) {
        categorySums[item.category] += item.amount
      } else {
        categorySums[item.category] = item.amount
      }
    })

    const sortedCategories = Object.entries(categorySums).sort(
      (a, b) => b[1] - a[1],
    )

    const top3Categories = sortedCategories.slice(0, 3)
    const etcTotal = sortedCategories
      .slice(3)
      .reduce((sum, [_, value]) => sum + value, 0)

    const labels = top3Categories.map(([category]) => category)
    const data = top3Categories.map(([, value]) => value)

    if (etcTotal > 0) {
      labels.push('기타')
      data.push(etcTotal)
    }

    return { labels, data }
  }

  const $reset = () => {
    history.value = []
    currentDate.value = new Date()
    prehistory.value = []
  }

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
    getCategories,
    currentDate,
    beforemonthlyIncome,
    beforemonthlyExpense,
    ID,
    fetchpreHistory,
    prehistory,
    $reset,
  }
})
