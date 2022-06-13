export default {
  namespaced: true,
  state: {
    viewModel: false,
    editModel: false,
  },
  getters: {
  },
  mutations: {
    UPDATED_VIEW_MODEL(state, viewModel) {
      state.viewModel = viewModel
    },
    UPDATED_EDIT_MODEL(state, editModel) {
      state.editModel = editModel
    }
  },
  actions: {
    updatedViewModel({ commit }, viewModel) {
      commit('UPDATED_VIEW_MODEL', viewModel)
    },
    updatedEditModel({ commit }, editModel) {
      commit('UPDATED_EDIT_MODEL', editModel)
    }
  }
}