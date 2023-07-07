import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import projectsStore from "./app/projectsStore"
import tasksStore from "./app/tasksStore"
import usersStore from "./app/usersStore"

// Mutations
export const mutation = {
  SET_TOKEN: "SET_TOKEN",
  SET_LOADING_STATE: "SET_LOADING_STATE"
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    loadingState: false
  },
  getters: {
    getToken: (state) => state.token,
    getLoadingState: (state) => state.loadingState
  },
  mutations: {
    [mutation.SET_TOKEN]: (state, payload) => {
      state.token = payload
    },
    [mutation.SET_LOADING_STATE]: (state, payload) => {
      state.loadingState = payload
    },
  },
  actions: {
    setToken: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_TOKEN, payload)
    },
    setLoadingState: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_LOADING_STATE, payload)
    },
  },
  modules: {
    projectsStore, tasksStore, usersStore
  }
})
