import { quotation } from '@/utils/dataTemp'
import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    uuid: '',
    InsuranceActive: 0,
    quotationData: {},
    renewal: {//是否續保
      IsRenewal: false,
      InsuranceNumber: '',
    },
    InsuranceRecord: {//投保紀錄
      lastYear: {
        status: false,
        averagePremium: '',
        claimAmount: '',
      },
      previousYear: {
        status: false,
        averagePremium: '',
        claimAmount: '',
      }
    },
    placeInfo: [{//處所資料
      holdState: false,
      squareFeet: 0,
      city: {
        Text: '選擇縣市',
        Value: '',
      },
      area: {
        Text: '選擇區域',
        Value: '',
      },
      subAddress: ''
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
      CorporateName: '',
      CorporateRequired: false,
      City: {
        Text: '選擇縣市',
        Value: '',
      },
      Area: {
        Text: '選擇區域',
        Value: '',
      },
      subAddress: '',
      Mobile: '',
      IsForeignRegister: false,
      RegisterNationality: '',
      Profession: false,
      IsPolitician: false,
      overseasOrDomestic: false,
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
      CorporateName: '',
      CorporateRequired: false,
      City: {
        Text: '選擇縣市',
        Value: '',
      },
      Area: {
        Text: '選擇區域',
        Value: '',
      },
      subAddress: '',
      Mobile: '',
      IsForeignRegister: false,
      RegisterNationality: '',
      Profession: false,
      IsPolitician: false,
      overseasOrDomestic: false,
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
    questionnaireFinished: false,
    questionnaire: {//問卷
      userId: '',
      part1: {
        businessType: '',//經營業務種類,
        createTime: {
          year: '',
          month: '',
          day: '',
        },
        staffAmount: '',//員工人數
        businessStartDate: {
          hours: '00',
          minutes: '00',
        },
        businessEndDate: {
          hours: '00',
          minutes: '00',
        },
        area: '',//基地面積
        totalArea: '',//總面積
        dailyAveragePersons: '',//每日平均出入人數
        singleDayHighestPersons: '',//單日最高出入人數
      },
      part2: {
        wallMaterial: '',//外牆建築材質
        floorMaterial: '',//樓地板建築材質
        roofMaterial: '',//屋頂建築材質
        distanceOfBuilding: '',//距鄰近建築物
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
        useFloors: '',//使用樓層數
        hasAntiSlip: null,//樓梯是否有止滑條
        hasSwimmingPool: null,//是否有游泳池
        lifeguardAmount: '',//救生員人數
        material: '',//地板為何種材質
        hasCarpet: null,//是否鋪設地談,
        hasMechineParkingDevice: null,//是否有機車停車場
        mechineParkingDeviceCategory: '',//機車停車場類別
      },
      part3: {
        selfOperated: null,//內部設施是否全數自行經營
        notSelfOperated: '',//填寫非自行經營之項目
        hasBalcony: null,//是否有陽台
        canAccessBalcony: null,//人員可否進入陽台
        hasFireproofMaterial: null,//地毯、窗簾是否為防火材質
        hasCompartmentFireproofMaterial: null,//客房隔間是否為防火材質
        facility: [],//如有下列設施，請勾選
        hasPusher: null,//是否使用推高機
        hasFireOrDust: null,//涉及用火或粉塵表演
        isProfessional: null,//表演者是否為專業人士
        hasDangerousItem: null,//使用、存放煙火爆竹或化學品等危險物品
        hasBoiler: null,//使用鍋爐
      },
      part4: {
        hasCentralControl: null,//是否設有中控中心以監控公用設備
        hasHighVoltage: null,//是否使用高壓電設施(600V以上)
        hasBareWires: null,//是否有裸露電線或導體
        hasAutomaticPowerOff: null,//供電系統是否裝有自動斷電設備
        hasWireInTube: null,//所有電線是否裝在管內(含踏板)以避免短路
      },
      part5: {
        useRoadHasAccessByTransportation: null,//使用道路者，對附近交通之衝擊是否經交通主管機關認許
        afterActivityHasAccessByTransportation: null,//未使用道路者，對附近交通之衝擊、停車事宜、行人及活動結束後之散場動線是否經交通主管機關認許
        hasSegmentWithInsurancePlaceAndLane: null,//保險處所與車道有無有效區隔(含車道與人員動線安排)
      },
      part6: {
        hasExit: null,//是否有出口規劃
        hasEvacuationSign: null,//是否有疏散標示
        hasPersonnelControl: null,//是否有人員管制計畫
        hasEvacuationPlan: null,//是否有疏散計畫(包含疏散路線、疏散指示、安全距離及避難場所)
        facility: [],//如有下列設施，請勾選
      },
      part7: {
        hasFireHydrant: false,//消防栓
        hydrantIndoorAmount: '',//內部消防栓數量
        hydrantOutdoorAmount: '',//外部消防栓數量
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
        hasSprinkler: null,//是否有自動灑水系統
        hasGasExtinguishing: null,//是否有氣體滅火系統
        gasExtinguishingInstall: '',//氣體滅火系統安裝於何處
        hasFoamExtinguishing: null,//是否有泡沫滅火系統
        foamExtinguishingInstall: '',//泡沫滅火系統安裝於何處
        hasWaterMistExtinguishing: null,//是否有水霧滅火系統
        waterMistExtinguishingInstall: '',//水霧滅火系統安裝於何處
        hasOtherExtinguishing: false,//是否有其他滅火系統
        otherExtinguishingRemark: '',//其他滅火系統備註
        HasEquipmentTestAndTrain: null,//是否有設備測試及訓練,
        hasNoSmokingControl: null,//是否有禁菸管制
        hasAlertSystem: null,//是否有監視或預警系統
        hasSwitchboardNormalState: null,//是否受信總機正常使用並有專人看守
        hasCleaner: null,//是否有清潔工
        hasClutterAtAisle: null,//是否有滋潤品放置於走廊
      },
      part8: {
        hasMedicalSiteAndPersons: null,//是否設置醫療站並配置醫護人員
        hasProtectDevice: null,//是否有防護或緊急設備
        hasDisasterProtectPlan: null,//是否有災害防護計畫
        hasEmergencyManagementPlan: null,//是否有緊急應變計畫(包含應變人員編組和指定職責，如關鍵設備留守人員、警戒人員、醫療救護編組、消防編組等)
      },
      part9: {
        hasLossHistoryBeforeFiveYear: null,//被保險人過去五年是否有損失紀錄
        lostAmountFrequencyReason: ''//填寫損失金額、次數、原因
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
          Text: '0元',
          Value: '0',
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
          periodParameter: '',
          additionTermCoefficientParameter: '',
          aggAOACoefficient: '',
          amount: '',
          underwriteCoefficient: '0',
        }
      }
    ],
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
        value1: 1000,
        value2: 5000,
        value3: 10000,
        value4: 10000,
        value5: 50000,
        value6: 100000,
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
    internalControlData: {//內部管制資料
      issuerNumber: '',//經手人代號
      businessSourceCode: {//業務來源代號
        Text: '個人',
        Value: 'F1'
      },
      statisticsCode: '',//統計代號
      loginIdNumber: '',//登入證字號
    },
    insuranceAmounts: '', //保險金額
    placeQuotation: {}//場次報價
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
        holdState: false,
        squareFeet: 0,
        city: '',
        area: '',
        subAddress: ''
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
        // Vue.set(state, 'Applicant', quotation().Applicant)
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
    UPDATED_INSURANCE_AMOUNT(state, data) {
      state.insuranceAmounts = data
    },
    UPDATED_ADDITION_TERMS(state, data) {
      state.additionTerms = data
    },
    UPDATED_INTERNAL_CONTROL_DATA(state, data) {
      state.internalControlData = data
    },
    UPDATED_PLACE_QUOTATION(state, data) {
      state.placeQuotation = data
    },
    UPDATED_UUID(state, data) {
      state.uuid = data
    },
    UPDATED_INSURANCE_ACTIVE(state, data) {
      state.InsuranceActive = data
    },
    UPDATED_QUOTATION_DATA(state, data) {
      state.quotationData = data
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
      commit('UPDATED_INSURANCE_AMOUNT', quotation().insuranceAmounts)
      commit('UPDATED_ADDITION_TERMS', quotation().additionTerms)
      commit('UPDATED_PLACE_QUOTATION', {})
      commit('UPDATED_QUESTIONNAIRE_FINISHED', false)
      commit('UPDATED_INTERNAL_CONTROL_DATA', quotation().internalControlData)
      commit('UPDATED_UUID', '')
      commit('UPDATED_INSURANCE_ACTIVE', 0),
        commit('UPDATED_QUOTATION_DATA', {})
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
    updateInsuranceAmounts({ commit }, data) {
      commit('UPDATED_INSURANCE_AMOUNT', data)
    },
    updateAdditionTerms({ commit }, data) {
      commit('UPDATED_ADDITION_TERMS', data)
    },
    updateInternalControlData({ commit }, data) {
      commit('UPDATED_INTERNAL_CONTROL_DATA', data)
    },
    updatePlaceQuotation({ commit }, data) {
      commit('UPDATED_PLACE_QUOTATION', data)
    },
    updatedUUID({ commit }, uuid) {
      commit('UPDATED_UUID', uuid)
    },
    updatedInsuranceActive({ commit }, type) {
      commit('UPDATED_INSURANCE_ACTIVE', type)
    },
    updatedQuotationData({ commit }, data) {
      commit('UPDATED_QUOTATION_DATA', data)
    }
  }
}