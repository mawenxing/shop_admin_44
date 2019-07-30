import Vue from 'vue'
import App from './App.vue'
// 引入路由实例
import router from './router'

// 引入公共样式
import './assets/common.css'

// 引入 element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 解决axios的三个问题
import axios from 'axios'
// 问题1 :
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 问题2 :
Vue.prototype.$axios = axios // 以后的vue实例(组件) 都可以 this.$axios

// 问题3 : 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 添加token
    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 使用 Vue.use 安装一下
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
