import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import root from "./app/root"

import projectsStore from "./app/projectsStore"
import tasksStore from "./app/tasksStore"
import usersStore from "./app/usersStore"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    root,
    projectsStore, tasksStore, usersStore
  }
})
