// 회원정보 불러오는 코드
// 필요 시 함수 추가하여 사용
import { ref, computed } from 'vue' //computed 지웠음 - computed 속성 사용하게 되면 다시 추가
import { defineStore } from 'pinia'
import apiClient from '@/utils/axios'

export const useAccount = defineStore('account', () => {
  // 1. 상태 선언
  const accountInfo = ref([])

  // 2. 회원정보 불러오기
  const fetchAccount = async () => {
    try {
      const response = await apiClient.get('/account')
      console.log('account API 응답:', response.data) //응답상태 확인용
      accountInfo.value = response.data
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
  // bank정보만 불러오게
  const userID = ref('bikdh') // userID는 로그인 시 받아온 값으로 설정해야 함
  // 로그인 시 받아온 userID를 사용하여 필터링

  const bankInfo = computed(() => {
    const bankInfo = accountInfo.value.filter(item => {
      // console.log('🧡userID:', userID.value) // userID 확인용
      // console.log('🧡item:', item.userID) // bankInfo 확인용
      return item.userID === userID.value
    })
    // console.log('🧡bankInfo:', bankInfo) // bankInfo 확인용
    return bankInfo
  })

  return {
    accountInfo,
    fetchAccount,
    bankInfo,
    updateAccount,
    logIn,
  }
})
