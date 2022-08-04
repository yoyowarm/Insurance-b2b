import { Popup } from '@/utils/popups/index'
import { IDRegex } from '@/utils/regex'
export default {
  data() {
    return {
      requestFile: [],
      verifyResult: [],
      IDRegex
    }
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
      const InsuranedId = await this.$store.dispatch('verify/idOrRegisterNumberFormatOK', { input: this.Insuraned.Value, type: 1 })
      const ApplicantId = await this.$store.dispatch('verify/idOrRegisterNumberFormatOK', { input: this.Applicant.Value, type: 1 })
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
    verifyRequired(type) {
      this.requestFile = []
      //被保險人
      if (!this.Insuraned.ID) {
        this.requestFile.push('未填寫被保險人統編/身分證')
      }
      if (this.IDRegex(this.Insuraned.ID).every(item => !item)) {
        this.requestFile.push('被保險人統編/身分證格式錯誤')
      }
      if (!this.Insuraned.Name) {
        this.requestFile.push('未填寫被保險人名稱')
      }
      if (!this.Insuraned.Mobile) {
        this.requestFile.push('未填寫被保險人電話')
      }
      if (this.Insuraned.IsForeigner && !this.Insuraned.Nationality.Value) {
        this.requestFile.push('未選擇被保險人國籍')
      }
      if (this.Insuraned.PrincipalRequired && !this.Insuraned.Principal) {
        this.requestFile.push('未選擇被保險人負責人')
      }
      if (!this.Insuraned.City.Value) {
        this.requestFile.push('被保險人未選擇縣市')
      }
      if (!this.Insuraned.Area.Value) {
        this.requestFile.push('被保險人未選擇區域')
      }
      if (!this.Insuraned.subAddress) {
        this.requestFile.push('被保險人未輸入地址')
      }
      if (this.Insuraned.IsForeignRegister && !this.Insuraned.RegisterNationality) {
        this.requestFile.push('被保險人未輸入登記/註冊地國籍')
      }
      //要保險人
      if (!this.Applicant.ID) {
        this.requestFile.push('未填寫要保險人統編/身分證')
      }
      if (this.IDRegex(this.Applicant.ID).every(item => !item)) {
        this.requestFile.push('要保險人統編/身分證格式錯誤')
      }
      if (!this.Applicant.Name) {
        this.requestFile.push('未填寫要保險人名稱')
      }
      if (!this.Applicant.Mobile) {
        this.requestFile.push('未填寫要保險人電話')
      }
      if (this.Applicant.IsForeigner && !this.Applicant.Nationality.Value) {
        this.requestFile.push('未選擇要保險人國籍')
      }
      if (this.Applicant.PrincipalRequired && !this.Applicant.Principal) {
        this.requestFile.push('未選擇要保險人負責人')
      }
      if (!this.Applicant.City.Value) {
        this.requestFile.push('要保險人未選擇縣市')
      }
      if (!this.Applicant.Area.Value) {
        this.requestFile.push('要保險人未選擇區域')
      }
      if (!this.Applicant.subAddress) {
        this.requestFile.push('要保險人未輸入地址')
      }
      if (this.Applicant.IsForeignRegister && !this.Applicant.RegisterNationality) {
        this.requestFile.push('要保險人未輸入登記/註冊地國籍')
      }
      if (!this.Relation.Value) {
        this.requestFile.push('未選擇關係')
      }
      if (!this.internalControlData.businessSourceCode.Value) {
        this.requestFile.push('未選擇業務來源')
      }
      if (!this.internalControlData.issuerNumber) {
        this.requestFile.push('未填寫經手人代號')
      }
      if (type == 'place') {
        this.placeInfo.map(item => {
          if (item.area.Value == '選擇區域' || item.area.Text == '選擇區域') {
            this.requestFile.push('未選擇區域')
          }
          if (!item.subAddress) {
            this.requestFile.push('未輸入處所地址')
          }
        })
      }
    }
  }
}