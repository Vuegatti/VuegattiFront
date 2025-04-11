import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CalendarView from '@/views/CalendarView.vue'
import MyPageProFile from '@/views/MyPageProFile.vue'
import MyPage from '@/views/MyPage.vue'

import LogInView from '@/views/LogInView.vue'
import SignInView from '@/views/SignInView.vue'
import AccountReg from '@/views/AccountReg.vue'
import BankAccountSelect from '@/views/BankAccountSelect.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      redirect: '/main',
      component: MainView,
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
    {
      path: '/main',
      name: 'Main',
      component: MainView,
    },

    {
      path: '/consumption',
      name: 'Consumption',
      component: () => import('@/views/HistoryList.vue'),
    },
  ],
})

export default router
