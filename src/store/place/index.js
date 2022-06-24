import { quotationStep2 } from '@/utils/dataTemp'
import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    InsuranceActive: 0,
    renewal: {
      IsRenewal: false,
      InsuranceNumber: '',
    },
    InsuranceRecord: {
      lastYear: {
        status: false,
        premium: '',
        amount: '',
      },
      previousYear: {
        status: false,
        premium: '',
        amount: '',
      }
    },
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
    UPDATED_PLACE_INFO(state, data) {
      state.placeInfo = data
    },
    DELETE_PLACE_INFO(state, index) {
      state.placeInfo.splice(index, 1)
    },
    UPDATED_PERIOD(state, payload) {
      state.period = payload
    },
    UPDATED_TERMS(state, terms) {
      state.terms = terms
    },
    UPDATED_RENEWAL(state, data) {
      state.renewal = data
    },
    SAME_AS_INSURED(state, sameAsInsured) {
      state.sameAsInsured = sameAsInsured
      if (sameAsInsured) {
        Vue.set(state, 'Applicant', state.Insuraned)
      } else {
        Vue.set(state, 'Applicant', quotationStep2().Applicant)
      }
    },
    UPDATED_INSURANCE_RECORD(state, data) {
      state.InsuranceRecord = data
    }
  },
  actions: {
    addPlaceInfo({ commit }) {
      commit('ADD_PLACE_INFO')
    },
    updatedPlaceInfo({ commit }, payload) {
      commit('UPDATED_PLACE_INFO', payload)
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
    updatedRenewal({ commit }, data) {
      commit('UPDATED_RENEWAL', data)
    },
    sameAsInsured({ commit }, sameAsInsured) {
      commit('SAME_AS_INSURED', sameAsInsured)
    },
    updatedInsuranceRecord({ commit }, data) {
      commit('UPDATED_INSURANCE_RECORD', data)
    }
  }
}