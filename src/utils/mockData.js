export const IndustryList = () => {
  return [
    {
      category: '甲類',
      lists: [
        { Value: 1, Text: '公私企業辦公處所' },
        { Value: 2, Text: '金融保險辦公處所' },
        { Value: 3, Text: '住宅大樓管理單位' },
        { Value: 4, Text: '政府機關辦公處所' },
        { Value: 5, Text: '各種專門職業事務所' },
      ]
    },
    {
      category: '乙類',
      lists: [
        { Value: 6, Text: '行號店鋪' },
        { Value: 7, Text: '餐廳' },
        { Value: 8, Text: '飲食店' },
        { Value: 9, Text: '飲料店' },
        { Value: 10, Text: '小吃店' },
        { Value: 11, Text: '補習班' },
        { Value: 12, Text: '宿舍' },
        { Value: 13, Text: '民宿' },
        { Value: 14, Text: '藝文空間' },
        { Value: 15, Text: '集會堂(場)' },
        { Value: 16, Text: '展覽館' },
        { Value: 17, Text: 'K書中心' },
        { Value: 18, Text: '圖書館' },
        { Value: 19, Text: '心理輔導與家庭諮詢機構' },
        { Value: 20, Text: '冰果店' },
        { Value: 21, Text: '一般咖啡館' },
        { Value: 22, Text: '專櫃(設於百貨公司或賣場)' },
        { Value: 23, Text: '學校' },
        { Value: 24, Text: '公立學校' },
        { Value: 25, Text: '私立學校' },
        { Value: 26, Text: '學校教室' },
        { Value: 27, Text: '學校教學研究中心' },
        { Value: 28, Text: '學校教學研究中心' },
        { Value: 29, Text: '學校教學研究中心' },
        { Value: 30, Text: '學校教學研究中心' },
        { Value: 31, Text: '學校教學研究中心' },
        { Value: 32, Text: '學校教學研究中心' },
        { Value: 33, Text: '學校教學研究中心' },
        { Value: 34, Text: '學校教學研究中心' },
        { Value: 35, Text: '學校教學研究中心' },
        { Value: 36, Text: '學校教學研究中心' },
        { Value: 37, Text: '學校教學研究中心' },
        { Value: 38, Text: '學校教學研究中心' },
        { Value: 39, Text: '學校教學研究中心' },
        { Value: 40, Text: '學校教學研究中心' },
        { Value: 41, Text: '學校教學研究中心' },
      ]
    },
    {
      category: '丙類',
      lists: [
        { Value: 24, Text: '旅館' },
        { Value: 25, Text: '平面停車場' },
        { Value: 26, Text: '自助洗衣店' },
        { Value: 27, Text: '電影院' },
        { Value: 28, Text: '戲(劇)院' },
        { Value: 29, Text: '公園' },
        { Value: 30, Text: '診所' },
        { Value: 31, Text: '超級市場' },
        { Value: 32, Text: '醫院' },
        { Value: 33, Text: '零售市場' },
        { Value: 34, Text: '農產品批發市場' },
        { Value: 35, Text: '招待所' },
        { Value: 36, Text: '觀光旅館' }
      ]
    }
  ]
}

export const terms = () => {
  return [
    { Value: 1, Text: 't1食品中毒責任附加條款' },
    { Value: 2, Text: 't2停車場責任附加條款' },
    { Value: 3, Text: 't3各級學校暨幼兒園責任附加條款' },
    { Value: 4, Text: 't4電梯意外責任附加條款' },
    { Value: 5, Text: 't5廣告招牌附加條款A (含天災)' },
    { Value: 6, Text: 't6廣告招牌附加條款B (含天災)' },
    { Value: 7, Text: 't7公寓大廈管理委員會責任附加條款' },
    { Value: 8, Text: 't8公寓大廈管理委員會責任附加條款' },
    { Value: 9, Text: 't9慰問金費用附加條款' },
  ]
}
export const newsListTable = () => {
  return {
    head: [
      {
        text: '發布日期',
        value: 'time',
        size: '1-6'
      },
      {
        text: '消息標題',
        value: 'title',
        size: '2-6'
      },
      {
        text: '消息內文',
        value: 'content',
        size: '3-6'
      },

    ],
    rows: [
      {
        time: '2021.11.05',
        title: '消息標題消息標題消息標題消息標題消息標題消息標題',
        content: '消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內',
        id: '1'
      },
      {
        time: '2021.11.05',
        title: '消息標題消息標題消息標題消息標題消息標題消息標題',
        content: '消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內',
        id: '1'
      },
      {
        time: '2021.11.05',
        title: '消息標題消息標題消息標題消息標題消息標題消息標題',
        content: '消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內',
        id: '1'
      }, {
        time: '2021.11.05',
        title: '消息標題消息標題消息標題消息標題消息標題消息標題',
        content: '消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內文消息內',
        id: '1'
      }
    ]
  }
}

