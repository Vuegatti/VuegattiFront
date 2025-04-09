<template>
  <div>
    <h3>{{ date }}</h3>
    <p>수입: {{ memoData.income.toLocaleString() }}₩</p>
    <p>지출: {{ memoData.expense.toLocaleString() }}₩</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ date: String })

const transactions = {
  '2025-04-01': { income: 10000, expense: 3000 },
  '2025-04-05': { income: 8000, expense: 1000 },
  '2025-04-12': { income: 5000, expense: 7000 },
}

const memoData = computed(() => {
  return transactions[props.date] || { income: 0, expense: 0 }
})
</script>
