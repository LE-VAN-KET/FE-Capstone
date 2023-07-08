import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Home from '../views/home/index.vue'

import Diploma from '../views/diplomas/Diploma.vue'
import Page2 from '../views/diplomas/page2.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/catalog',
        name: 'catalog',
        component: () => import('@/views/catalog/index')
      },
      {
        path: '/phoi',
        name: 'phoi',
        component: () => import('@/views/phoi/index')
      },
      {
        path: '/student-graduation',
        name: 'student-graduation',
        component: Diploma
      },
      {
        path: '/page2',
        name: 'page2',
        component: Page2
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/diplomas/users/index.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/') {
    next()
  } else {
    console.log('error')
    console.log(to.path)
    const token = window.localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
