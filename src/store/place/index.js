import { quotationStep2 } from '@/utils/dataTemp'
import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    InsuranceActive: 0,
    renewal: {//是否續保
      IsRenewal: false,
      InsuranceNumber: '',
    },
    InsuranceRecord: {//投保紀錄
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
    placeInfo: [{//處所資料
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
    terms: {},//條款
    Insuraned: {//被保險人資料
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
    Relation: {//被保人與要保人之關係
      Text: '選擇關係',
      Value: '',
    },
    sameAsInsured: false,
    Applicant: {//要保險人資料
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
    industry: {//行業別
      Text: '選擇行業',
      Value: '',
    },
    industryText: '',
    remark: {//備註
      text: '',
      fileList: []
    },
    questionnaire: {//問卷
      userId: '',
      part1: {
        businessType: {//經營業務種類
          Text: '選擇種類',
          Value: '',
        },
        create: {
          year: '',
          month: '',
          day: '',
        },
        staff: '',//員工人數
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
        area: '',//基地面積
        totalArea: '',//總面積
        dailyAverage: '',//每日平均出入人數
        singleDayHighest: '',//單日最高出入人數
      },
      part2: {
        wallMaterial: '',//外牆建築材質
        floorMaterial: '',//樓地板建築材質
        roofMaterial: '',//屋頂建築材質
        distance: '',//距鄰近建築物
        buildingNature: {//建築性質
          Text: '選擇性質',
          Value: '',
        },
        nearbyBuildingNature: {//鄰近建築物性質
          Text: '選擇性質',
          Value: '',
        },
        securityCheck: {//公共安全檢查(經當地主管建築機關查核)
          Text: '公共安全檢查',
          Value: '',
        },
        room: {//營業性質之數量 如係屬飯店、旅館者
          selected: false,
          value: '',
        },
        seat: {//營業性質之數量 如係屬戲院、音樂廳者
          selected: false,
          value: '',
        },
        floors: '',//地上樓層數
        underground: '',//地下樓層數
        floor: '',//使用樓層數
        antiSlip: false,//樓梯是否有止滑條
        pool: false,//是否有游泳池
        lifeguard: '',//救生員人數
        material: '',//地板為何種材質
        carpet: false,//是否鋪設地談
      },
      part3: {
        selfOperated: false,//內部設施是否全數自行經營
        NotSelfOperated: '',//填寫非自行經營之項目
        balcony: false,//是否有陽台
        accessBalcony: false,//人員可否進入陽台
        carpetsCurtains: false,//是否有地毯、窗簾
        fireproofMaterial: false,//地毯、窗簾是否為防火材質
        compartment: false,//是否有客房隔間
        compartmentFireproofMaterial: false,//客房隔間是否為防火材質
        facility: [],//如有下列設施，請勾選
        pusher: false,//是否使用推高機
        performance: false,//是否有特殊表演項目
        fireOrDust: false,//涉及用火或粉塵表演
        professional: false,//表演者是否為專業人士
        dangerousItem: false,//使用、存放煙火爆竹或化學品等危險物品
        boiler: false,//使用鍋爐
      },
      part4: {
        centralControl: false,//是否設有中控中心以監控公用設備
        highVoltage: false,//是否使用高壓電設施(600V以上)
        bareWires: false,//是否有裸露電線或導體
        automaticPowerOff: false,//供電系統是否裝有自動斷電設備
        wireInTube: false,//所有電線是否裝在管內(含踏板)以避免短路
      },
      part5: {
        value1: false,//使用道路者，對附近交通之衝擊是否經交通主管機關認許
        value2: false,//未使用道路者，對附近交通之衝擊、停車事宜、行人及活動結束後之散場動線是否經交通主管機關認許
        value3: false,//保險處所與車道有無有效區隔(含車道與人員動線安排)
      },
      part6: {
        exit: false,//是否有出口規劃
        evacuationSign: false,//是否有疏散標示
        personnelControl: false,//是否有人員管制計畫
        evacuationPlan: false,//是否有疏散計畫(包含疏散路線、疏散指示、安全距離及避難場所)
        facility: [],//如有下列設施，請勾選
      },
      part7: {
        fireHydrant: false,//消防栓
        fireExtinguisher: false,//滅火器
        foam: {//泡沫型
          indoor: '',
          outdoor: '',
        },
        carbonDioxide: {//二氧化碳
          indoor: '',
          outdoor: '',
        },
        abc: {//ABC乾粉
          indoor: '',
          outdoor: '',
        },
        halon: {//海龍(halon)
          indoor: '',
          outdoor: '',
        },
        sprinkler: false,//是否有自動灑水系統
        gasExtinguishing: false,//是否有氣體滅火系統
        gasExtinguishingInstall: '',//氣體滅火系統安裝於何處
        foamExtinguishing: false,//是否有泡沫滅火系統
        foamExtinguishingInstall: '',//泡沫滅火系統安裝於何處
        waterMistExtinguishing: false,//是否有水霧滅火系統
        waterMistExtinguishingInstall: '',//水霧滅火系統安裝於何處
      },
      part8: {
        value1: false,//是否設置醫療站並配置醫護人員
        value2: false,//是否有防護或緊急設備
        value3: false,//是否有災害防護計畫
        value4: false,//是否有緊急應變計畫(包含應變人員編組和指定職責，如關鍵設備留守人員、警戒人員、醫療救護編組、消防編組等)
      },
      part9: {
        lossHistory: false,//被保險人過去五年是否有損失紀錄
        lostAmountFrequencyReason: ''//填寫損失金額、次數、原因
      },
    },
    insuranceAmountList: [//保險金額/自負額
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
    },
    UPDATED_INDUSTRY(state, data) {
      state.industry = data
    },
    UPDATED_INDUSTRY_TEXT(state, data) {
      state.industryText = data
    },
    UPDATED_REMARK(state, data) {
      state.remark = data
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
    },
    updatedIndustry({ commit }, data) {
      commit('UPDATED_INDUSTRY', data)
    },
    updatedIndustryText({ commit }, data) {
      commit('UPDATED_INDUSTRY_TEXT', data)
    },
    updatedRemark({ commit }, data) {
      commit('UPDATED_REMARK', data)
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