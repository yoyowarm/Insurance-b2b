export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {
      permissions: []
    },
    level: ''
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_LEVEL(state, level) {
      state.level = level
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setLevel({ commit }, level) {
      commit('SET_LEVEL', level)
    },
    updatedUserInfo({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
    }
  },
}
