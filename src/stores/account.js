import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useAccount = defineStore('accountInfo', () => {
  const accountInfo = ref([])

  const fetchAccount = async () => {
    try {
      const response = await apiClient.get('/account')
      accountInfo.value = response.data
    } catch (err) {
      console.log('회원정보 로딩 에러: ', err)
    }
  }

  return { history, fetchAccount }
})
