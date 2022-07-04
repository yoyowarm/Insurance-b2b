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

export const quotationStep2 = () => {
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
  }
}