export const productListTable = () => {
  return {
    head: [
      {
        text: '發布日期',
        value: 'time',
        size: '1-6'
      },
      {
        text: '商品名稱',
        value: 'title',
        size: '5-6'
      },

    ],
    rows: [
      {
        time: '2021.11.05',
        title: '商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱',
        link: '/product/detail/1'
      },
      {
        time: '2021.11.05',
        title: '商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱',
        link: '/product/detail/1'
      },
      {
        time: '2021.11.05',
        title: '商品名稱商品名稱商品名稱商品名稱商品名稱商品名稱',
        link: '/product/detail/1'
      }
    ]
  }
}

export const quotationListTable = () => {
  return {
    head: [
      {
        text: '序號',
        value: 'serialNo',
        size: '1-6'
      },
      {
        text: '要保人',
        value: 'applicantName',
        size: '2-6'
      },
      {
        text: '被保人',
        value: 'insuredName',
        size: '2-6'
      },
      {
        text: '保費',
        value: 'insuranceAmount',
        size: '2-6'
      },
      {
        text: '狀態',
        value: 'stateText',
        size: '2-6'
      },
      {
        text: '報價單操作',
        value: 'edit',
        size: '3-6'
      },
      {
        text: '出單保費',
        value: 'InsurancePremiums',
        size: '2-6'
      },
      {
        text: '日結日期',
        value: 'daySettleDate',
        size: '3-6'
      },
      {
        text: '保險期間',
        value: 'ConvergeStartDate',
        size: '4-6'
      },
      {
        text: '報價日期',
        value: 'quotationDate',
        size: '2-6'
      },
      {
        text: '經手人',
        value: 'iOfficerName',
        size: '2-6'
      },
      {
        text: '總分公司單位',
        value: 'companyDepartment',
        size: '2-6'
      },
      {
        text: '類型',
        value: 'typeText',
        size: '1-6'
      },
    ],
    rows: []
  }
}

export const planDetail = () => {
  return {
    list: [
      {
        keyName: '每一個人體傷責任',
        value: '200萬',
        unit: true,
        unitClass: 'text-red-600 ml-0'
      },
      {
        keyName: '每一意外事故體傷責任',
        value: '1,000萬',
        unit: true,
        unitClass: 'text-red-600 ml-0'
      },
      {
        keyName: '每一意外事故財物損失責任',
        value: '200萬',
        unit: true,
        unitClass: 'text-red-600 ml-0'
      },
      {
        keyName: '本保險契約之最高賠償金額',
        value: '2,400萬',
        unit: true,
        unitClass: 'text-red-600 ml-0'
      },
      {
        keyName: '每一事故自負額',
        value: '2,500',
        unit: true,
        unitClass: 'text-red-600 ml-0'
      }
    ],
    total: {
      keyName: '現金保險保費(乘於人數)共計',
      value: 'NT$ --',
      unit: true,
    }
  }
}

