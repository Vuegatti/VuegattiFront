<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isExpanded = ref(false)
const router = useRouter()
const route = useRoute()

const handleMouseEnter = () => {
  isExpanded.value = true
}
const handleMouseLeave = () => {
  isExpanded.value = false
}

const handleLogout = () => {
  localStorage.removeItem('userId')
  router.push('/login')
}

const topMenu = [
  { to: '/', label: 'Home', icon: 'fa fa-home' },
  { to: '/calendar', label: 'Calendar', icon: 'fa fa-calendar' },
  { to: '/consumption', label: 'Consumption', icon: 'fa fa-wallet' },
]

const bottomMenu = [
  { to: '/mypage', label: 'My Page', icon: 'fa fa-user' },
  { to: '/login', label: 'Logout', icon: 'fa fa-sign-out-alt', logout: true },
]
</script>

<template>
  <div
    class="sidebar-wrapper"
    :class="{ expanded: isExpanded }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <nav class="menu">
      <!-- 상단 메뉴 -->
      <div class="menu-top">
        <template v-for="item in topMenu" :key="item.to">
          <router-link
            :to="item.to"
            class="menu-item"
            :class="{ active: route.path === item.to }"
          >
            <i :class="item.icon"></i>
            <span class="label" v-if="isExpanded">{{ item.label }}</span>
          </router-link>
        </template>
      </div>

      <!-- 하단 고정 메뉴 -->
      <div class="menu-bottom">
        <template v-for="item in bottomMenu" :key="item.to">
          <div v-if="item.logout" class="menu-item" @click="handleLogout">
            <i :class="item.icon"></i>
            <span class="label" v-if="isExpanded">{{ item.label }}</span>
          </div>
          <router-link
            v-else
            :to="item.to"
            class="menu-item"
            :class="{ active: route.path === item.to }"
          >
            <i :class="item.icon"></i>
            <span class="label" v-if="isExpanded">{{ item.label }}</span>
          </router-link>
        </template>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.sidebar-wrapper {
  top: 0px;
  position: fixed;
  top: 60px;
  left: 0;
  width: 50px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: #383838;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: width 0.2s;
  color: var(--color-text);
}

.sidebar-wrapper.expanded {
  width: 200px;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 하단 고정 메뉴를 아래로 밀기 */
  height: 100%;
}

.menu-top,
.menu-bottom {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75em 1em;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
  cursor: pointer;
}
.menu-item:hover {
  background-color: #505050;
}
.menu-item.active {
  background-color: #606060;
}
.menu-item i {
  margin-right: 16px;
  width: 20px;
  text-align: center;
  font-size: 18px;
}
.label {
  white-space: nowrap;
}
</style>
