export default {
  namespaced: true,
  state: {
    token: '',
    placeInfo: [{
      state: false,
      square: 0,
      city: '',
    }],
    period: {
      startDate: {
        year: '',
        month: '',
        day: '',
        hour: ''
      },
      endDate: {
        year: '',
        month: '',
        day: '',
        hour: ''
      },
    },
    terms: {}
  },
  getters: {
  },
  mutations: {
    ADD_PLACE_INFO(state) {
      state.placeInfo.push({
        state: false,
        square: 0,
        city: '',
      })
    },
    DELETE_PLACE_INFO(state, index) {
      state.placeInfo.splice(index, 1)
    },
    UPDATED_PERIOD(state, payload) {
      state.period = payload
    },
    UPDATED_TERMS(state, terms) {
      state.terms = terms
    }
  },
  actions: {
    addPlaceInfo({ commit }) {
      commit('ADD_PLACE_INFO')
    },
    deletePlaceInfo({ commit }, index) {
      commit('DELETE_PLACE_INFO', index)
    },
    updatedPeriod({ commit }, period) {
      commit('UPDATED_PERIOD', period)
    },
    updatedTerms({ commit }, terms) {
      commit('UPDATED_TERMS', terms)
    }
  }
}