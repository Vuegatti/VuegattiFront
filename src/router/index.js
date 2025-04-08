import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/list',
      name: 'historyList',
      component: () => import('@/views/HistoryList.vue'),
    },
  ],
})

export default router
