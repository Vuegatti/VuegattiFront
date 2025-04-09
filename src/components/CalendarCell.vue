<template>
  <div v-if="day" class="cell" @click="$emit('click')">
    <div class="day-number">{{ day.day }}</div>
    <div class="income" v-if="day.income">
      +{{ day.income.toLocaleString() }}
    </div>
    <div class="expense" v-if="day.expense">
      -{{ day.expense.toLocaleString() }}
    </div>
  </div>
  <div v-else class="cell empty"></div>
</template>

<script setup>
defineProps({ day: Object })
</script>

<style scoped>
.cell {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px;
  text-align: left;
  cursor: pointer;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
}

.day-number {
  font-weight: bold;
}

.income {
  color: green;
}

.expense {
  color: red;
}

.empty {
  background: transparent;
  cursor: default;
}
</style>
