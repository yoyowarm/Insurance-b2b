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
    verifyRequired() {
      this.requestFile = []
      if (this.info.IsRenewal && !this.info.InsuranceNumber) {
        this.requestFile.push('未輸入續保號碼')
      }
      if (!this.info.startDate.year || !this.info.startDate.month || !this.info.startDate.day) {
        this.requestFile.push('未選擇起保日')
      }
      if (this.info.IsMortgageNeeded && !this.info.bank.id && !this.info.branch.id) {
        this.requestFile.push('未選擇抵押銀行分行')
      }
      if (!this.info.IOfficer) {
        this.requestFile.push('未輸入經手人代號')
      }
      if (!this.info.IBroker.id) {
        this.requestFile.push('未選擇業務來源')
      }
      if (!this.selectedProgram.Value) {
        this.requestFile.push('未選擇商火險方案')
      }
      if (!this.target.city.id) {
        this.requestFile.push('未選擇縣市')
      }
      if (!this.target.area.id) {
        this.requestFile.push('未選擇區域')
      }
      if (!this.target.address) {
        this.requestFile.push('未輸入地址')
      }
      if (!this.target.Square) {
        this.requestFile.push('未輸入坪數')
      }
      if (!this.target.structure.id) {
        this.requestFile.push('未選擇建物構造')
      }
      if (!this.target.roof.id) {
        this.requestFile.push('未選擇屋頂')
      }
      if (!this.target.TotalFloor) {
        this.requestFile.push('未輸入總樓層數')
      }
      if (this.target.HasFactoryOrStoreInBuilding && !this.target.SpectificFloor) {
        this.requestFile.push('未輸入投保標的物所在樓層')
      }
      if (!this.SchemeSetting.Usage.id) {
        this.requestFile.push('未選擇使用性質')
      }
      if (!this.SchemeSetting.UsageDetail) {
        this.requestFile.push('未輸入使用性質')
      }
      if (this.SchemeSetting.IsLossProgramChosen && !this.SchemeSetting.LossProgram.id) {
        this.requestFile.push('未選擇停業損失方案')
      }
      Object.keys(this.AdditionInsurance).map(item => {
        if (this.AdditionInsurance[item].selected && !this.AdditionInsurance[item].amount) {
          this.requestFile.push(`${item}未選擇保額`)
        }
      })
      Object.keys(this.LiabilityInsurance).map((item, index) => {
        if (this.liabilitySelect.selectLists[index].DisplayFor.length > 0 && this.liabilitySelect.selectLists[index].DisplayFor.includes(this.SchemeSetting.Usage.id)) {
          if (!this.LiabilityInsurance[item].Value) {
            this.requestFile.push(`${item}未選擇方案`)
          }
        }
        if (this.LiabilityInsurance[item].choose) {
          if (!this.LiabilityInsurance[item].insuredNumber) {
            this.requestFile.push(`${item}未輸入保險人數`)
          }
          if (!this.LiabilityInsurance[item].Value) {
            this.requestFile.push(`${item}未選擇保險方案`)
          }
        }
      })
      if (!this.selectedCommission.Value) {
        this.requestFile.push('未選擇佣金%數')
      }
    }
  },
}