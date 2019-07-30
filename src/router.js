// 1. 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 第三步 : 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Users from './components/users/Users.vue'
import Roles from './components/roles/Roles.vue'
import Rights from './components/rights/Rights.vue'

// 1.5 安装
Vue.use(VueRouter)

// 2. 实例化路由
const router = new VueRouter({
  // 第二步 : 规则
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]
})

// 全局导航守卫
// to : 访问的目标路由对象
// from : 来源路由对象
// next 下一步 是否允许
router.beforeEach((to, from, next) => {
  // 1. 判断访问的是不是登录页
  // 是登录页
  if (to.path === '/login') {
    next()
  } else {
    // 不是登录页 其他页面
    // 2.  判断是否登录
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

// 3. 导出路由 + 挂载
export default router
