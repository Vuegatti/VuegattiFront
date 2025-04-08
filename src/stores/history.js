import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useHistory = defineStore('historyStory', () => {
  const history = ref([])

  const fetchHistory = async () => {
    try {
      const response = await apiClient.get('/history')
      history.value = response.data
    } catch (err) {
      console.log('거래내역 로딩 에러: ', err)
    }
  }

  return { history, fetchHistory }
})
