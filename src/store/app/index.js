import { getSetting, makeGlobalSetting } from '@/api/GlobalSetting'
export default {
  namespaced: true,
  state: {
    loading: [],
    currentPage: 0,
    totalPage: 0,
    appSetting: {
      showMessagePlatform: false,
    },
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
    UPDATED_APP_SETTING(state, appSetting) {
      state.appSetting = appSetting
    }
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
    async getSetting({ commit }) {
      const data = (await getSetting()).data.content
      commit('UPDATED_APP_SETTING', data)
    },
    async makeGlobalSetting(_, payload) {
      await makeGlobalSetting(payload)
    }
  },
}
