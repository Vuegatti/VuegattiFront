<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref, onMounted } from 'vue'
import { useAccount } from '@/stores/account' //pinia store에서 계좌 정보 가져오기

//계좌 정보 임시로
// const datas = [
//   { bank: '국민은행', balance: 1000000 },
//   { bank: '신한은행', balance: 500000 },
//   { bank: '우리은행', balance: 300000 },
//   { bank: '하나은행', balance: 700000 },
//   { bank: '농협은행', balance: 200000 },
// ]
const cards = ref([]) //카드에 표시할 계좌 배열

const { fetchAccount, accountInfo, bankInfo } = useAccount() // Pinia 스토어에서 가져온 계좌 정보에서 구조분해 할당
// 계좌 데이터를 서버에서 가져오는 함수랑(fetchAccount) pinia store에 저장된 계좌 정보(accountInfo)를 가져오는 구조 분해 할당

console.log('💡 useAccount 구조분해 확인:', useAccount())

// 은행명 한글로 매핑
const bankNames = {
  KB: '국민은행',
  Shinhan: '신한은행',
  Woori: '우리은행',
  Hana: '하나은행',
  Nonghyup: '농협은행',
}

onMounted(async () => {
  await fetchAccount() // 계좌 정보 가져오기
  console.log('bankInfo:', bankInfo.value)

  if (Array.isArray(bankInfo.value) && bankInfo.value.length > 0) {
    const accountData = bankInfo.value[0].bank

    // Object.entries()를 사용해서 bank 객체를 배열로 바꾸고, .map()을 사용해서 카드에 표시할 데이터 반복 출력하는 코드
    cards.value = Object.entries(accountData).map(([key, value]) => {
      return {
        bank: bankNames[key] || key, // 은행명 한글로 매핑, 없으면 원래 키값(영어) 그대로 사용
        balance: value, // 잔액
      }
    })
  } else {
    console.log(
      '👻 accountInfo.value가 배열이 아니거나 비어 있음!',
      bankInfo.value,
    )
  }
})
const userId = 'bikdh'

let bankInfo2 = accountInfo.value.filter(item => {
  console.log('❤item : ', item)
  item.userID === userId
})
console.log('bankInfo2 : ', bankInfo2)
</script>

<template>
  <div class="card-slide">
    <swiper :slides-per-view="2" :space-between="16" class="mySwiper">
      <swiper-slide v-for="(data, index) in cards" :key="index">
        <div class="card">
          <p class="bank">{{ data.bank }}</p>
          <p class="balance">{{ data.balance.toLocaleString() }}</p>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="plus">
          <!-- + 아이콘 font-awesome에서 가져오기 -->
          <span>+</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.card-slide {
  padding: 1rem 0;
  overflow: hidden;
  width: 960px;
}

.mySwiper {
  width: 100%;
  /* max-width: 100%;
  overflow: hidden;  */
}

.swiper-slide {
  display: flex;
  justify-content: center;
  padding: 0; /* 혹시 패딩 들어가 있으면 제거 */
}

.card {
  /* flex: 1; */
  background: linear-gradient(to right, #fed4b4, #ff7576);
  border-radius: 16px;
  color: #f8f4f2;
  padding: 1.5rem;
  height: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plus {
  background: #333;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 16px;
  color: #f8f4f2;
  height: 120px;
}
</style>
