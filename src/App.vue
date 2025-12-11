<script setup>
import { ref } from 'vue'

// 初始用户信息
const user = ref({
  id: 1,
  name: '张三'
})

</script>

<template>
  <!-- 路由导航 -->
  <nav>
    <router-link to="/">首页</router-link> |
    <router-link :to="{ name: 'User', params: { id: user.id } }">用户</router-link> |
  </nav>
  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<style scoped>
nav {
  margin: 20px 0;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.router-link {
  text-decoration: none;
  color: #2058c0;
  font-size: 18px;
}

.router-link-active {
  font-weight: bold;
  color: #000000;
}
</style>
