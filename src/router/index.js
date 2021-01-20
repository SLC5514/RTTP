import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  // 404
  { path: '*', redirect: '/' }
]

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    base: process.env.BASE_URL,
    routes: constantRoutes,
    scrollBehavior: () => ({ y: 0 })
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
