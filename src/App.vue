<script setup>
import { ref } from 'vue'
const todoList = ref([])
const newItem = ref('')

function addItem() {
  if (newItem.value.trim() !== '') {
    todoList.value.push(newItem.value.trim())
    newItem.value = ''
  }
}

function clearItems() {
  todoList.value = []
}
</script>

<template>
<h1>本周待办事项</h1>
<ul>
  <li v-for="item in todoList" :key="item">
    <span>{{ item }}</span>
    <button id="delete" @click="todoList.splice(todoList.indexOf(item), 1)">删除</button>
  </li>
</ul>
<input v-model="newItem" @keyup.enter="addItem" placeholder="请输入待办事项" />
<button id="addItem" @click="addItem">添加</button><br/><br/>
<button id="clear" @click="clearItems">清空所有</button>
</template>

<style scoped>
ul{
  padding: 0;
}

li{
  display: flex;
  margin: 8px 0;
  font-size: 18px;
  background-color: rgb(249, 246, 246);
  text-align: left;
  list-style-type: none;
  padding-left: 8px; 
  border-radius: 5px;
  height: 50px;
  line-height: 50px;
}

input{
  padding: 4px;
  border: 1px solid #2058c0;
  border-radius: 4px;
  height: 34px;
  width: 400px;
}

#delete{
  margin-top: 8px;
  margin-left: auto;
  font-size: 14px;
  width: 60px;
  height: 34px;
  padding: 0;
  line-height: 34px;
  background-color:rgb(229, 61, 61);
}

#addItem {
  margin-left: 8px;
  background-color:rgb(61, 117, 229);
}

#clear{
  background-color:rgb(142, 128, 128);
}
</style>
