// 회원정보 불러오는 코드
// 필요 시 함수 추가하여 사용
import { ref } from 'vue' //computed 지웠음 - computed 속성 사용하게 되면 다시 추가
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

  return { accountInfo, fetchAccount }
})
