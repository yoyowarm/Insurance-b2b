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
    verifyRequired(type) {
      this.requestFile = []
      if (type == 'place') {
        if (this.renewal.IsRenewal && !this.renewal.InsuranceNumber) {
          this.requestFile.push('未輸入續保號碼')
        }
        this.placeInfo.map(item => {
          if (!item.city.Value) {
            this.requestFile.push('未選擇縣市')
          }
          if (item.squareFeet == 0) {
            this.requestFile.push('未輸入處所坪數')
          }
        })
      }
      if (type == 'activity') {
        if (!this.period.endDate.year || !this.period.endDate.month || !this.period.endDate.day || !this.period.endDate.hour) {
          this.requestFile.push('未選擇結束日')
        }
        this.activityInfo.map(item => {
          if (!item.number) {
            this.requestFile.push('未輸入每日人數')
          }
          if (!item.startDate.year || !item.startDate.month || !item.startDate.day || !item.startDate.hour) {
            this.requestFile.push('未選擇活動開始日')
          }
          if (!item.endDate.year || !item.endDate.month || !item.endDate.day || !item.endDate.hour) {
            this.requestFile.push('未選擇活動結束日')
          }
          if (!item.city.Value) {
            this.requestFile.push('未選擇縣市')
          }
          if (!item.area.Value) {
            this.requestFile.push('未選區域')
          }
          if (!item.address) {
            this.requestFile.push('未輸入活動處所地址')
          }
          if (item.day <= 0) {
            this.requestFile.push('活動計日錯誤')
          }
        })
      }
      if (!this.industry.Value) {
        this.requestFile.push('未選擇投保行業')
      }
      if (!this.period.startDate.year || !this.period.startDate.month || !this.period.startDate.day || !this.period.startDate.hour) {
        this.requestFile.push('未選擇起保日')
      }
      this.insuranceAmountList.map(item => {
        if (!item.selfInflictedAmount.Value) {
          this.requestFile.push('未選擇自負額')
        }
        if (item.amountType.Value == 1 && !item.mergeSingleAmount) {
          this.requestFile.push('未輸入單一限額')
        }
        if (item.amountType.Value == 2 && (!item.insuranceTotalAmount || !item.perAccidentBodyAmount || !item.perAccidentFinanceAmount || !item.perBodyAmount)) {
          this.requestFile.push('未輸入保額')
        }
      })
      Object.keys(this.terms).map(key => {
        if (this.terms[key].selected) {
          const target = this.additionTermsList.find(item => item.additionTermName == key)
          if (target && this.additionTerms[target.additionTermId]) {
            if (['PL002', 'PL003', 'PL004', 'PL007', 'PL035'].includes(target.additionTermId)) return
            Object.keys(this.additionTerms[target.additionTermId]).map(key => {
              if (!this.additionTerms[target.additionTermId][key]) {
                this.requestFile.push(`${target.additionTermName}條款未填寫完成`)
              }
            })
          }
        }
      })
    }
  },
}