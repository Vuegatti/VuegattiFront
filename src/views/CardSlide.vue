<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
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
  IBK: '기업은행',
  Toss: '토스뱅크',
  Kakao: '카카오뱅크',
  MG: '새마을금고',
}

// 은행 로고 경로 반환 함수
const getBankIcon = bankKey => {
  return new URL(`../assets/bankicon/${bankKey}_icon.png`, import.meta.url).href
}

onMounted(async () => {
  accountStore.userID = localStorage.getItem('userId') || ''
  await accountStore.fetchAccount()

  if (
    Array.isArray(accountStore.bankInfo) &&
    accountStore.bankInfo.length > 0
  ) {
    const accountData = accountStore.bankInfo[0].bank

    // Object.entries()를 사용해서 bank 객체를 배열로 바꾸고, .map()을 사용해서 카드에 표시할 데이터 반복 출력하는 코드
    cards.value = Object.entries(accountData).map(([key, value]) => {
      return {
        bank: bankNames[key] || key, // 은행명 한글로 매핑, 없으면 원래 키값(영어) 그대로 사용
        balance: value, // 잔액
        bankClass: key.toLowerCase(), // 클래스 이름으로 쓰려고 소문자로 변환
      }
    })
  }
})
// const userId = 'bikdh' 만 가져오고있음(account.js에서)
</script>

<template>
  <div class="card-slide-wrapper">
    <swiper :slides-per-view="2" :space-between="16" class="mySwiper">
      <swiper-slide v-for="(data, index) in cards" :key="index">
        <div :class="['card', data.bankClass]">
          <div class="card-content">
            <div class="text-content">
              <p class="bank">{{ data.bank }}</p>
              <p class="balance">{{ data.balance.toLocaleString() }}</p>
            </div>
            <img
              :src="getBankIcon(data.bankClass)"
              class="bank-icon"
              :alt="data.bank + ' 로고'"
            />
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <router-link to="/BankAccountSelect">
          <div class="plus">
            <span style="width: 220px; text-align: center">+</span>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.card-slide-wrapper {
  max-width: 500px;
  width: 100%;
  position: relative;
  overflow: visible;
}

.mySwiper {
  width: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.card {
  width: 220px;
  height: 120px;
  background: linear-gradient(to right, #fed4b4, #ff7576);
  border-radius: 16px;
  padding: 1.5rem;
  color: #f8f4f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.text-content .bank {
  font-size: 1.25rem;
  font-weight: bold;
}

.bank-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.plus {
  width: 220px;
  height: 120px;
  border-radius: 16px;
  background: #444;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
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
  justify-content: center;

  /* 효과 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    filter 0.3s ease;
  cursor: pointer;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bank-icon {
  width: 48px;
  height: 48 px;
  object-fit: contain;
}

/* hover 효과 */
.card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 그림자 */
  filter: brightness(0.9); /* 살짝 어둡게 */
  animation: bounce 0.3s ease;
}

/* 은행별 그라데이션 배경 */
.card.kb {
  background: linear-gradient(to left, #fed4b4, #ff7576);
}

.card.shinhan {
  background: linear-gradient(to left, #fed4b4, #3bb9a1);
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
  width: 100%;
}
</style>
