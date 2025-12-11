<template>
    <div class="home-container">
        <h1>本周待办事项</h1>
        <p>测试添加</p>
        <ul>
            <li v-for="item in todoList" :key="item">
                <span>{{ item }}</span>
                <button id="delete" @click="removeItem(item)">删除</button>
            </li>
        </ul>
        <input v-model="newItem" @keyup.enter="addItem" placeholder="请输入待办事项" />
        <button id="addItem" @click="addItem">添加</button><br /><br />
        <button id="clear" @click="clearItems">清空所有</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 待办事项列表
const todoList = ref([])
// 新事项输入框
const newItem = ref('')

// 添加待办事项
const addItem = () => {
    if (newItem.value.trim()) {
        todoList.value.push(newItem.value.trim())
        newItem.value = ''
    }
}

// 移除单个事项
const removeItem = (item) => {
    const index = todoList.value.indexOf(item)
    if (index !== -1) {
        todoList.value.splice(index, 1)
    }
}

// 清空所有事项
const clearItems = () => {
    todoList.value = []
}
</script>

<style scoped>
.home-container {
    margin-top: 20px;
}

ul {
    padding: 0;
}

li {
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

input {
    padding: 4px;
    border: 1px solid #2058c0;
    border-radius: 4px;
    height: 34px;
    width: 400px;
}

#delete {
    margin-top: 8px;
    margin-left: auto;
    font-size: 14px;
    width: 60px;
    height: 34px;
    padding: 0;
    line-height: 34px;
    background-color: rgb(229, 61, 61);
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}

#addItem {
    margin-left: 8px;
    background-color: rgb(61, 117, 229);
}

#clear {
    background-color: rgb(142, 128, 128);
}

/* 复用全局按钮样式并添加组件内补充样式 */
button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    color: white;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s, transform 0.25s;
}

button:hover {
    border-color: #646cff;
    transform: scale(1.05);
}
</style>