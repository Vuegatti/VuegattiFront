import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CalendarView from '@/views/CalendarView.vue'
import MyPage from '@/views/MyPage.vue'
import LogInView from '@/views/LogInView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/homepage',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: CalendarView,
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
    },
    {
      path: '/loginview',
      name: 'LogInView',
      component: LogInView,
    },
    // { path: '/', component: () => import('@/views/Home.vue') },
    // { path: '/calendar', component: () => import('@/views/Calendar.vue') },
    // {
    //   path: '/consumption',
    //   component: () => import('@/views/Consumption.vue'),
    // },
    // { path: '/mypage', component: () => import('@/views/MyPage.vue') },
    // { path: '/exit', component: () => import('@/views/Exit.vue') },
    // {
    //   path: '/',
    //   name: 'Home',
    // },
    // {
    //   path: '/list',
    //   name: 'historyList',
    //   component: () => import('@/views/HistoryList.vue'),
    // },
  ],
})

export default router
