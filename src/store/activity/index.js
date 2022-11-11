import { quotation } from '@/utils/dataTemp'
import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    uuid: '',
    InsuranceActive: 0,//0:新增、複製,1:更改,2:更改要被保人,3:新增序號,4:續保,5:報價明細,6:查看取消序號報價單
    quotationData: {},
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
      activityName: '',
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
      CorporateName: '',
      CorporateRequired: false,
      city: {
        Text: '選擇縣市',
        Value: '',
      },
      area: {
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
    policyTransfer: {
      transferType: 1,
      transferDetails: [
        {
          transferDetailType: false,
          transferOriginalType: false,
          transferInfo: '',
          sort: 0
        }
      ]
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
        value3: '',//平面式車位
        value4: '',//室內機械式車位
        value5: '',//機械塔車位
      },
      PL003: {//電梯意外責任附加條款
        value1: false,//是否簽訂檢查維護合約
        value2: '',//電扶梯
        value3: '',//客/貨梯
        value4: '',//汽車升降梯
        value5: '',//其他種類
      },
      PL007: {//各級學校暨幼兒園責任附加條款
        value1: '',//學員
        value2: '',//幼兒
      },
      PL005: {//建築物承租人火災附加條款
        value1: '',//每一意外事故
        value2: '',//處所數量
      },
      PL016: {//獨立承攬人責任附加條款
        value1: '',//承攬工程合約金額少於
      },
      PL022: {//裝卸搬運責任附加條款
        value1: '',//每一意外事故財損責任之保險金額
        value2: '',//保險期間內之最高賠償金額
      },
      PL023: {//慰問金費用附加條款
        value1: '1000',
        value2: '5000',
        value3: '10000',
        value4: '10000',
        value5: '50000',
        value6: '100000',
      },
      PL028: {//安養事業責任附加條款
        value1: '',
        value2: '',
      },
      PL040: {//受託物責任附加條款
        value1: '',
        value2: '',
      },
      PL041: {//接駁運送責任附加條款
        value1: '',
        value2: '',
      },
      PL043: {//保管箱責任附加條款
        value1: '',
        value2: '',
        value3: '',
      },
      PL047: {//放棄代位求償權附加條款
        value1: '',
      },
      PL049: {//承租人借用人責任附加條款(保額外加)
        value1: '',
      },
      PL053: {//傷害醫療及身故慰問金費用附加條款
        value1: '',
        value2: '',
        value3: '',
        value4: '',
      },
      PL055: {//營業中斷損失責任附加條款
        value1: '',
        value2: '',
      },
      PL058: {//液化石油氣及容器附加條款
        value1: '',
      }
    },
    questionnaire: {
      userId: '',
      sheet1: {
        part1: {
          name: '',//活動名稱
          joinPersonAmount: '',//參加活動人數
          ruleCapacity: '',//規定容留人數
          beginDateTime: {//活動開始時間
            year: '',
            month: '',
            day: '',
            hours: '0',
            minutes: '0',
          },
          activityDays: '',//活動天數
          hasActivityIndoor: false,//是否有室內活動
          indoorActivityContent: '',//室內活動內容
          hasActivityOutdoor: false,//是否有室外活動
          outdoorActivityContent: '',//室外活動內容
          activityTypeRemark: '',//活動類型備註
          isWaterArea: null,//是否為水域
          lifeguardDeploy: '',//救生員配置
          hasStage: null,//是否有舞台
          hasWaterPool: null,//是否有水池
        },
        part2: {
          hasUseOpenFire: null,//是否使用開火
          hasVolatileSolventOrDust: null,//是否有揮發性溶劑或粉塵
          hasMechineOrGasFilledDevice: null,//是否有機械式或充氣式遊樂設備
          hasHighVoltage: null,//是否使用高壓電設施(600v)
          hasBareWires: null,//是否有裸露電線或導體
          hasAutomaticPowerOff: null,//供電系統是否裝有自動斷電
          hasWireInTube: null,//所有電線是否裝在館內避免短路
        },
        part3: {
          useRoadHasAccessByTransportation: null,//使用道路者 是否經交通主管認許
          afterActivityHasAccessByTransportation: null,//未使用道路者 活動結束後散場動線是否經交通主管認許
          hasSegmentWithInsurancePlaceAndLane: null,//保險處所與車道有無有效區隔
        },
        part4: {
          hasActivityRoutePlan: null,//是否有活動路線規劃
          hasExit: null,//是否有出口
          hasEvacuationSign: null,//是否有疏散標示
          hasPersonnelControl: null,//是否有人員管制計畫
          hasEvacuationPlan: null,//是否有疏散計畫
          hasUrgentLight: null,//是否有緊急照明設備
          hasUrgentBroadcast: null,//是否有緊急廣播設備
          hasSafetyDoor: null,//是否有安全門
          hasEscapeTrunk: null,//是否有逃生梯
          hasSmokeExhaust: null,//是否有煙霧排出設備
          hasUrgentPower: null,//是否有緊急電源
          facility: [],//設施
        },
        part5: {
          hasFireHydrant: false,//是否有消防栓
          hydrantIndoorAmount: '',//消防栓室內數量
          hydrantOutdoorAmount: '',//消防栓室外數量
          fireExtinguisher: false,//是否有滅火器
          foam: {
            indoor: '',//室內消防藥水
            outdoor: '',//室外消防藥水
          },
          carbonDioxide: {
            indoor: '',//室內碳氣源
            outdoor: '',//室外碳氣源
          },
          abc: {
            indoor: '',//室內ABC源
            outdoor: '',//室外ABC源
          },
          halon: {
            indoor: '',//室內瓦斯源
            outdoor: '',//室外瓦斯源
          },
          hasOtherExtinguishing: false,//是否有其他滅火器
          otherExtinguishingRemark: '',//其他滅火器備註
          hasDeviceTestAndTraining: null,//活動處所消防安全措施是否有編組並實施消防設備性能測試與訓練
          hasErectFireDevice: null,//是否已架設消防設備
          hasNoSmokingControl: null,//是否有禁菸管制
          hasAlertSystem: null,//是否有監視或預警系統
          otherSafeMeasure: '',//其他安全措施備註
        },
        part6: {
          hasMedicalSiteAndPersons: null,//是否有醫療設施及人員
          hasProtectDevice: null,//是否有防災設備
          hasDisasterProtectPlan: null,//是否有災害防護計畫
          hasEmergencyManagementPlan: null,//是否有緊急管理計畫
        },
        part7: {
          hasLossHistoryBeforeFiveYear: null,//是否有五年內損失紀錄
          lostAmountFrequencyReason: '',//損失紀錄發生頻率及原因
          otherRemark: '',//其他備註
        },
      },
      sheet2: {
        part1: {
          isFloorSmooth: null,//地反是否平整
          isFloorSlippery: null,//地面是否濕滑
          isHighPlace: null,//是否高架處所
          isDesignByLegal: null,//臨時或永久設施是否依法規設計
          isDeviceMalfunction: null,//設備是否有故障
          isNotVentilationPlace: null,//是否非通風處所
        },
        part2: {
          hasUseOpenFire: null,//是否使用開火
          hasOrganicSolvents: null,//是否有有機溶劑
          hasDustEnviroment: null,//是否有粉塵環境
          hasChemicalReaction: null,//是否有化學反應
          hasDynamicDevice: null,//是否有動力設備
          hasPressureDevice: null,//是否有壓力設備
          hasSuspensionItem: null,//是否有懸掛物
          hasRadiationDevice: null,//是否有放射設備
          hasPoisonFood: null,//是否有毒品食物
          hasVolatileSolventOrDust: null,//是否有溶劑或粉塵
          hasLiquor: null,//是否有酒類
          hasAirOrDustPollution: null,//是否有空氣或粉塵汙染
          hasPoluutionSoil: null,//是否有污染土壤
          hasTrashEnviromentPollution: null,//是否有垃圾污染環境
          hasNoisePollution: null,//是否有噪音污染
        },
        part3: {
          hasSegmentWithInsurancePlaceAndLane: null,//保險處所與車道有無有效區隔
        },
        part4: {
          potentialOtherSafePlan: null,//潛在的風險防護與消防措施
        },
      },
    },
    insuranceAmountList: [//保險金額/自負額
      {
        amountType: {
          Text: '自行輸入保額',
          Value: '2',
        },
        perBodyAmount: '',
        perAccidentBodyAmount: '',
        perAccidentFinanceAmount: '',
        insuranceTotalAmount: '',
        mergeSingleAmount: '',
        selfInflictedAmount: {
          Text: '2,500元',
          Value: '2500',
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
          underwriteCoefficient: '0%',
        }
      }
    ],
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
        // Vue.set(state, 'Applicant', quotation().Applicant)
      }
    },
    UPDATED_INDUSTRY(state, data) {
      state.industry = data
    },
    UPDATED_INDUSTRY_TEXT(state, text) {
      state.industryText = text
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
    UPDATED_UUID(state, data) {
      state.uuid = data
    },
    UPDATED_INSURANCE_ACTIVE(state, data) {
      state.InsuranceActive = data
    },
    UPDATED_QUOTATION_DATA(state, data) {
      state.quotationData = data
    },
    UPDATED_POLICY_TRANSFER(state, data) {
      state.policyTransfer = data
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
      commit('UPDATED_QUESTIONNAIRE', quotation().activityQuestionnaire)
      commit('UPDATED_INSURANCE_AMOUNT_LIST', [//保險金額/自負額
        {
          amountType: {
            Text: '自行輸入保額',
            Value: '2',
          },
          perBodyAmount: '',
          perAccidentBodyAmount: '',
          perAccidentFinanceAmount: '',
          insuranceTotalAmount: '',
          mergeSingleAmount: '',
          selfInflictedAmount: {
            Text: '2,500元',
            Value: '2500',
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
            underwriteCoefficient: '0%',
          }
        }
      ])
      commit('UPDATED_ADDITION_TERMS', quotation().additionTerms)
      commit('UPDATED_QUESTIONNAIRE_FINISHED', false)
      commit('UPDATED_ACTIVITY_QUOTATION', {})
      commit('UPDATED_INTERNAL_CONTROL_DATA', quotation().internalControlData)
      commit('UPDATED_UUID', '')
      commit('UPDATED_INSURANCE_ACTIVE', 0)
      commit('UPDATED_QUOTATION_DATA', {})
      commit('UPDATED_POLICY_TRANSFER', quotation().policyTransfer)
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
    clearAdditionTerms({ commit }) {
      commit('UPDATED_ADDITION_TERMS', quotation().additionTerms)
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
    },
    updatedInsuranceActive({ commit }, type) {
      commit('UPDATED_INSURANCE_ACTIVE', type)
    },
    updatedQuotationData({ commit }, data) {
      commit('UPDATED_QUOTATION_DATA', data)
    },
    updatedPolicyTransfer({ commit }, data) {
      commit('UPDATED_POLICY_TRANSFER', data)
    }
  }
}