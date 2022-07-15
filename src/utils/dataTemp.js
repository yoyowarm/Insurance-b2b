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
        placeholder: '個人',
        id: 'F1'
      },
      statisticsCode: {//統計代號
        placeholder: '選擇統計代碼',
        id: ''
      },
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