<script setup></script>

<script setup>
import { useHistory } from '@/stores/history'
import { useAccount } from '@/stores/account'
import { onMounted, ref, onUnmounted } from 'vue'

const historyList = useHistory()
const accountStore = useAccount()

const amount = ref('')
const type = ref('')
const title = ref('')
const details = ref('')

const emit = defineEmits(['close'])
const userid = historyList.ID
const bank = ref('')

console.log('id는', userid)

onMounted(() => {
  accountStore.fetchAccount()
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})

const showIncomeGrid = ref(false) // 수입 그리드 표시 여부
const showExpenseGrid = ref(false) // 지출 그리드 표시 여부
const showCategoryGrid = ref(false) // 카테고리 그리드 표시 여부
const selectedCategory = ref('')
const selectCategory = category => {
  selectedCategory.value = category
  showCategoryGrid.value = false
}

// 수입 버튼 클릭 시 수입 그리드만 표시
const toggleIncomeGrid = () => {
  showIncomeGrid.value = true
  showExpenseGrid.value = false
  showCategoryGrid.value = false
  selectedCategory.value = ''
  type.value = 'income'
}

// 지출 버튼 클릭 시 지출 그리드만 표시
const toggleExpenseGrid = () => {
  showIncomeGrid.value = false
  showExpenseGrid.value = true
  showCategoryGrid.value = false
  selectedCategory.value = ''
  type.value = 'expense'
}
// 카테고리 선택 버튼 클릭 시 카테고리 그리드 표시
const toggleCategoryGrid = () => {
  showCategoryGrid.value = !showCategoryGrid.value
}

const handleSubmit = async () => {
  try {
    const date = new Date().toLocaleDateString()

    const newData = {
      id: Date.now().toString(),
      userID: userid,
      date: date
        .replace(/\.\s?/g, '-')
        .replace(/-\s?$/, '')
        .split('-')
        .map((v, i) => (i > 0 ? v.padStart(2, '0') : v))
        .join('-'),
      amount: amount.value,
      type: type.value,
      category: selectedCategory.value,
      title: title.value,
      details: details.value,
      bank: 'KB',
    }

    await historyList.updateHistory(newData)
    emit('close', true)
    amount.value = ''
    type.value = ''
    selectedCategory.value = ''
    title.value = ''
    details.value = ''
    showIncomeGrid.value = false
    showExpenseGrid.value = false
    showCategoryGrid.value = false
  } catch (err) {
    console.log(err)
  }
}

const handleClose = () => {
  emit('close', true)
}
</script>
<template>
  <div class="listform">
    <div class="button-container">
      <button @click="toggleIncomeGrid" :class="{ active: showIncomeGrid }">
        수입
      </button>
      <button @click="toggleExpenseGrid" :class="{ active: showExpenseGrid }">
        지출
      </button>
    </div>

    <form class="form-container" @submit.prevent="handleSubmit">
      <label for="">금액 : </label>
      <input
        type="text"
        placeholder="금액을 입력하세요"
        v-model.number="amount"
      />

      <label for="">은행 : </label>
      <select name="bank" id="bank" v-model="bank">
        <option value="no">은행을 선택하세요</option>
        <option value="KB">국민은행</option>
        <option value="Shinhan">신한은행</option>
        <option value="Woori">우리은행</option>
        <option value="Hana">하나은행</option>
        <option value="Nonghyup">농협은행</option>
      </select>

      <label for="">카테고리</label>
      <button type="button" @click="toggleCategoryGrid">
        {{ selectedCategory || '카테고리 선택' }}
      </button>
      <!-- 수입 그리드 -->
      <div v-if="showIncomeGrid && showCategoryGrid" class="grid-container">
        <div class="grid-income">
          <p @click="selectCategory('월급')">💰 월급</p>
          <p @click="selectCategory('부수입')">💵 부수입</p>
          <p @click="selectCategory('금융소득')">📈 금융소득</p>
          <p @click="selectCategory('용돈')">🤑 용돈</p>
          <p @click="selectCategory('상여')">💸 상여</p>
          <p @click="selectCategory('기타')">기타</p>
        </div>
      </div>

      <!-- 지출 그리드 -->
      <div v-if="showExpenseGrid && showCategoryGrid" class="grid-container">
        <div class="grid-expense">
          <p @click="selectCategory('식비')">🍜 식비</p>
          <p @click="selectCategory('교통')">🚗 교통</p>
          <p @click="selectCategory('부모님')">👪 부모님</p>
          <p @click="selectCategory('회비')">💰 회비</p>
          <p @click="selectCategory('건강')">😷 건강</p>
          <p @click="selectCategory('구독료')">💱 구독료</p>
          <p @click="selectCategory('교육')">📚 교육</p>
          <p @click="selectCategory('미용')">💈 미용</p>
          <p @click="selectCategory('생활용품')">🏠 생활용품</p>
          <p @click="selectCategory('기타')">기타</p>
        </div>
      </div>
      <label for="">내용 : </label>
      <input type="text" v-model.trim="title" placeholder="내용을 입력하세요" />

      <label for="">세부 정보 : </label>
      <textarea
        name="details"
        cols="20"
        rows="3"
        placeholder="세부 정보를 입력하세요"
        v-model="details"
      ></textarea>
      <div class="button-container">
        <button type="submit">등록</button>
        <button @click="handleClose">닫기</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.listform {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--color-text);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  border: 1px solid black;
  z-index: 100;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  /* background-color: var(--color-text); */
  border: 1px solid var(--color-background);
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--color-accent-red);
  opacity: 0.8;
}

button.active {
  background-color: var(--color-accent-red);
  font-weight: bold;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

label {
  font-size: 16px;
  color: #333;
}

input,
select,
textarea {
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  resize: none;
}

.grid-container {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  position: relative;
}

.grid-expense,
.grid-income {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 80%;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.grid-expense p,
.grid-income p {
  margin: 0;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.grid-expense p:hover,
.grid-income p:hover {
  background-color: #e0e0e0;
}
</style>
