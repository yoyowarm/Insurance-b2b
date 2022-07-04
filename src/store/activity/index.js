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
    terms: {},
    industry: {
      Text: '選擇行業',
      Value: '',
    },
    industryText: '',
    remark: {
      text: '',
      fileList: []
    },
    questionnaire: {
      userId: '',
      part1: {
        businessType: {
          Text: '選擇種類',
          Value: '',
        },
        create: {
          year: '',
          month: '',
          day: '',
        },
        staff: '',
        startDate: {
          hours: '',
          minutes: '',
          AmPm: '',
        },
        endDate: {
          hours: '',
          minutes: '',
          AmPm: '',
        },
        area: '',
        totalArea: '',
        dailyAverage: '',
        singleDayHighest: '',
      },
      part2: {
        wallMaterial: '',
        floorMaterial: '',
        roofMaterial: '',
        distance: '',
        buildingNature: {
          Text: '選擇性質',
          Value: '',
        },
        nearbyBuildingNature: {
          Text: '選擇性質',
          Value: '',
        },
        securityCheck: {
          Text: '公共安全檢查',
          Value: '',
        },
        room: {
          selected: false,
          value: '',
        },
        seat: {
          selected: false,
          value: '',
        },
        floors: '',
        underground: '',
        floor: '',
        antiSlip: false,
        pool: false,
        lifeguard: '',
        material: '',
        carpet: false,
      },
      part3: {
        selfOperated: false,
        NotSelfOperated: '',
        balcony: false,
        accessBalcony: false,
        carpetsCurtains: false,
        fireproofMaterial: false,
        compartment: false,
        compartmentFireproofMaterial: false,
        facility: [],
        pusher: false,
        performance: false,
        fireOrDust: false,
        professional: false,
        dangerousItem: false,
        boiler: false,
      },
      part4: {
        centralControl: false,
        highVoltage: false,
        bareWires: false,
        automaticPowerOff: false,
        wireInTube: false,
      },
      part5: {
        value1: false,
        value2: false,
        value3: false,
      },
      part6: {
        exit: false,
        evacuationSign: false,
        personnelControl: false,
        evacuationPlan: false,
        facility: [],
      },
      part7: {
        fireHydrant: false,
        fireExtinguisher: false,
        foam: {
          indoor: '',
          outdoor: '',
        },
        carbonDioxide: {
          indoor: '',
          outdoor: '',
        },
        abc: {
          indoor: '',
          outdoor: '',
        },
        halon: {
          indoor: '',
          outdoor: '',
        },
        sprinkler: false,
        gasExtinguishing: false,
        gasExtinguishingInstall: '',
        foamExtinguishing: false,
        foamExtinguishingInstall: '',
        waterMistExtinguishing: false,
        waterMistExtinguishingInstall: '',
      },
      part8: {
        value1: false,
        value2: false,
        value3: false,
        value4: false,
      },
      part9: {
        lossHistory: false,
        lostAmountFrequencyReason: ''
      },
    },
    insuranceAmountList: [
      {
        amount: {
          Text: '',
          Value: '',
        },
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        selfInflicted: {
          Text: '',
          Value: '',
        }
      }
    ]
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
    UPDATED_INDUSTRY(state, data) {
      state.industry = data
    },
    UPDATED_INDUSTRY_TEXT(state, text) {
      state.industryText = text
    },
    UPDATED_REMARK_TEXT(state, data) {
      state.remark.text = data
    },
    UPDATED_QUESTIONNAIRE(state, data) {
      state.questionnaire = data
    },
    UPDATED_INSURANCE_AMOUNT_LIST(state, data) {
      state.insuranceAmountList = data
    },
    ADD_INSURANCE_AMOUNT_LIST(state) {
      state.insuranceAmountList.push(state.insuranceAmountList[state.insuranceAmountList.length - 1])
    },
    DELETE_INSURANCE_AMOUNT_LIST(state, index) {
      state.insuranceAmountList.splice(index, 1)
    }
  },
  actions: {
    clearAll({ commit }) {
      commit('UPDATED_INSURANED', quotationStep2().Insuraned)
      commit('UPDATED_APPLICANT', quotationStep2().Applicant)
      commit('UPDATED_RELATION', quotationStep2().Relation)
      commit('UPDATED_PLACE_INFO', quotationStep2().placeInfo)
      commit('UPDATED_PERIOD', quotationStep2().period)
      commit('UPDATED_TERMS', quotationStep2().terms)
      commit('UPDATED_RENEWAL', quotationStep2().renewal)
      commit('SAME_AS_INSURED', quotationStep2().sameAsInsured)
      commit('UPDATED_INSURANCE_RECORD', quotationStep2().InsuranceRecord)
      commit('UPDATED_INDUSTRY', quotationStep2().industry)
      commit('UPDATED_INDUSTRY_TEXT', quotationStep2().industryText)
      commit('UPDATED_REMARK', quotationStep2().remark)
      commit('UPDATED_QUESTIONNAIRE', quotationStep2().questionnaire)
      commit('UPDATED_INSURANCE_AMOUNT_LIST', quotationStep2().insuranceAmountList)
    },
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
    updatedIndustry({ commit }, data) {
      commit('UPDATED_INDUSTRY', data)
    },
    updatedIndustryText({ commit }, data) {
      commit('UPDATED_INDUSTRY_TEXT', data)
    },
    updatedRemark({ commit }, data) {
      commit('UPDATED_REMARK_TEXT', data)
    },
    updatedQuestionnaire({ commit }, data) {
      commit('UPDATED_QUESTIONNAIRE', data)
    },
    updatedInsuranceAmountList({ commit }, data) {
      commit('UPDATED_INSURANCE_AMOUNT_LIST', data)
    },
    addInsuranceAmountList({ commit }) {
      commit('ADD_INSURANCE_AMOUNT_LIST')
    },
    deleteInsuranceAmountList({ commit }, index) {
      commit('DELETE_INSURANCE_AMOUNT_LIST', index)
    }
  }
}