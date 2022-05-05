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
        text: '報價日期',
        value: 'time',
        size: '2-6'
      },
      {
        text: '狀態',
        value: 'State',
        size: '2-6'
      },
      {
        text: '報價單編號',
        value: 'numbers',
        size: '3-6'
      },
      {
        text: '保單編號',
        value: 'InsuranceNumbers',
        size: '3-6'
      },
      {
        text: '類型',
        value: 'type',
        size: '1-6'
      },
      {
        text: '要保人',
        value: 'guarantor',
        size: '1-6'
      },
      {
        text: '報價單操作',
        value: 'edit',
        size: '2-6'
      },
    ],
    rows: [
      {
        time: '2021.11.05',
        State: '未核保',
        numbers: '0000000001',
        InsuranceNumbers: '0000000001',
        guarantor: '王曉明',
        type: '活動',
        class: 'text-fail',
      },
      {
        time: '2021.11.05',
        State: '已核保',
        numbers: '0000000001',
        InsuranceNumbers: '0000000001',
        guarantor: '王曉明',
        type: '活動',
        class: 'text-success',
      },
      {
        time: '2021.11.05',
        State: '15天後保單生效',
        numbers: '0000000001',
        InsuranceNumbers: '0000000001',
        guarantor: '王曉明',
        type: '場所',
        class: 'text-warn',
      },
    ]
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