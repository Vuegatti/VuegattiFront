import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CalendarView from '@/views/CalendarView.vue'
import MyPageProFile from '@/views/MyPageProFile.vue'
import MyPage from '@/views/MyPage.vue'

import LogInView from '@/views/LogInView.vue'
import SignInView from '@/views/SignInView.vue'
import AccountReg from '@/views/AccountReg.vue'
import BankAccountSelect from '@/views/BankAccountSelect.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/homepage',
      component: HomePage,
    },
    {
      path: '/homepage',
      name: 'Homepage',
      component: HomePage,
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: CalendarView,
    },
    {
      path: '/MyPageProFile',
      name: 'MyPageProFile',
      component: MyPageProFile,
    },
    {
      // { path: '/' component: () => import('@/views/Home.vue') },
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
    },
    {
      path: '/AccountReg',
      name: 'AccountReg',
      component: AccountReg,
    },
    {
      path: '/BankAccountSelect',
      name: 'BankAccountSelect',
      component: BankAccountSelect,
    },
    {
      path: '/logIn',
      name: 'LogIn',
      component: LogInView,
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignInView,
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
    {
      path: '/consumption',
      name: 'Consumption',
      component: () => import('@/views/HistoryList.vue'),
    },
  ],
})

export default router
