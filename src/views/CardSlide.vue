<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref, onMounted } from 'vue'
import { useAccount } from '@/stores/account' //pinia store에서 계좌 정보 가져오기

const cards = ref([]) //카드에 표시할 계좌 배열

const accountStore = useAccount() // 구조분해할당 안함 account.js에서 import한 useAccount()를 사용

// 은행명 한글로 매핑
const bankNames = {
  KB: '국민은행',
  Shinhan: '신한은행',
  Woori: '우리은행',
  Hana: '하나은행',
  Nonghyup: '농협은행',
}

onMounted(async () => {
  await accountStore.fetchAccount() // 계좌 정보 가져오기
  console.log('💜bankInfo:', accountStore.bankInfo[0])

  if (
    Array.isArray(accountStore.bankInfo) &&
    accountStore.bankInfo.length > 0
  ) {
    const accountData = accountStore.bankInfo[0].bank
    console.log('💜accountData:', accountData)

    // Object.entries()를 사용해서 bank 객체를 배열로 바꾸고, .map()을 사용해서 카드에 표시할 데이터 반복 출력하는 코드
    cards.value = Object.entries(accountData).map(([key, value]) => {
      return {
        bank: bankNames[key] || key, // 은행명 한글로 매핑, 없으면 원래 키값(영어) 그대로 사용
        balance: value, // 잔액
        bankClass: key.toLowerCase(), // 클래스 이름으로 쓰려고 소문자로 변환
      }
    })
  } else {
    console.log('👻 bank정보 없음', accountStore.bankInfo)
  }
})
// const userId = 'bikdh' 만 가져오고있음(account.js에서)
</script>

<template>
  <div class="card-slide">
    <swiper :slides-per-view="2" :space-between="16" class="mySwiper">
      <swiper-slide v-for="(data, index) in cards" :key="index">
        <div :class="['card', data.bankClass]">
          <p class="bank">{{ data.bank }}</p>
          <p class="balance">{{ data.balance.toLocaleString() }}</p>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="plus">
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

  /* 효과 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    filter 0.3s ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 그림자 */
  filter: brightness(0.9); /* 살짝 어둡게 */
  animation: bounce 0.3s ease;
}

/* 은행별 그라데이션 배경 */
.card.kb {
  background: linear-gradient(to right, #f6d365, #fda085);
}

.card.shinhan {
  background: linear-gradient(to right, #a1c4fd, #c2e9fb);
}

.card.woori {
  background: linear-gradient(to right, #4facfe, #00f2fe);
}

.card.hana {
  background: linear-gradient(to right, #43e97b, #38f9d7);
}

.card.nonghyup {
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
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
