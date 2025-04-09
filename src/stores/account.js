// stores/account.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useAccount = defineStore('account', () => {
  // 1. 상태 선언
  const accountInfo = ref([])

  // 2. 회원정보 불러오기
  const fetchAccount = async () => {
    try {
      const response = await apiClient.get('/account')
      accountInfo.value = response.data
      console.log('회원정보 로딩 성공: ', response.data)
    } catch (err) {
      console.log('회원정보 로딩 에러: ', err)
    }
  }
  // 3. 회원정보 업데이트
  const updateAccount = async accountData => {
    console.log('updateAccount 함수 호출됨', accountData) //
    try {
      const response = await apiClient.post('/account', accountData)
      accountInfo.value = response.data
      console.log('회원정보 업데이트 성공: ', response.data)
    } catch (err) {
      console.log('회원정보 업데이트 에러: ', err)
    }
  }

  const logIn = logInUsername => {
    localStorage.setItem('userId', logInUsername)
    console.log('로그인 성공: ', logInUsername)
  }

  // 4. 외부에서 사용할 수 있도록 반환
  return {
    accountInfo,
    fetchAccount,
    updateAccount,
    logIn,
  }
})
