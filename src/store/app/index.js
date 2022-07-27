export default {
  namespaced: true,
  state: {
    loading: [],
    currentPage: 0,
    totalPage: 0,
  },
  getters: {
  },
  mutations: {
    UPDATED_LOADING(state) {
      state.loading.push(true)
    },
    CLEAR_LOADING(state) {
      state.loading.pop()
    },
    UPDATED_TOTAL_PAGE(state, page) {
      state.totalPage = page
    },
    UPDATED_CURRENT_PAGE(state, page) {
      state.currentPage = page
    },
  },
  actions: {
    updatedLoading({ commit }) {
      commit('UPDATED_LOADING')
    },
    clearLoading({ commit }) {
      commit('CLEAR_LOADING')
    },
    updatedTotalPage({ commit }, totalPage) {
      commit('UPDATED_TOTAL_PAGE', totalPage)
    },
    updatedCurrentPage({ commit }, currentPage) {
      commit('UPDATED_CURRENT_PAGE', currentPage)
    },
  },
}
