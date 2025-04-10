import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useHistory = defineStore('historyStore', () => {
  const history = ref([])
  const ID = localStorage.getItem('userId')
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
      console.log(ID)
      history.value = response.data
        .filter(h => h.userID === ID && h.date.startsWith(prefix))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (err) {
      console.log('거래내역 로딩 에러: ', err)
    }
  }

  const fetchpreHistory = async () => {
    try {
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth().toString().padStart(2, '0')
      const prefix = `${year}-${month}`
      console.log('prefix', prefix)
      const response = await apiClient.get(`/history`)
      prehistory.value = response.data.filter(
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

  // 이번 달 수입 총합
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

  // 특정 사용자의 지출 내역 카테고리별로 그룹핑 및 상위 3개 + 기타 카테고리 반환
  const getCategories = userID => {
    // 현재 월의 지출 내역만 필터링
    const expenses = history.value.filter(
      item =>
        item.userID === userID &&
        item.type === 'expense' &&
        new Date(item.date).getMonth() === currentMonth.value,
    )

    // 카테고리별로 그룹핑 후 합산
    const categorySums = {}
    // foreach로 배열순회
    expenses.forEach(item => {
      if (categorySums[item.category]) {
        categorySums[item.category] += item.amount
      } else {
        categorySums[item.category] = item.amount
      }
    })

    //카테고리별 합계 정렬 후 상위 3개 + 기타 추출
    //categorySums 객체를 배열로 변환
    //내림차순 정렬
    const sortedCategories = Object.entries(categorySums).sort(
      (a, b) => b[1] - a[1],
    )

    //상위 3개 카테고리 추출
    const top3Categories = sortedCategories.slice(0, 3)

    //초기값 0으로 설정, 구조분해할당 하는데 [_,value] 는 카테고리 무시하고 금액만 사용하도록(기타항목이니까)
    const etcTotal = sortedCategories
      .slice(3)
      .reduce((sum, [_, value]) => sum + value, 0)

    const labels = top3Categories.map(([category]) => category)
    const data = top3Categories.map(([, value]) => value)

    //기타항목 존재하면(4번째 이하 카테고리들 금액 총합이 0보다 크면) 기타 라벨 추가하고 금액 추가
    if (etcTotal > 0) {
      labels.push('기타')
      data.push(etcTotal)
    }

    return { labels, data }
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
  }
})
