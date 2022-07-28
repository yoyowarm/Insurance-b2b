import { quotation } from '@/utils/dataTemp'
import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    uuid: '',
    activityInfo: [{
      number: '',
      city: {
        Text: '選擇縣市',
        Value: '',
      },
      area: {
        Text: '選擇區域',
        Value: '',
      },
      address: '',
      day: '1',
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
      city: {
        Text: '選擇縣市',
        Value: '',
      },
      area: {
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
    remark: {//備註
      text: '',
      fileList: []
    },
    questionnaireFinished: false,
    additionTerms: {//附加條款
      PL002: {//停車場責任附加條款
        value1: false,//停車場是否收費
        value2: false,//是否有代客停車
        value3: 0,//平面式車位
        value4: 0,//室內機械式車位
        value5: 0,//機械塔車位
      },
      PL003: {//電梯意外責任附加條款
        value1: false,//是否簽訂檢查維護合約
        value2: 0,//電扶梯
        value3: 0,//客/貨梯
        value4: 0,//汽車升降梯
        value5: 0,//其他種類
      },
      PL007: {//各級學校暨幼兒園責任附加條款
        value1: 0,//學員
        value2: 0,//幼兒
      },
      PL005: {//建築物承租人火災附加條款
        value1: 0,//每一意外事故
        value2: 0,//處所數量
      },
      PL016: {//獨立承攬人責任附加條款
        value1: 0,//承攬工程合約金額少於
      },
      PL022: {//裝卸搬運責任附加條款
        value1: 0,//每一意外事故財損責任之保險金額
        value2: 0,//保險期間內之最高賠償金額
      },
      PL023: {//慰問金費用附加條款
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: 0,
        value6: 0,
      },
      PL028: {//安養事業責任附加條款
        value1: 0,
        value2: 0,
      },
      PL040: {//受託物責任附加條款
        value1: 0,
        value2: 0,
      },
      PL041: {//接駁運送責任附加條款
        value1: 0,
        value2: 0,
      },
      PL043: {//保管箱責任附加條款
        value1: 0,
        value2: 0,
        value3: 0,
      },
      PL047: {//放棄代位求償權附加條款
        value1: '',
      },
      PL049: {//承租人借用人責任附加條款(保額外加)
        value1: 0,
      },
      PL053: {//傷害醫療及身故慰問金費用附加條款
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
      },
      PL055: {//營業中斷損失責任附加條款
        value1: 0,
        value2: 0,
      },
      PL058: {//液化石油氣及容器附加條款
        value1: 0,
      }
    },
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
    insuranceAmountList: [//保險金額/自負額
      {
        amountType: {
          Text: '依各縣市規定',
          Value: '0',
        },
        perBodyAmount: '',
        perAccidentBodyAmount: '',
        perAccidentFinanceAmount: '',
        insuranceTotalAmount: '',
        mergeSingleAmount: '',
        selfInflictedAmount: {
          Text: '',
          Value: '',
        },
        amount: null,
        parameter: {
          basicFee: '',
          finalHC: '',
          sizeParameter: '',
          selfInflictedParameter: '',
          shortPeriodParameter: '',
          additionalCostParameter: '',
          mutiSizeParameter: '',
          additionTermCoefficientParameter: '',
          aggAOACoefficient: '',
          amount: '',
        }
      }
    ],
    internalControlData: {//內部管制資料
      issuerNumber: '',//經手人代號
      businessSourceCode: {//業務來源代號
        Text: '個人',
        Value: 'O1'
      },
      statisticsCode: '',//統計代號
      loginIdNumber: '',//登入證字號
    },
    insuranceAmounts: '', //保險金額
    activityQuotation: {}//活動報價
  },
  getters: {
  },
  mutations: {
    ADD_ACTIVITY_INFO(state) {
      state.activityInfo.push({
        number: '',
        city: {
          Text: '選擇縣市',
          Value: '',
        },
        area: {
          Text: '選擇區域',
          Value: '',
        },
        address: '',
        day: '1',
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
    },
    UPDATED_ACTIVITY_INFO(state, data) {
      state.activityInfo = data
    },
    UPDATED_ADDITION_TERMS(state, data) {
      state.additionTerms = data
    },
    UPDATED_INTERNAL_CONTROL_DATA(state, data) {
      state.internalControlData = data
    },
    UPDATED_ACTIVITY_QUOTATION(state, data) {
      state.activityQuotation = data
    },
    UPDATED_INSURANED(state, data) {
      state.Insuraned = data
    },
    UPDATED_APPLICANT(state, data) {
      state.Applicant = data
    },
    UPDATED_RELATION(state, data) {
      state.Relation = data
    },
    UPDATED_REMARK(state, data) {
      state.remark = data
    },
    UPDATED_UUID(state, data) {
      state.uuid = data
    }
  },
  actions: {
    clearAll({ commit }) {
      commit('UPDATED_INSURANED', quotation().Insuraned)
      commit('UPDATED_APPLICANT', quotation().Applicant)
      commit('UPDATED_RELATION', quotation().Relation)
      commit('UPDATED_ACTIVITY_INFO', quotation().activityInfo)
      commit('UPDATED_PERIOD', quotation().period)
      commit('UPDATED_TERMS', quotation().terms)
      commit('SAME_AS_INSURED', quotation().sameAsInsured)
      commit('UPDATED_INDUSTRY', quotation().industry)
      commit('UPDATED_INDUSTRY_TEXT', quotation().industryText)
      commit('UPDATED_REMARK', quotation().remark)
      commit('UPDATED_QUESTIONNAIRE', quotation().questionnaire)
      commit('UPDATED_INSURANCE_AMOUNT_LIST', quotation().insuranceAmountList)
      commit('UPDATED_ADDITION_TERMS', quotation().additionTerms)
      commit('UPDATED_QUESTIONNAIRE_FINISHED', false)
      commit('UPDATED_ACTIVITY_QUOTATION', {})
      commit('UPDATED_INTERNAL_CONTROL_DATA', quotation().internalControlData)
      commit('UPDATED_UUID', '')
    },
    addActivityInfo({ commit }) {
      commit('ADD_ACTIVITY_INFO')
    },
    deleteActivityInfo({ commit }, index) {
      commit('DELETE_ACTIVITY_INFO', index)
    },
    updatedActivityInfo({ commit }, data) {
      commit('UPDATED_ACTIVITY_INFO', data)
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
    },
    updateAdditionTerms({ commit }, data) {
      commit('UPDATED_ADDITION_TERMS', data)
    },
    updateInternalControlData({ commit }, data) {
      commit('UPDATED_INTERNAL_CONTROL_DATA', data)
    },
    updateActivityQuotation({ commit }, data) {
      commit('UPDATED_ACTIVITY_QUOTATION', data)
    },
    updatedInsuraned({ commit }, data) {
      commit('UPDATED_INSURANED', data)
    },
    updatedApplicant({ commit }, data) {
      commit('UPDATED_APPLICANT', data)
    },
    updatedUUID({ commit }, uuid) {
      commit('UPDATED_UUID', uuid)
    }
  }
}