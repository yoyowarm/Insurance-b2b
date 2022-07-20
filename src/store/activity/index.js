import { quotation } from '@/utils/dataTemp'
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
      overseasOrDomestic: false,
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
      overseasOrDomestic: false,
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
    questionnaireFinished: false,
    questionnaire: {
      userId: '',
      part1: {
        businessType: {
          Text: '選擇種類',
          Value: '',
        },
        createTime: {
          year: '',
          month: '',
          day: '',
        },
        staffAmount: '',
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
        dailyAveragePersons: '',
        singleDayHighestPersons: '',
      },
      part2: {
        wallMaterial: '',
        floorMaterial: '',
        roofMaterial: '',
        distanceOfBuilding: '',
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
        useFloors: '',
        hasAntiSlip: false,
        hasSwimmingPool: false,
        lifeguardAmount: '',
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
        Vue.set(state, 'Applicant', quotation().Applicant)
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
    UPDATED_QUESTIONNAIRE_FINISHED(state, data) {
      state.questionnaireFinished = data
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
      commit('UPDATED_INSURANED', quotation().Insuraned)
      commit('UPDATED_APPLICANT', quotation().Applicant)
      commit('UPDATED_RELATION', quotation().Relation)
      commit('UPDATED_PLACE_INFO', quotation().placeInfo)
      commit('UPDATED_PERIOD', quotation().period)
      commit('UPDATED_TERMS', quotation().terms)
      commit('UPDATED_RENEWAL', quotation().renewal)
      commit('SAME_AS_INSURED', quotation().sameAsInsured)
      commit('UPDATED_INSURANCE_RECORD', quotation().InsuranceRecord)
      commit('UPDATED_INDUSTRY', quotation().industry)
      commit('UPDATED_INDUSTRY_TEXT', quotation().industryText)
      commit('UPDATED_REMARK', quotation().remark)
      commit('UPDATED_QUESTIONNAIRE', quotation().questionnaire)
      commit('UPDATED_INSURANCE_AMOUNT_LIST', quotation().insuranceAmountList)
      commit('UPDATED_QUESTIONNAIRE_FINISHED', false)
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
    updateQuestionnaireFinished({ commit }, data) {
      commit('UPDATED_QUESTIONNAIRE_FINISHED', data)
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