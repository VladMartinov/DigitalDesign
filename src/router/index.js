import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginForm from '@/components/LoginForm/LoginForm.vue'

import PageTasks from "@/views/PageTasks.vue"
import PageTaskInfo from "@/views/PageTaskInfo.vue"

import PageProjects from "@/views/PageProjects.vue"

import Profile from "@/components/Profile/Profile.vue"
import PageUsers from "@/views/PageUsers.vue"

import WorkOnTask from "@/components/WorkOnTask/WorkOnTask.vue"
import WorkOnProfile from "@/components/WorkOnProfile/WorkOnProfile.vue"

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tasks',
    name: 'PageTasks',
    component: PageTasks
  },
  {
    path: '/tasks/create-task',
    name: 'PageCreateTask',
    component: WorkOnTask,
  },
  {
    path: '/tasks/update-task',
    name: 'PageUpdateTask',
    component: WorkOnTask,
    props: true,
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
    path: '/users',
    name: 'PageUsers',
    component: PageUsers,
  },
  {
    path: '/users/:userId',
    name: 'ProfileUser',
    component: Profile,
    props: true,
  },
  {
    path: '/users/update/:userId',
    name: 'PageUserUpdate',
    component: () => import("@/components/WorkOnProfile/WorkOnProfile.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      if (store.getters.getRole !== "ADMIN") {
        next({ name: 'NotFound' });
      } else {
        next();
      }
    }
  },
  {
    path: '/users/create',
    name: 'PageUserCreate',
    component: () => import("@/components/AddUser/AddUser.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getRole !== "ADMIN") {
        next({ name: 'NotFound' });
      } else {
        next();
      }
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/profile/update',
    name: 'ProfileUpdate',
    component: WorkOnProfile,
  },
  {
    path: '/auth',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/',
    redirect: {name: 'PageProjects'},
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

router.beforeEach((to, from, next) => {
  if (to.name !== 'LoginForm' && store.getters.getToken === "") next({ name: 'LoginForm' });
  else if (to.name === 'LoginForm' && store.getters.getToken !== "") next({ name: 'PageProjects' });
  else next();
})

export default router
