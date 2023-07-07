import Vue from 'vue'
import VueRouter from 'vue-router'

import PageTasks from "@/views/PageTasks.vue"
import PageTaskInfo from "@/views/PageTaskInfo.vue"

import PageProjects from "@/views/PageProjects.vue"
import PageProjectInfo from "@/views/PageProjectInfo.vue"

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
    path: '/projects',
    name: 'PageProjects',
    component: PageProjects
  },
  {
    path: '/projects/:projectId',
    name: 'PageProjectInfo',
    component: PageProjectInfo,
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
    component: PageTasks
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import("@/views/PageNotFound.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
