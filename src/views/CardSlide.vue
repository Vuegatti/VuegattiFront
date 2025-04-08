<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref, onMounted } from 'vue'
import { useAccount } from '@/stores/account'

//계좌 정보 임시로
// const datas = [
//   { bank: '국민은행', balance: 1000000 },
//   { bank: '신한은행', balance: 500000 },
//   { bank: '우리은행', balance: 300000 },
//   { bank: '하나은행', balance: 700000 },
//   { bank: '농협은행', balance: 200000 },
// ]
const cards = ref([]) //계좌 배열

const { fetchAccount, accountInfo } = useAccount() // Pinia 스토어에서 가져온 계좌 정보에서 구조분해 할당
const bankNames = {
  KB: '국민은행',
  Shinhan: '신한은행',
  Woori: '우리은행',
  Hana: '하나은행',
  Nonghyup: '농협은행',
}
</script>

<template>
  <div class="card-slide">
    <swiper :slides-per-view="2" :space-between="16" class="mySwiper">
      <swiper-slide v-for="(data, index) in cards" :key="index">
        <div class="card">
          <p class="bank">{{ data.bank }}</p>
          <p class="balance">{{ data.balance.toLocaleString() }}</p>
        </div>
        <!-- <swiper-slide>slide1</swiper-slide>
      <swiper-slide>slide2</swiper-slide> -->
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
