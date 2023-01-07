import { quotation } from '@/utils/dataTemp'
import {
  GetPlaceQuestionnaireCoefficient,
  GetActivityQuestionnaireCoefficient,
  GetPlaceQuestionnaireWithoutOrder,
  GetActivityQuestionnaireWithoutOrder,
  AddPlaceQuestionnaireWithoutOrder,
  AddActivityQuestionnaireWithoutOrder,
  UpdatePlaceQuestionnaireWithoutOrder,
  UpdateActivityQuestionnaireWithoutOrder,
  GetQusetionnaireList
} from '@/api/Questionnaire'
export default {
  namespaced: true,
  state: {
    placeQuestionnaire: {//詢問表
      userId: '',
      insuredName: '',
      insuredId: '',
      title: '',
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
        dailyAveragePersons: '',//平均出入人數(人/天)
        singleDayHighestPersons: '',//最高出入人數(人/天)
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
        nearbyBuildingNature: {//鄰近建物性質
          Text: '選擇性質',
          Value: '',
        },
        securityCheck: {//公共安全檢查(經當地主管建築機關查核)
          Text: '公共安全檢查',
          Value: '',
        },
        room: {//營業性質之數量 如係屬飯店、旅館者，請說明其房間數目
          selected: false,
          value: '',
        },
        seat: {//營業性質之數量 屬戲院、音樂廳者，請說明其座位數目
          selected: false,
          value: '',
        },
        floors: '',//地上樓層數
        underground: '',//地下樓層數
        useFloors: '',//使用樓層數
        hasAntiSlip: null,//樓梯是否有止滑條
        hasSwimmingPool: null,//營業處所是否有游泳池
        lifeguardAmount: '',//救生員人數
        material: '',//地板為何種材質
        hasCarpet: null,//是否鋪設地毯,
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
        isProfessional: null,//表演者為專業或業餘
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
        hasEquipmentTestAndTrain: null,//是否有設備測試及訓練,
        hasNoSmokingControl: null,//是否有禁菸管制
        hasAlertSystem: null,//是否有監視或預警系統
        hasSwitchboardNormalState: null,//是否受信總機正常使用並有專人看守
        hasCleaner: null,//是否有清潔工
        hasClutterAtAisle: null,//是否有滋潤品放置於走廊
      },
      part8: {
        hasMedicalSiteAndPersons: null,//是否設置醫療站並配置醫護人員
        hasProtectDevice: null,//是否有防護或緊急設備
        hasEmergencyManagementPlan: null,//是否有緊急應變計畫(包含應變人員編組和指定職責，如關鍵設備留守人員、警戒人員、醫療救護編組、消防編組等)
      },
      part9: {
        hasLossHistoryBeforeFiveYear: null,//被保險人過去五年是否有損失紀錄
        lostAmountFrequencyReason: ''//填寫損失金額、次數、原因
      },
    },
    activityQuestionnaire: {
      userId: '',
      insuredName: '',
      insuredId: '',
      title: '',
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
  },
  getters: {},
  mutations: {
    updatedActivityQuestionnaire(state, payload) {
      state.activityQuestionnaire = payload;
    },
    updatedPlaceQuestionnaire(state, payload) {
      state.placeQuestionnaire = payload;
    }
  },
  actions: {
    async GetPlaceQuestionnaireCoefficient(_, data) {
      return await GetPlaceQuestionnaireCoefficient(data)
    },
    async GetActivityQuestionnaireCoefficient(_, data) {
      return await GetActivityQuestionnaireCoefficient(data)
    },
    async GetPlaceQuestionnaireWithoutOrder(_, questionnarieNo) {
      return await GetPlaceQuestionnaireWithoutOrder(questionnarieNo)
    },
    async GetActivityQuestionnaireWithoutOrder(_, questionnarieNo) {
      return await GetActivityQuestionnaireWithoutOrder(questionnarieNo)
    },
    async AddPlaceQuestionnaireWithoutOrder(_, data) {
      return await AddPlaceQuestionnaireWithoutOrder(data)
    },
    async AddActivityQuestionnaireWithoutOrder(_, data) {
      return await AddActivityQuestionnaireWithoutOrder(data)
    },
    async UpdatePlaceQuestionnaireWithoutOrder(_, data) {
      return await UpdatePlaceQuestionnaireWithoutOrder(data)
    },
    async UpdateActivityQuestionnaireWithoutOrder(_, data) {
      return await UpdateActivityQuestionnaireWithoutOrder(data)
    },
    async GetQusetionnaireList(_, Parameters) {
      return await GetQusetionnaireList(Parameters)
    },
    updatedActivityQuestionnaire({ commit }, data) {
      commit('updatedActivityQuestionnaire', data)
    },
    updatedPlaceQuestionnaire({ commit }, data) {
      commit('updatedPlaceQuestionnaire', data)
    },
    clearActivityQuestionnaire({ commit }) {
      commit('updatedActivityQuestionnaire', quotation().activityQuestionnaire)
    },
    clearPlaceQuestionnaire({ commit }) {
      commit('updatedPlaceQuestionnaire', quotation().questionnaire)
    }
  }
}