import { Popup } from '@/utils/popups/index'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      addOperationFee: {},
      requestFile: [],
      verifyResult: []
    }
  },
  computed: {
    ...mapState({
      'info': state => state.quotationStep1.info,
      'target': state => state.quotationStep1.target,
      'SchemeSetting': state => state.quotationStep1.SchemeSetting,
      'selectedProgram': state => state.quotationStep1.selectedProgram,
      'selectedCommission': state => state.quotationStep1.selectedCommission,
      'AdditionInsurance': state => state.quotationStep1.AdditionInsurance,
      'AdditionalTerms': state => state.quotationStep1.AdditionalTerms,
      'LiabilityInsurance': state => state.quotationStep1.LiabilityInsurance,
    })
  },
  watch: {
    requestFile: function (val) {
      let htmlText = ''
      val.map(item => {
        htmlText += `<p>${item}</p>`
      })
      if (val.length > 0) {
        Popup.create({
          hasHtml: true,
          htmlText: htmlText,
        })
      }
    }
  },
  methods: {
    async mixinVerify() {
      //選擇的方案是否需要營業加費
      const addOperationFee = await this.$store.dispatch('verify/addOperationFee', this.selectedProgram.Value)
      this.addOperationFee = addOperationFee
    },
    async verifyDate() {
      //保期檢核起保日不可大於60天或小於今天
      const month = Number(this.info.startDate.month) > 9 ? this.info.startDate.month : `0${this.info.startDate.month}`
      const day = Number(this.info.startDate.day) > 9 ? this.info.startDate.day : `0${this.info.startDate.day}`
      const date = `${this.info.startDate.year}/${month}/${day}`
      const allowStartDate = await this.$store.dispatch('verify/allowStartDate', date)
      if (!allowStartDate.data.IsSuccess) {
        this.verifyResult.push(allowStartDate.data)
      }
    },
    async verifyTargetAmount() {
      await this.SchemeSettingSelect.targetList.map(async (item, index) => {
        if (item.HasCustomizedInput && this.SchemeSetting[`target${index + 1}`].amount) {
          const subjectTotalAllow = await this.$store.dispatch('verify/subjectTotalAllow', {
            Amount: this.SchemeSetting[`target${index + 1}`].amount,
            ProgramID: this.selectedProgram.Value,
            SubID: item.SubID
          })
          if (!subjectTotalAllow.data.IsSuccess) {
            this.verifyResult.push(subjectTotalAllow.data)
          }
        }
      })
    },
    async verifyLiabilityMinAndMAX() {
      Object.keys(this.LiabilityInsurance).map(async item => {
        if (this.LiabilityInsurance[item].choose) {
          const liabilityMinAndMAX = await this.$store.dispatch('verify/liablityInsuredMinAndMAXOK', { InsuredNumber: this.LiabilityInsurance[item].insuredNumber, LiabilityID: this.LiabilityInsurance[item].LiabilityID, ProgramID: this.selectedProgram.Value })
          if (!liabilityMinAndMAX.data.IsSuccess) {
            this.verifyResult.push(liabilityMinAndMAX.data)
          }
        }
      })
    },
    async verifyIOfficerIChannelIBroker() {
      let Input = 0
      const IOfficer = this.info.IOfficer
      const IChannel = this.info.IChannel.id
      const IBroker = this.info.IBroker.id
      const LoginCode = this.info.LoginCode
      if (IOfficer) Input++
      if (IChannel) Input++
      if (IBroker) Input++
      if (LoginCode) Input++
      const IOfficerIChannelIBroker = await this.$store.dispatch('verify/OfficerIChanneIBrokerOK', { Input, IOfficer, IChannel, IBroker, LoginCode })
      if (!IOfficerIChannelIBroker.data.IsSuccess) {
        this.verifyResult.push(IOfficerIChannelIBroker.data)
      }
    },
    verifyResultPopup: function () {
      let htmlText = ''
      this.verifyResult.map(item => {
        if (!item.IsSuccess) {
          htmlText += `<p>${item.Message}</p>`
        } else {
          this.verifyResult.pop()
        }

      })
      if (this.verifyResult.length > 0) {
        Popup.create({
          hasHtml: true,
          htmlText: htmlText,
        })
      }
    },
    verifyRequired(type, calculate) {
      this.requestFile = []
      if (!this.industry.Value) {
        this.requestFile.push('未選擇投保行業')
      }
      if (this.industry.Value == 106 && !this.industryText) {
        this.requestFile.push('未輸入其他行業')
      }
      if (type == 'place') {
        if (this.renewal.IsRenewal && !this.renewal.InsuranceNumber) {
          this.requestFile.push('未輸入續保號碼')
        }
        // const startTime = new Date(`${Number(this.period.startDate.year) + 1911}/${this.period.startDate.month}/${this.period.startDate.day} ${this.period.startDate.hour}:00:00`).getTime()
        // const endTime = new Date(`${Number(this.period.endDate.year) + 1911}/${this.period.endDate.month}/${this.period.endDate.day} ${this.period.endDate.hour}:00:00`).getTime()
        // if (((endTime - startTime) / 1000 / 60 / 60 / 24) > 365) {
        //   this.requestFile.push('保期不能超過一年')
        // }
        this.placeInfo.map((item, index) => {
          if (!item.city || item.city.Text == '選擇縣市') {
            if (this.requestFile.includes(`處所${index + 1}未選擇縣市`)) return
            this.requestFile.push(`處所${index + 1}未選擇縣市`)
          }
          if (item.squareFeet == 0 || isNaN(item.squareFeet.toString().replace(/,/g, ''))) {
            if (this.requestFile.includes(`處所${index + 1}未輸入處所坪數`)) return
            this.requestFile.push(`處所${index + 1}未輸入處所坪數`)
          }
        })


        if (this.InsuranceActive !== 7 && ['丙類', '丁類', '戊類', '己類'].includes(this.industry.typeName)) {
          if (this.industry.typeName == '丙類' && this.placeInfo.some(i => Number(i.squareFeet) >= 100) && !this.questionnaireFinished) {
            this.requestFile.push('必填詢問表')
          } else if (this.industry.typeName != '丙類' && !this.questionnaireFinished) {
            this.requestFile.push('必填詢問表')
          }
        }
        if (this.InsuranceActive !== 7 && this.industry.Value && (this.industry.itemName.includes('類處所') || this.industry.itemName == '其他(混合類別)') && !this.questionnaireFinished) {
          this.requestFile.push('必填詢問表')
        }
        if (Object.keys(this.period.startDate).some(key => isNaN(this.period.startDate[key])) || Object.keys(this.period.endDate).some(key => isNaN(this.period.endDate[key]))) {
          this.requestFile.push('保期起迄日不可為空')
        }
        if (new Date().getTime() > new Date(`${Number(this.period.startDate.year) + 1911}/${this.period.startDate.month}/${this.period.startDate.day} ${this.period.startDate.hour}:00`).getTime()) {
          this.requestFile.push('保期起日不可小於今天')
        }
      }
      if (type == 'activity') {
        if (!this.period.endDate.year || !this.period.endDate.month || !this.period.endDate.day || isNaN(this.period.endDate.hour)) {
          this.requestFile.push('未選擇結束日')
        }
        this.activityInfo.map((item, index) => {
          if (!item.number) {
            if (this.requestFile.includes(`活動${index + 1}未輸入每日人數`)) return
            this.requestFile.push(`活動${index + 1}未輸入每日人數`)
          }
          if (Object.keys(item.startDate).some(key => isNaN(item.startDate[key] || !!item.startDate[key]))) {
            if (this.requestFile.includes(`活動${index + 1}未選擇活動起始時間`)) return
            this.requestFile.push(`活動${index + 1}未選擇活動起始時間`)
          }
          if (Object.keys(item.endDate).some(key => isNaN(item.endDate[key] || !!item.endDate[key]))) {
            if (this.requestFile.includes(`活動${index + 1}未選擇活動結束時間`)) return
            this.requestFile.push(`活動${index + 1}未選擇活動結束時間`)
          }
          // if (!item.startDate.year || !item.startDate.month || !item.startDate.day || isNaN(item.startDate.hour)) {
          //   if (this.requestFile.includes('未選擇活動起始日')) return
          //   this.requestFile.push('未選擇活動開始日')
          // }
          // if (!item.endDate.year || !item.endDate.month || !item.endDate.day || isNaN(item.endDate.hour)) {
          //   if (this.requestFile.includes('未選擇活動結束日')) return
          //   this.requestFile.push('未選擇活動結束日')
          // }
          if (!item.city.Value) {
            if (this.requestFile.includes(`活動${index + 1}未選擇縣市`)) return
            this.requestFile.push(`活動${index + 1}未選擇縣市`)
          }
          if (!item.area.Value) {
            if (this.requestFile.includes(`活動${index + 1}未選區域`)) return
            this.requestFile.push(`活動${index + 1}未選區域`)
          }
          if (!item.address) {
            if (this.requestFile.includes(`活動${index + 1}未輸入活動處所地址`)) return
            this.requestFile.push(`活動${index + 1}未輸入活動處所地址`)
          }
          if (item.day <= 0) {
            if (this.requestFile.includes(`活動${index + 1}活動計日錯誤`)) return
            this.requestFile.push(`活動${index + 1}活動計日錯誤`)
          }
        })
      }

      if (!this.period.startDate.year || !this.period.startDate.month || !this.period.startDate.day || isNaN(this.period.startDate.hour)) {
        this.requestFile.push('未選擇起保日')
      }
      this.insuranceAmountList.map(item => {
        if (!item.selfInflictedAmount.Value == '請選擇金額') {
          this.requestFile.push('未選擇自負額')
        }
        if (item.amountType.Value == 1 && !item.mergeSingleAmount) {
          this.requestFile.push('未輸入單一限額')
        }
        if (item.amountType.Value == 2 && (!item.insuranceTotalAmount || !item.perAccidentBodyAmount || !item.perAccidentFinanceAmount || !item.perBodyAmount)) {
          this.requestFile.push('未輸入保額')
        }
        if (item.amountType.Value == 2 && (item.insuranceTotalAmount == '0' || item.perAccidentBodyAmount == '0' || item.perAccidentFinanceAmount == '0' || item.perBodyAmount == '0')) {
          this.requestFile.push('保額不可為0')
        }
        if (item.amountType.Value == 2 && (Number(item.insuranceTotalAmount) < Number(item.perAccidentBodyAmount) + Number(item.perAccidentFinanceAmount))) {
          this.requestFile.push('AGG不得小於AOA加總')
        }
      })
      Object.keys(this.terms).map(key => {
        if (this.terms[key].selected) {
          const target = this.additionTermsList.find(item => item.additionTermName == key)
          if (target && this.additionTerms[target.additionTermId]) {
            if (['PL002', 'PL003', 'PL004', 'PL007', 'PL035'].includes(target.additionTermId)) return
            if (target.additionTermId == 'PL005') {
              if (!this.additionTerms[target.additionTermId].value1 || this.additionTerms[target.additionTermId].value1 === '0') {
                this.requestFile.push(`${target.additionTermName}條款未填寫完成或金額不能為0`)
              }
              if (!this.additionTerms[target.additionTermId].value2) {
                this.requestFile.push(`${target.additionTermName}處所數量至少為1`)
              }
            } else if (target.additionTermId == 'PL058') {
              if (!this.additionTerms[target.additionTermId].value1) {
                this.requestFile.push(`${target.additionTermName}條款未填寫完成`)
              }
              if (Number(this.additionTerms[target.additionTermId].value1) < 1) {
                this.requestFile.push(`${target.additionTermName}數量至少為1公斤`)
              }
            } else {
              Object.keys(this.additionTerms[target.additionTermId]).map(key => {
                if (!this.additionTerms[target.additionTermId][key]) {
                  if (!this.requestFile.includes(`${target.additionTermName}條款未填寫完成`)) {
                    this.requestFile.push(`${target.additionTermName}條款未填寫完成`)
                  }
                }
              })
            }
          }
        }
      })
      if (!calculate && !this.insuranceAmountListData.amount) {
        this.requestFile.push('未試算保費')
      }
      // Object.keys(this.terms).map(key => {
      //   if (this.terms[key].selected && this.additionTerms[key.split(' ')[0]]) {
      //     if (Object.keys(this.additionTerms[key.split(' ')[0]]).some(k => (!this.additionTerms[key.split(' ')[0]][k] && this.additionTerms[key.split(' ')[0]][k] !== false) || this.additionTerms[key.split(' ')[0]][k] === '0')) {
      //       if (!this.requestFile.includes(`${key}條款未填寫完成或金額不能為0`)) {
      //         this.requestFile.push(`${key}條款未填寫完成或金額不能為0`)
      //       }
      //     }
      //   }
      // })
    }
  },
}