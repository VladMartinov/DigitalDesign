// Mutations Enum
export const mutation = {
  SET_FILTER: "SET_FILTER",
  SET_NUM_PAGE: "SET_NUM_PAGE"
}

export default {
  namespaced: true,
  state: {
    filter: {
      name: "",
      sortId: "dateCreated",
      orderType: "desc",
    },
    numPage: 1
  },
  getters: {
    getFilterObject: (state) => state.filter,
    getNumPage: (state) => state.numPage
  },
  mutations: {
    [mutation.SET_FILTER]: (state, payload) => {
      Object.assign(state.filter, payload)
    },
    [mutation.SET_NUM_PAGE]: (state, payload) => {
      state.numPage = payload
    }
  },
  actions: {
    setFilter: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_FILTER, payload)
    },
    setNumPage: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_NUM_PAGE, payload)
    }
  },
  modules: {
  }
}