export const TermsLists = () => {
  return [
    {
      "TermID": "PL001",
      "TermName": "t1食品中毒責任附加條款",
      "TermContent": "食品中毒責任附加條款",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL002",
      "TermName": "t2停車場責任附加條款",
      "TermContent": "停車場責任附加條款",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL003",
      "TermName": "t3電梯意外責任附加條款",
      "TermContent": "電梯意外責任附加條款",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL004",
      "TermName": "t4游泳池責任附加條款",
      "TermContent": "附加條款文號:中華民國97年3月5日泰安(97)精企字第129號函備查                                                                        \n 附加條款內容:第一條    不保事項                                                                                         \n\t        茲經雙方約定，本公司對於直接或間接因任何恐怖主義之行為或與其有關之行動所致任                                                      \n\t何損失、身體傷亡、或所生費用支出或賠償責任，不負賠償之責，不論此等損失是否同時或                                                            \n\t先後與其他原因或事件有關聯。                                                                                      \n\t第二條    用詞定義                                                                                         \n\t        本附加條款所謂恐怖主義 (Terrorism) 之行為係指任何個人或團體，不論單獨或與任何組                                              \n\t織、團體或政府機構共謀，運用武力、暴力、恐嚇、威脅或破壞等行為以遂其政治、宗教、                                                            \n\t信仰、意識型態或其他類似意圖之目的，包括企圖推翻、脅迫或影響任何政府，或致使民眾                                                            \n\t或特定群眾處於恐懼狀態。                                                                                        \n\t第三條    附帶損失除外不保                                                                                     \n\t        本公司對於直接或間接為抑制、防止、鎮壓恐怖主義或與其有關之行動所致之任何損失                                                      \n\t、身體傷亡、或費用支出或賠償責任亦不負賠償之責。                                                                            \n\t第四條    舉證責任                                                                                         \n\t        本公司依本附加條款約定，主張任何損失、身體傷亡、費用支出或賠償責任不在賠償之                                                      \n\t範圍時，被保險人對主張該等損失屬本公司之賠償責任時，應負舉證責任。                                                                   \n\t第五條    條款之適用                                                                                        \n\t        本附加條款如與主保險契約條款牴觸時，悉依本附加條款為準。其他未規定事項，仍適                                                      \n\t用主保險契約條款之規定。                                                                                        \n\t第一條    不保事項                                                                                         \n\t        茲經雙方約定，本公司對於直接或間接因任何恐怖主義之行為或與其有關之行動所致任                                                      \n\t何損失、身體傷亡、或所生費用支出或賠償責任，不負賠償之責，不論此等損失是否同時或                                                            \n\t先後與其他原因或事件有關聯。                                                                                      \n\t第二條    用詞定義                                                                                         \n\t        本附加條款所謂恐怖主義 (Terrorism) 之行為係指任何個人或團體，不論單獨或與任何組                                              \n\t織、團體或政府機構共謀，運用武力、暴力、恐嚇、威脅或破壞等行為以遂其政治、宗教、                                                            \n\t信仰、意識型態或其他類似意圖之目的，包括企圖推翻、脅迫或影響任何政府，或致使民眾                                                            \n\t或特定群眾處於恐懼狀態。                                                                                        \n\t第三條    附帶損失除外不保                                                                                     \n\t        本公司對於直接或間接為抑制、防止、鎮壓恐怖主義或與其有關之行動所致之任何損失                                                      \n\t、身體傷亡、或費用支出或賠償責任亦不負賠償之責。                                                                            \n\t第四條    舉證責任                                                                                         \n\t        本公司依本附加條款約定，主張任何損失、身體傷亡、費用支出或賠償責任不在賠償之                                                      \n\t範圍時，被保險人對主張該等損失屬本公司之賠償責任時，應負舉證責任。                                                                   \n\t第五條    條款之適用                                                                                        \n\t        本附加條款如與主保險契約條款牴觸時，悉依本附加條款為準。其他未規定事項，仍適                                                      \n\t用主保險契約條款之規定。                                                                                        ",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL005",
      "TermName": "t5廣告招牌附加條款A (含天災)",
      "TermContent": "附加條款文號:96年10月31日(96)產火字第048號函備查(公會版商品)                                                                     \n 附加條款內容:        茲經雙方同意，本保險契約所承保之保險標的物於建造、安裝、拆卸、分解、改裝、試                                                      \n\t車或測試(含機械性能測試)期間，其本身所遭受之毀損或滅失，及其引起之附帶損失，本公                                                           \n\t司不負賠償責任。                                                                                            \n\t        本保險契約同意承保之財產需完成並符合下列之程序:                                                                    \n\t        一、機械性測試。                                                                                    \n\t        二、熱試車。                                                                                      \n\t        三、符合契約載明設計標準之性能測試，連續測試至少72小時且全廠維持於穩定及可控                                                     \n\t                制之狀態。                                                                               \n\t        四、被保險人正式點交完畢（含書面文件或記錄等），且無任何權利保留或放棄保證事                                                      \n\t                項。                                                                                  \n\t        上述事項不含正常之維修保養作業。                                                                            \n\t        茲經雙方同意，本保險契約所承保之保險標的物於建造、安裝、拆卸、分解、改裝、試                                                      \n\t車或測試(含機械性能測試)期間，其本身所遭受之毀損或滅失，及其引起之附帶損失，本公                                                           \n\t司不負賠償責任。                                                                                            \n\t        本保險契約同意承保之財產需完成並符合下列之程序:                                                                    \n\t        一、機械性測試。                                                                                    \n\t        二、熱試車。                                                                                      \n\t        三、符合契約載明設計標準之性能測試，連續測試至少72小時且全廠維持於穩定及可控                                                     \n\t                制之狀態。                                                                               \n\t        四、被保險人正式點交完畢（含書面文件或記錄等），且無任何權利保留或放棄保證事                                                      \n\t                項。                                                                                  \n\t        上述事項不含正常之維修保養作業。                                                                            ",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL006",
      "TermName": "t6公共意外責任保險汽車修理廠責任附加條款",
      "TermContent": "公共意外責任保險汽車修理廠責任附加條款",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL007",
      "TermName": "t7各級學校暨幼兒園責任附加條款",
      "TermContent": "各級學校暨幼兒園責任附加條款",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL008",
      "TermName": "t8意外污染責任附加條款",
      "TermContent": "意外污染責任附加條款",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },
    {
      "TermID": "PL009",
      "TermName": "t9廣告招牌附加條款A(含天災)",
      "TermContent": "廣告招牌附加條款A(含天災)",
      "IsRequired": false,
      "IsAnyAdditionNeeded": false,
      "IsDisplayAbleInFront": true
    },

  ]
}

