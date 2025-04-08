import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    selectedDate: null,
    dailyRecords: {},
  }),
  actions: {
    setDate(date) {
      this.selectedDate = date
    },
    setRecord(date, income, expense) {
      this.dailyRecords[date] = { income, expense }
    },
  },
})
