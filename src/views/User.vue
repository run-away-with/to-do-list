<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

// 1. 获取路由/路由跳转对象
const route = useRoute()
const router = useRouter()
// 响应式变量：存储用户信息
const userInfo = ref(null)
// 提取路由参数id并转数字
const userId = Number(route.params.id)
// 响应式变量
const loading = ref(true); // 加载状态

// 3. 权限控制（实际项目从后端/登录状态获取）
const hasEditPermission = true     // 编辑权限
const hasFollowPermission = true  // 关注权限
const hasManagePermission = true  // 禁用/启用权限
const hasDeletePermission = true  // 删除权限

// 4. 时间格式化辅助函数
const formatTime = (time) => {
    if (!time) return '-'
    return new Date(time).toLocaleString('zh-CN')
}

onMounted(() => {
    fetchUserInfo(userId)
})

// 5. 模拟获取用户信息（包含完整字段）
async function fetchUserInfo(id) {
    loading.value = true
    try {
        // 模拟异步请求（替换为真实接口：fetch/axios）
        const res = await new Promise((resolve) => {
            setTimeout(() => {
                // 模拟用户不存在（ID=0时返回null）
                if (id === 0) {
                    resolve(null)
                } else {
                    resolve({
                        id: id,
                        name: `用户${id}`,
                        age: 20 + id % 10,
                        phone: `13800138${String(id).padStart(4, '0')}`,
                        // 头像URL
                        avatar: 'src/assets/vue.svg',
                        registerTime: new Date('2023-01-01').getTime(), // 注册时间戳
                        status: 1, // 1=启用 0=禁用
                        isFollowed: false // 是否已关注
                    })
                }
            }, 500)
        })
        return res
    } catch (err) {
        console.error('获取用户信息失败：', err)
        alert('获取用户信息失败，请重试！')
        return null
    } finally {
        loading.value = false // 无论成功/失败，结束加载
    }
}

// 6. 操作方法：跳转到编辑页
const toEditPage = () => {
    router.push(`/user/${userId}/edit`)
}

// 7. 操作方法：关注/取消关注
const toggleFollow = async () => {
    if (!userInfo.value) return
    try {
        // 模拟后端请求
        await new Promise(resolve => setTimeout(resolve, 300))
        userInfo.value.isFollowed = !userInfo.value.isFollowed
        alert(`已${userInfo.value.isFollowed ? '关注' : '取消关注'}该用户！`)
    } catch (err) {
        alert('操作失败，请重试！')
    }
}

// 8. 操作方法：禁用/启用用户
const toggleUserStatus = async () => {
    if (!userInfo.value) return
    if (!confirm(`确认要${userInfo.value.status === 1 ? '禁用' : '启用'}该用户吗？`)) return

    try {
        // 模拟后端请求
        await new Promise(resolve => setTimeout(resolve, 300))
        userInfo.value.status = userInfo.value.status === 1 ? 0 : 1
        alert(`该用户已被${userInfo.value.status === 1 ? '启用' : '禁用'}！`)
    } catch (err) {
        alert('操作失败，请重试！')
    }
}

// 9. 操作方法：删除用户（带权限校验）
const deleteUser = async () => {
    if (!userInfo.value) return
    if (!confirm('确认要删除该用户吗？此操作不可恢复！')) return

    // 权限二次校验
    if (!hasDeletePermission) {
        alert('您暂无删除用户的权限！')
        return
    }

    try {
        // 模拟后端请求
        await new Promise(resolve => setTimeout(resolve, 300))
        alert('用户删除成功！')
        router.push('/user/list') // 删除后返回列表页
    } catch (err) {
        alert('删除失败，请重试！')
    }
}


// 10. 页面挂载后加载数据（仅保留一个onMounted）
onMounted(async () => {
    if (userId) {
        const data = await fetchUserInfo(userId)
        userInfo.value = data
    } else {
        loading.value = false
        userInfo.value = null
    }
})

</script>

<template>
    <div class="user-detail">
        <!-- 加载中状态 -->
        <div v-if="loading" class="loading">加载中...</div>

        <!-- 用户不存在提示 -->
        <div v-else-if="!userInfo" class="user-not-found">
            该用户不存在或已被删除！
        </div>

        <!-- 核心内容：用户信息展示 -->
        <div v-else class="user-info-container">
            <!-- 基础信息区域 -->
            <div class="base-info">
                <!-- 头像 -->
                <img class="avatar" :src="userInfo.avatar || '/default-avatar.png'" alt="用户头像">
                <!-- 基础信息 -->
                <div class="base-info-content">
                    <h2>{{ userInfo.name }}</h2>
                    <p>用户ID:{{ userInfo.id }}</p>
                    <p>年龄：{{ userInfo.age }}</p>
                    <p>电话：{{ userInfo.phone }}</p>
                    <p>注册时间：{{ formatTime(userInfo.registerTime) }}</p>
                    <p>账号状态：
                        <span :class="['status-tag', userInfo.status === 1 ? 'active' : 'disabled']">
                            {{ userInfo.status === 1 ? '启用' : '禁用' }}
                        </span>
                    </p>
                </div>

                <!-- 操作按钮区（按权限显示） -->
                <div class="operation-btns">
                    <!-- 编辑用户 -->
                    <button v-if="hasEditPermission" class="btn edit-btn" @click="toEditPage">
                        编辑信息
                    </button>
                    <!-- 关注/取消关注 -->
                    <button v-if="hasFollowPermission" class="btn follow-btn" @click="toggleFollow">
                        {{ userInfo.isFollowed ? '取消关注' : '关注' }}
                    </button>
                    <!-- 禁用/启用 -->
                    <button v-if="hasManagePermission" class="btn manage-btn" @click="toggleUserStatus">
                        {{ userInfo.status === 1 ? '禁用' : '启用' }}
                    </button>
                    <!-- 删除用户 -->
                    <button v-if="hasDeletePermission" class="btn delete-btn" @click="deleteUser">
                        删除用户
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 基础样式 */
.user-detail {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;
}

/* 加载/无数据提示 */
.loading,
.user-not-found {
    text-align: center;
    padding: 50px;
    font-size: 16px;
    color: #666;
}

/* 头像样式 */
.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
}

/* 基础信息容器 */
.base-info {
    display: flex;
    align-items: center;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
}

.base-info-content {
    flex: 1;
}

.base-info-content h2 {
    margin: 0 0 10px 0;
}

.base-info-content p {
    margin: 5px 0;
    color: #333;
}

/* 状态标签 */
.status-tag {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.status-tag.active {
    background: #e8f5e9;
    color: #4caf50;
}

.status-tag.disabled {
    background: #ffebee;
    color: #f44336;
}

/* 操作按钮 */
.operation-btns {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.edit-btn {
    background: #2196f3;
}

.follow-btn {
    background: #ff9800;
}

.manage-btn {
    background: #9c27b0;
}

.delete-btn {
    background: #f44336;
}

.btn:hover {
    opacity: 0.9;
}
</style>