export const historyList = () => {
  return {
    head: [
      {
        text: '日期',
        value: 'time',
        size: '1-6'
      },
      {
        text: '單位/身分',
        value: 'identity',
        size: '2-6'
      },
      {
        text: '操作',
        value: 'operate',
        size: '3-6'
      },

    ],
    rows: [
      {
        time: '2021.11.05',
        identity: '台北總公司 核保部 / 協理 林國強',
        operate: ['核保'],
        id: '1'
      },
      {
        time: '2021.11.05',
        identity: '岡山服務中心 公共責任險部 / 專員 陳志華',
        operate: ['修改 投保資料 保險結束時間：111年04月15日12時 改為 111年04月16日12時', '修改 投保資料 場次1 每日人數：500人 改為 1000人', '修改 投保資料 場次2 每日人數：1000人 改為 500人'],
        id: '2'
      },
      {
        time: '2021.11.05',
        identity: '台北總公司 核保部 / 協理 林國強',
        operate: ['核保'],
        id: '3'
      },
      {
        time: '2021.11.05',
        identity: '岡山服務中心 公共責任險部 / 專員 陳志華',
        operate: ['修改 投保資料 保險結束時間：111年04月15日12時 改為 111年04月16日12時', '修改 投保資料 場次1 每日人數：500人 改為 1000人', '修改 投保資料 場次2 每日人數：1000人 改為 500人'],
        id: '4'
      },
    ]
  }
}

export const membersListTable = () => {
  return {
    head: [
      {
        text: '編號',
        value: 'employeeId',
        size: '2-6'
      },
      {
        text: '名稱',
        value: 'employeeName',
        size: '2-6'
      },
      {
        text: '權限群組',
        value: 'groupName',
        size: '3-6'
      },
      {
        text: '狀態',
        value: 'employeeStatus',
        size: '1-6'
      },
      {
        text: 'E-mail',
        value: 'email',
        size: '5-6'
      },
      {
        text: '操作',
        value: 'operate',
        size: '4-6'
      },
    ],
    rows: []
  }
}

