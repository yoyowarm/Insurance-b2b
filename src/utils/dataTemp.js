export const quotationStep1 = () => {
  return {
    info: {
      IsRenewal: false,
      InsuranceNumber: '',
      startDate: {
        year: '',
        month: '',
        day: ''
      },
      endDate: {
        year: '',
        month: '',
        day: ''
      },
      IsMortgageNeeded: false,
      bank: {
        placeholder: '選擇銀行',
        id: ''
      },
      branch: {
        placeholder: '選擇分行',
        id: ''
      },
      IOfficer: '',
      IBroker: {
        placeholder: '營業員獎金',
        id: '8A'
      },
      IChannel: {
        placeholder: '選擇統計代碼',
        id: ''
      },
      LoginCode: '',
    },
    target: {
      city: {
        placeholder: '選擇縣市',
        id: '',
      },
      area: {
        placeholder: '選擇區域',
        id: '',
      },
      address: '',
      Square: '',
      structure: {
        placeholder: '選擇構造',
        id: '',
      },
      roof: {
        placeholder: '選擇屋頂',
        id: '',
      },
      TotalFloor: '',
      HasFactoryOrStoreInBuilding: false,
      SpectificFloor: '',
    },
    SchemeSetting: {
      Usage: {
        placeholder: '選擇使用性質',
        id: '',
      },
      UsageDetail: '',
      target1: {
        placeholder: '其他',
        id: '',
        amount: ''
      },
      target2: {
        placeholder: '其他',
        id: '',
        amount: ''
      },
      target3: {
        placeholder: '其他',
        id: '',
        amount: ''
      },
      target4: {
        placeholder: '其他',
        id: '',
        amount: ''
      },
      target5: {
        placeholder: '其他',
        id: '',
        amount: ''
      },
      IsLossProgramChosen: false,
      LossProgram: {
        placeholder: '選擇方案內容',
        id: '',
      },
      InsuranceChargetAmount: ''
    },
    selectedProgram: {
      Text: '選擇方案',
      Value: '',
    },
    AdditionInsurance: {},
    AdditionalTerms: {},
    LiabilityInsurance: {},
    selectedCommission: {
      Text: '選擇佣金%數',
      Value: '',
    },
    InsurdChargeTotal: 0,
    step1Model: {}
  }
}

export const quotation = () => {
  return {
    InsuranceActive: 0,
    renewal: {
      IsRenewal: false,
      InsuranceNumber: '',
    },
    InsuranceRecord: {
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
      subAddress: '',
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
      subAddress: '',
      Mobile: '',
      IsForeignRegister: false,
      RegisterNationality: '',
      Profession: false,
      IsPolitician: false,
      overseasOrDomestic: false,
      IsProOrNot: false,
    },
    SerailNo: '',
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
        createTime: {
          year: '',
          month: '',
          day: '',
        },
        staffAmount: '',
        businessStartDate: {
          hours: '',
          minutes: '',
          AmPm: '',
        },
        businessEndDate: {
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
        hasAntiSlip: false,//樓梯是否有止滑條
        hasSwimmingPool: false,//是否有游泳池
        lifeguardAmount: '',//救生員人數
        material: '',//地板為何種材質
        hasCarpet: false,//是否鋪設地談,
        hasMechineParkingDevice: false,//是否有機車停車場
        mechineParkingDeviceCategory: '',//機車停車場類別
      },
      part3: {
        selfOperated: false,//內部設施是否全數自行經營
        NotSelfOperated: '',//填寫非自行經營之項目
        hasBalcony: false,//是否有陽台
        canAccessBalcony: false,//人員可否進入陽台
        hasCarpetsCurtains: false,//是否有地毯、窗簾
        hasFireproofMaterial: false,//地毯、窗簾是否為防火材質
        hasCompartment: false,//是否有客房隔間
        hasCompartmentFireproofMaterial: false,//客房隔間是否為防火材質
        facility: [],//如有下列設施，請勾選
        hasPusher: false,//是否使用推高機
        hasSpacialShow: false,//是否有特殊表演項目
        hasFireOrDust: false,//涉及用火或粉塵表演
        isProfessional: false,//表演者是否為專業人士
        hasDangerousItem: false,//使用、存放煙火爆竹或化學品等危險物品
        hasBoiler: false,//使用鍋爐
      },
      part4: {
        hasCentralControl: false,//是否設有中控中心以監控公用設備
        hasHighVoltage: false,//是否使用高壓電設施(600V以上)
        hasBareWires: false,//是否有裸露電線或導體
        hasAutomaticPowerOff: false,//供電系統是否裝有自動斷電設備
        hasWireInTube: false,//所有電線是否裝在管內(含踏板)以避免短路
      },
      part5: {
        useRoadHasAccessByTransportation: false,//使用道路者，對附近交通之衝擊是否經交通主管機關認許
        afterActivityHasAccessByTransportation: false,//未使用道路者，對附近交通之衝擊、停車事宜、行人及活動結束後之散場動線是否經交通主管機關認許
        hasSegmentWithInsurancePlaceAndLane: false,//保險處所與車道有無有效區隔(含車道與人員動線安排)
      },
      part6: {
        hasExit: false,//是否有出口規劃
        hasEvacuationSign: false,//是否有疏散標示
        hasPersonnelControl: false,//是否有人員管制計畫
        hasEvacuationPlan: false,//是否有疏散計畫(包含疏散路線、疏散指示、安全距離及避難場所)
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
        hasSprinkler: false,//是否有自動灑水系統
        hasGasExtinguishing: false,//是否有氣體滅火系統
        gasExtinguishingInstall: '',//氣體滅火系統安裝於何處
        hasFoamExtinguishing: false,//是否有泡沫滅火系統
        foamExtinguishingInstall: '',//泡沫滅火系統安裝於何處
        hasWaterMistExtinguishing: false,//是否有水霧滅火系統
        waterMistExtinguishingInstall: '',//水霧滅火系統安裝於何處
        hasOtherExtinguishing: false,//是否有其他滅火系統
        otherExtinguishingRemark: '',//其他滅火系統備註
        HasEquipmentTestAndTrain: false,//是否有設備測試及訓練,
        hasNoSmokingControl: false,//是否有禁菸管制
        hasAlertSystem: false,//是否有監視或預警系統
        hasSwitchboardNormalState: false,//是否受信總機正常使用並有專人看守
        hasCleaner: false,//是否有清潔工
        hasClutterAtAisle: false,//是否有滋潤品放置於走廊
      },
      part8: {
        hasMedicalSiteAndPersons: false,//是否設置醫療站並配置醫護人員
        hasProtectDevice: false,//是否有防護或緊急設備
        hasDisasterProtectPlan: false,//是否有災害防護計畫
        hasEmergencyManagementPlan: false,//是否有緊急應變計畫(包含應變人員編組和指定職責，如關鍵設備留守人員、警戒人員、醫療救護編組、消防編組等)
      },
      part9: {
        hasLossHistoryBeforeFiveYear: false,//被保險人過去五年是否有損失紀錄
        lostAmountFrequencyReason: ''//填寫損失金額、次數、原因
      },
    },
    insuranceAmountList: [
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
        }
      }
    ],
    internalControlData: {//內部管制資料
      issuerNumber: '',//經手人代號
      businessSourceCode: {//業務來源代號
        Text: '個人',
        Value: 'F1'
      },
      statisticsCode: '',//統計代號,
      loginIdNumber: '',//登入證字號
    },
    insuranceAmounts: '', //保險金額
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
      PL009: {//廣告招牌附加條款A (含天災)
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
  }
}