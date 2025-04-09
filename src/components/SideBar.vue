<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)

const handleMouseEnter = () => {
  isExpanded.value = true
}
const handleMouseLeave = () => {
  isExpanded.value = false
}

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
  position: fixed;
  top: 60px;
  left: 0;
  width: 50px;
  height: 100vh;
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
