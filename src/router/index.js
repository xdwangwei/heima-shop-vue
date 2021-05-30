import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/home", component: Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome', component: Welcome},
      {path: '/users', component: Users}
    ] 
  }
]

const router = new VueRouter({
  routes
})

/* 路由导航守卫，路由跳转之前的限制
  to：要跳转到的路径对象
  from： 当前页从哪个路径跳转而来
  next： 放行方法
    next()直接放行
    next(path)放行到指定路径
 */
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  /* 放行登录请求 */
  if (to.path === '/login') return next()
  /* 除登录以外的请求，先判断是否携带token， */
  let token = window.sessionStorage.getItem("token")
  /* 必须先登录 */
  if (!token) return next('/login')
  /* 已登录过则放行 */
  next()
})

export default router
