import Vue from 'vue'
import VueRouter from 'vue-router'

import PageTasks from "@/views/PageTasks.vue"
import PageTaskInfo from "@/views/PageTaskInfo.vue"
import PageAuth from "@/views/PageAuth.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/tasks',
    name: 'PageTasks',
    component: PageTasks
  },
  {
    path: '/tasks/:taskId',
    name: 'PageTaskInfo',
    component: PageTaskInfo,
    props: true,
  },
  {
    path: '/users',
    name: 'PageUsers',
    component: () => import("@/views/PageUsers.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('authToken')) {
        next()
      } else {
        console.log("The user is not logged in!");
        next('/auth')
      }
    }
  },
  {
    path: '/auth',
    name: 'PageAuth',
    component: PageAuth
  },
  {
    path: '/',
    redirect: {name: 'PageTasks'},
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import("@/views/PageNotFound.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