export const groupListTable = () => {
  return {
    head: [
      {
        text: '群組名稱',
        value: 'groupName',
        size: '2-6'
      },
      {
        text: '權限列表',
        value: 'permissions',
        size: '6-6'
      },
      {
        text: '操作',
        value: 'operate',
        size: '3-6'
      },
    ],
    rows: [
    ]
  }
}

export const categoryListTable = () => {
  return {
    head: [
      {
        text: '權重值',
        value: 'weight',
        size: '1-6'
      },
      {
        text: '類別',
        value: 'typeName',
        size: '1-6'
      },
      {
        text: '場所名稱',
        value: 'itemName',
        size: '6-6'
      },
      {
        text: '應另行報價',
        value: 'hasQuotation',
        size: '1-6'
      },
      {
        text: '隱藏/顯示',
        value: 'isEnable',
        size: '1-6'
      },
      {
        text: '操作',
        value: 'operate',
        size: '1-6'
      }
    ],
    rows: [

    ]
  }
}

export const minimumAmountTable = () => {
  return {
    head: [
      {
        text: '主管機關',
        value: 'countyName',
        size: '2-6'
      },
      {
        text: '每一個人體傷責任金額',
        value: 'perBodyAmount',
        size: '5-6'
      },
      {
        text: '每一意外事故體傷責任金額',
        value: 'perAccidentBodyAmount',
        size: '5-6'
      },
      {
        text: '每一意外事故財物損失責任金額',
        value: 'perAccidentFinanceAmount',
        size: '5-6'
      },
      {
        text: '本保險契約之最高賠償金額',
        value: 'insuranceTotalAmount',
        size: '5-6'
      },
      {
        text: '',
        value: 'operate',
        size: '2-6'
      },
    ],
    rows: [
    ]
  }
}

export const termsListTable = () => {
  return {
    head: [
      {
        text: '條款名稱',
        value: 'additionTermName',
        size: '6-6'
      },
      {
        text: '建議條款',
        value: 'isSuggest',
        size: '1-6'
      },
    ],
    rows: [
    ]
  }
}

export const weightListTable = () => {
  return {
    head: [
      {
        text: '條款權重值',
        value: 'weight',
        size: '1-6'
      },
      {
        text: '條款名稱',
        value: 'additionTermName',
        size: '6-6'
      },
      {
        text: '另行報價',
        value: 'hasQuotation',
        size: '1-6'
      },
      {
        text: '操作',
        value: 'operate',
        size: '1-6'
      }
    ],
    rows: [

    ]
  }
}

export const amountListTable = () => {
  return {
    head: [
      {
        text: '條款名稱',
        value: 'name',
        size: '4-6'
      },
      {
        text: '內容',
        value: 'content',
        size: '6-6'
      },
      {
        text: '操作',
        value: 'operate',
        size: '1-6'
      },

    ],
    rows: [
      {
        name: 'PL005建築物承租人火災附加條款',
        content: ['額度超過 1 須另行報價'],
        id: '1',
        operate: ''
      },
      {
        name: 'PL023慰問金費用附加條款',
        content: ['住院慰問金費用保險金額：', '每一個人 2 、每一意外事故 3 、保險期間內最高賠償金額 4 ', '奠儀慰問金費用保險金額：',
          '每一個人 5 元、每一意外事故 6 、保險期間內最高賠償金額 7 '],
        id: '2',
        operate: ''
      },
      {
        name: 'PL040受託物附加條款',
        identity: '台北總公司 核保部 / 協理 林國強',
        content: ['每一意外事故財損責任之保險金額 8 ', '保險期間內之最高賠償金額 9 '],
        id: '3',
        operate: ''
      },
      {
        name: 'PL049承租人借用人責任附加條款(保額外加)',
        content: ['額度 10 '],
        id: '4',
        operate: ''
      },
      {
        name: 'PL053慰問金費用附加條款',
        content: ['每一個人傷害醫療慰問金費用保險金額： 11 ', '每一個人身故慰問金費用保險金額： 12 ', '每一個人事故慰問金費用保險金額： 13 ', '保險期間內慰問金費用最高賠償金額： 14 '],
        id: '5',
        operate: ''
      },
    ]
  }
}