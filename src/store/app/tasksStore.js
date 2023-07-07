// Mutations Enum
export const mutation = {
  SET_FILTER: "SET_FILTER",
  SET_FILTER_NAME: "SET_FILTER_NAME",
  SET_SORT: "SET_SORT",
  SET_SORT_TEXT: "SET_SORT_TEXT",
  SET_SORT_ID: "SET_SORT_ID",
  SET_ORDER_TYPE: "SET_ORDER_TYPE",
  SET_NUM_PAGE: "SET_NUM_PAGE"
}

export default {
  namespaced: true,
  state: {
    filter: {
      filterName: "",
      filterSortText: "По названию",
      filterSortId: "name",
      filterOrderType: "asc",
    },
    numPage: 1
  },
  getters: {
    getFilterObject: (state) => state.filter,
    getNumPage: (state) => state.numPage
  },
  mutations: {
    [mutation.SET_FILTER]: (state, payload) => {
      state.filter = payload
    },
    [mutation.SET_FILTER_NAME]: (state, payload) => {
      state.filter.filterName = payload
    },
    [mutation.SET_SORT]: (state, payload) => {
      state.filter.filterSortText = payload.text,
      state.filter.filterSortId = payload.id
    },
    [mutation.SET_ORDER_TYPE]: (state, payload) => {
      state.filter.filterOrderType = payload
    },
    [mutation.SET_NUM_PAGE]: (state, payload) => {
      state.numPage = payload
    }
  },
  actions: {
    setFilter: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_FILTER, payload)
    },
    setFilterName: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_FILTER_NAME, payload)
    },
    setFilterSort: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_SORT, payload)
    },
    setFilterOrderType: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_ORDER_TYPE, payload)
    },
    setNumPage: ({dispatch, commit, state, getters}, payload) => {
      commit(mutation.SET_NUM_PAGE, payload)
    }
  },
  modules: {
  }
}