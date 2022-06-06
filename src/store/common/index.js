export default {
  namespaced: true,
  state: {
    viewModel: false
  },
  getters: {
  },
  mutations: {
    UPDATED_VIEW_MODEL(state, viewModel) {
      state.viewModel = viewModel
    }
  },
  actions: {
    updatedViewModel({ commit }, viewModel) {
      commit('UPDATED_VIEW_MODEL', viewModel)
    }
  }
}