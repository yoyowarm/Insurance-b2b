export default {
  namespaced: true,
  state: {
    token: '',
    activityInfo: [{
      number: '',
      City: {
        placeholder: '選擇縣市',
        id: '',
      },
      Area: {
        placeholder: '選擇區域',
        id: '',
      },
      address: '',
      day: '',
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
    ADD_ACTIVITY_INFO(state) {
      state.activityInfo.push({
        number: '',
        City: {
          placeholder: '選擇縣市',
          id: '',
        },
        Area: {
          placeholder: '選擇區域',
          id: '',
        },
        address: '',
        day: '',
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
      })
    },
    DELETE_ACTIVITY_INFO(state, index) {
      state.activityInfo.splice(index, 1)
    },
    UPDATED_PERIOD(state, payload) {
      state.period = payload
    },
    UPDATED_TERMS(state, terms) {
      state.terms = terms
    }
  },
  actions: {
    addActivityInfo({ commit }) {
      commit('ADD_ACTIVITY_INFO')
    },
    deleteActivityInfo({ commit }, index) {
      commit('DELETE_ACTIVITY_INFO', index)
    },
    updatedPeriod({ commit }, period) {
      commit('UPDATED_PERIOD', period)
    },
    updatedTerms({ commit }, terms) {
      commit('UPDATED_TERMS', terms)
    }
  }
}