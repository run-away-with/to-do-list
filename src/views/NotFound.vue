<template>
    <!-- 404页面模板（必需） -->
    <div class="not-found-page">
        <h1>404 - 页面未找到</h1>
        <p>你访问的页面不存在或已被删除</p>
        <button @click="goBackHome" class="back-home-btn">返回首页</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
const router = useRouter();
// 脚本部分（必需，纯JS写法）
export default {
    name: 'NotFound',
    setup() {
        // 返回首页方法
        const goBackHome = () => {
            router.push('/');
        };

        return { goBackHome };
    }
};
</script>

<style scoped>
/* 样式可选，但template/script必须有 */
.not-found-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 18px;
    color: #333;
}

.back-home-btn {
    margin-top: 20px;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    background: #2196f3;
    color: #fff;
    cursor: pointer;
}

.back-home-btn:hover {
    background: #1976d2;
}
</style>