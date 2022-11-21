export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {
      permissions: []
    },
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    // async refreshToken({ commit }, token) {
    //   const { data } = await refreshToken(token)
    //   commit('SET_TOKEN', data)
    // },
    // async checkUser(_, token) {
    //   return await checkUser(token)
    // },
    updatedUserInfo({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
    }
  },
}
