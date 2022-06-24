import { quotationStep2 } from '@/utils/dataTemp'
import Vue from 'vue';
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
    },
    SAME_AS_INSURED(state, sameAsInsured) {
      state.sameAsInsured = sameAsInsured
      if (sameAsInsured) {
        Vue.set(state, 'Applicant', state.Insuraned)
      } else {
        Vue.set(state, 'Applicant', quotationStep2().Applicant)
      }
    },
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
    },
    updatedRelation({ commit }, data) {
      commit('UPDATED_RELATION', data)
    },
    sameAsInsured({ commit }, sameAsInsured) {
      commit('SAME_AS_INSURED', sameAsInsured)
    },
  }
}