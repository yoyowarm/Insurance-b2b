export default {
  namespaced: true,
  state: {
    token: '',
    InsuranceActive: 0,
    placeInfo: [{
      state: false,
      square: 0,
      city: '',
      area: '',
      address: ''
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
    terms: {},
    Insuraned: {
      ID: '',
      Name: '',
      IsForeigner: false,
      Nationality: {
        Text: '',
        Value: ''
      },
      Corporate: '',
      CorporateRequired: false,
      City: {
        Text: '選擇縣市',
        Value: '',
      },
      Area: {
        Text: '選擇區域',
        Value: '',
      },
      Street: '',
      Mobile: '',
      IsForeignRegister: false,
      RegisterNationality: '',
      Profession: false,
      IsPolitician: false,
      IsOverseasOrDomestic: false,
      IsProOrNot: false,
    },
    Relation: {
      Text: '選擇關係',
      Value: '',
    },
    sameAsInsured: false,
    Applicant: {
      ID: '',
      Name: '',
      IsForeigner: false,
      Nationality: {
        Text: '',
        Value: ''
      },
      Corporate: '',
      CorporateRequired: false,
      City: {
        Text: '選擇縣市',
        Value: '',
      },
      Area: {
        Text: '選擇區域',
        Value: '',
      },
      Street: '',
      Mobile: '',
      IsForeignRegister: false,
      RegisterNationality: '',
      Profession: false,
      IsPolitician: false,
      IsOverseasOrDomestic: false,
      IsProOrNot: false,
    },
    SerailNo: '',
  },
  getters: {
  },
  mutations: {
    UPDATED_INSURANED(state, data) {
      state.Insuraned = data
    },
    UPDATED_APPLICANT(state, data) {
      state.Applicant = data
    },
    UPDATED_RELATION(state, data) {
      state.Relation = data
    },
    ADD_PLACE_INFO(state) {
      state.placeInfo.push({
        state: false,
        square: 0,
        city: '',
        area: '',
        address: ''
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
    },
    updatedInsuraned({ commit }, data) {
      commit('UPDATED_INSURANED', data)
    },
    updatedApplicant({ commit }, data) {
      commit('UPDATED_APPLICANT', data)
    },
    updatedRelation({ commit }, data) {
      commit('UPDATED_RELATION', data)
    },
  }
}