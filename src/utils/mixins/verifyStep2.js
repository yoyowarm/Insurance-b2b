import { Popup } from '@/utils/popups/index'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      requestFile: [],
      verifyResult: []
    }
  },
  computed: {
    ...mapState({
      Insuraned: state => state.quotationStep2.Insuraned,
      Relation: state => state.quotationStep2.Relation,
      Applicant: state => state.quotationStep2.Applicant,
      Paper: state => state.quotationStep2.Paper,
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
    async verifySalesInvade() {
      //地址
      const InsuranedAD = await this.$store.dispatch('verify/salesInvade', { value: `${this.Insuraned.City.placeholder}${this.Insuraned.Area.placeholder}${this.Insuraned.Street}`, salesInvadetype: 0 })
      const ApplicantAD = await this.$store.dispatch('verify/salesInvade', { value: `${this.Applicant.City.placeholder}${this.Applicant.Area.placeholder}${this.Applicant.Street}`, salesInvadetype: 0 })
      InsuranedAD.data.type = '被保人地址'
      ApplicantAD.data.type = '要保人地址'
      if (!InsuranedAD.data.IsSuccess) this.verifyResult.push(InsuranedAD.data)
      if (!ApplicantAD.data.IsSuccess) this.verifyResult.push(ApplicantAD.data)
      //手機
      const InsuranedPhone = await this.$store.dispatch('verify/salesInvade', { value: this.Insuraned.Mobile, salesInvadetype: 2 })
      const ApplicantPhone = await this.$store.dispatch('verify/salesInvade', { value: this.Applicant.Mobile, salesInvadetype: 2 })
      InsuranedPhone.data.type = '被保人手機'
      ApplicantPhone.data.type = '要保人手機'
      if (!InsuranedPhone.data.IsSuccess) this.verifyResult.push(InsuranedPhone.data)
      if (!ApplicantPhone.data.IsSuccess) this.verifyResult.push(ApplicantPhone.data)
    },
    async verifyIdOrRegisterNumberFormat() {
      const InsuranedId = await this.$store.dispatch('verify/idOrRegisterNumberFormatOK', { input: this.Insuraned.ID, type: 1 })
      const ApplicantId = await this.$store.dispatch('verify/idOrRegisterNumberFormatOK', { input: this.Applicant.ID, type: 1 })
      InsuranedId.data.type = '被保人統編/身分證'
      ApplicantId.data.type = '要保人統編/身分證'
      if (!InsuranedId.data.IsSuccess) this.verifyResult.push(InsuranedId.data)
      if (!ApplicantId.data.IsSuccess) this.verifyResult.push(ApplicantId.data)
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
      //被保險人
      if (!this.Insuraned.ID) {
        this.requestFile.push('未填寫被保險人統編/身分證')
      }
      if (!this.Insuraned.Name) {
        this.requestFile.push('未填寫被保險人名稱')
      }
      if (!this.Insuraned.Mobile) {
        this.requestFile.push('未填寫被保險人電話')
      }
      if (this.Insuraned.IsForeigner && !this.Insuraned.Nationality.id) {
        this.requestFile.push('未選擇被保險人國籍')
      }
      if (this.Insuraned.PrincipalRequired && !this.Insuraned.Principal) {
        this.requestFile.push('未選擇被保險人負責人')
      }
      if (!this.Insuraned.City.id) {
        this.requestFile.push('被保險人未選擇縣市')
      }
      if (!this.Insuraned.Area.id) {
        this.requestFile.push('被保險人未選擇區域')
      }
      if (!this.Insuraned.Street) {
        this.requestFile.push('被保險人未輸入地址')
      }
      if (this.Insuraned.IsForeignRegister && !this.Insuraned.RegisterNationality) {
        this.requestFile.push('被保險人未輸入登記/註冊地國籍')
      }
      //要保險人
      if (!this.Applicant.ID) {
        this.requestFile.push('未填寫要保險人統編/身分證')
      }
      if (!this.Applicant.Name) {
        this.requestFile.push('未填寫要保險人名稱')
      }
      if (!this.Applicant.Mobile) {
        this.requestFile.push('未填寫要保險人電話')
      }
      if (this.Applicant.IsForeigner && !this.Applicant.Nationality.id) {
        this.requestFile.push('未選擇要保險人國籍')
      }
      if (this.Applicant.PrincipalRequired && !this.Applicant.Principal) {
        this.requestFile.push('未選擇要保險人負責人')
      }
      if (!this.Applicant.City.id) {
        this.requestFile.push('要保險人未選擇縣市')
      }
      if (!this.Applicant.Area.id) {
        this.requestFile.push('要保險人未選擇區域')
      }
      if (!this.Applicant.Street) {
        this.requestFile.push('要保險人未輸入地址')
      }
      if (this.Applicant.IsForeignRegister && !this.Applicant.RegisterNationality) {
        this.requestFile.push('要保險人未輸入登記/註冊地國籍')
      }
      if (!this.Paper.OriginalNumber) {
        this.requestFile.push('未填寫紙本保單正本份數')
      }
      if (!this.Paper.CopyNumber) {
        this.requestFile.push('未填寫紙本保單副本份數')
      }
      if (!this.Paper.ReciecptNumber) {
        this.requestFile.push('未填寫紙本保單收據份數')
      }
      if (!this.Relation.Value) {
        this.requestFile.push('未選擇關係')
      }
      if (this.Paper.IsRecieptChoseOther) {
        this.Paper.InsuredReciepts.map(item => {
          Object.keys(item).map(key => {
            if (this.requestFile.includes('被要保人收據未填寫成完')) return
            if (!item[key]) {
              this.requestFile.push('被要保人收據未填寫完')
            }
          })
        })
      }
    }
  }
}