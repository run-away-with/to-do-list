import { createRouter,createWebHistory} from "vue-router";
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import NotFound from '../views/NotFound.vue'

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    meta: { 
      title: '用户中心', 
      requiresAuth: true // 需要登录验证
    },
    // 路由独享守卫（进入该路由前触发）
    beforeEnter: (to, from, next) => {
      console.log('即将进入用户中心路由');
      // 可额外做该路由的专属验证（比如权限细分）
      next(); // 放行
    }
  },
  
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '页面不存在' }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router