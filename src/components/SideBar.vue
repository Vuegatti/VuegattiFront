<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)

const handleMouseEnter = () => {
  isExpanded.value = true
}
const handleMouseLeave = () => {
  isExpanded.value = false
}

// 메뉴 항목 정의 (라우터 연결용)
const menu = [
  { to: '/', label: 'Home', icon: 'fa fa-home' },
  { to: '/calendar', label: 'Calendar', icon: 'fa fa-calendar' },
  { to: '/consumption', label: 'Consumption', icon: 'fa fa-wallet' },
  { to: '/mypage', label: 'My Page', icon: 'fa fa-user' },
  { to: '/exit', label: 'EXIT', icon: 'fa fa-sign-out-alt' },
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
      <router-link
        v-for="item in menu"
        :key="item.to"
        :to="item.to"
        class="menu-item"
      >
        <i :class="item.icon"></i>
        <span class="label" v-if="isExpanded">{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.sidebar-wrapper {
  position: relative;
  width: 50px;
  transition: width 0.2s;
  background-color: #383838;
  color: white;
  height: 100vh;
  overflow: hidden;
}
.sidebar-wrapper.expanded {
  width: 200px;
}

.menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75em 1em;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
}
.menu-item:hover {
  background-color: #505050;
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
