// Mutations
export const mutation = {
  SET_TOKEN: "SET_TOKEN",
  SET_LOADING_STATE: "SET_LOADING_STATE",
  SET_ROLE: "SET_ROLE"
}

export default {
  state: {
    token: "",
    loadingState: false,
    role: "",
  },
  getters: {
    getToken: (state) => state.token,
    getRole: (state) => state.role,
    getLoadingState: (state) => state.loadingState
  },
  mutations: {
    [mutation.SET_TOKEN]: (state, payload) => {
      state.token = payload
    },
    [mutation.SET_ROLE]: (state, payload) => {
      state.role = payload
    },
    [mutation.SET_LOADING_STATE]: (state, payload) => {
      state.loadingState = payload
    },
  },
  actions: {
    setToken: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_TOKEN, payload)
    },
    setRole: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_ROLE, payload)
    },
    setLoadingState: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_LOADING_STATE, payload)
    },
  },
  modules: {}
}
