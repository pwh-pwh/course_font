import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Admin',
    component: () => import('../views/Admin'),
    children: [
      {
        name: 'welcome',
        path: 'welcome', //注意这里不能加斜杠
        component: () => import('../views/admin/Welcome')
      },
      {
        name: 'business/chapter',
        path: 'business/chapter',
        component: () => import('../views/admin/Chapter')
      },
      {
        name: 'business/section',
        path: 'business/section',
        component: () => import('../views/admin/Section')
      },
      {
        name: 'business/course',
        path: 'business/course',
        component: () => import('../views/admin/Course')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
