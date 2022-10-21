import { Popup } from '@/utils/popups/index'
import { IDRegex, isEmail, MobileRegex } from '@/utils/regex'
export default {
  data() {
    return {
      requestFile: [],
      verifyResult: [],
      verifyInvadeResult: [],
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
    async checkPreventOccupy() {
      //要保人電話
      const number = await this.$store.dispatch('verify/CheckPreventOccupy', { Type: 1, Text: this.ApplicantData.Mobile, InsuranedId: this.InsuranedData.ID, ApplicantId: this.ApplicantData.ID })
      this.verifyInvadeResult.push(number.data.content)
      //要保人eMail
      if (this.policyTransfer.transferType == 1) {
        this.policyTransfer.transferDetails.map(async item => {
          if (item.transferDetailType) {
            const email = await this.$store.dispatch('verify/CheckPreventOccupy', { Type: 2, Text: item.transferInfo, InsuranedId: this.InsuranedData.ID, ApplicantId: this.ApplicantData.ID })
            this.verifyInvadeResult.push(email.data.content)
          }
        })
      }
      if (this.ApplicantData.ID == '03336704') {
        this.verifyInvadeResult.push({ isSuccess: false, message: '要保人統編為 03336704 請注意是否更改' })
      }
      if (this.InsuranedData.ID == '03336704') {
        this.verifyInvadeResult.push({ isSuccess: false, message: '被保人統編為 03336704 請注意是否更改' })
      }
      //要保人地址
      const address = await this.$store.dispatch('verify/CheckPreventOccupy', { Type: 3, Text: `${this.ApplicantData.City.Text}${this.ApplicantData.Area.Text}${this.ApplicantData.subAddress}`, InsuranedId: this.InsuranedData.ID, ApplicantId: this.ApplicantData.ID })
      this.verifyInvadeResult.push(address.data.content)

      if (this.$route.path.includes('place')) {//處所地址
        this.placeInfo.map(async item => {
          const place = await this.$store.dispatch('verify/CheckPreventOccupy', { Type: 3, Text: `${item.city.Text}${item.area.Text}${item.subAddress}`, InsuranedId: this.InsuranedData.ID, ApplicantId: this.ApplicantData.ID })
          this.verifyInvadeResult.push(place.data.content)
        })
      }
    },
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
    verifyResultPopup: async function () {
      let htmlText = ''
      this.verifyResult.map(item => {
        if (!item.IsSuccess) {
          htmlText += `<p>${item.Message}</p>`
        } else {
          this.verifyResult.pop()
        }
      })

      this.verifyInvadeResult.map(item => {
        if (!item.isSuccess) {
          htmlText += `<p>${item.message}</p>`
        } else {
          this.verifyInvadeResult.pop()
        }
      })
      if ((this.verifyInvadeResult.length > 0 || this.verifyResult.length > 0) && htmlText != '') {
        Popup.create({
          confirm: true,
          ok: '繼續報價',
          cancel: '修改資料',
          hasHtml: true,
          htmlText: htmlText,
        }).then(async () => {
          this.verifyResult = []
          this.verifyInvadeResult = []
          htmlText = ''
          await this.verifyFinal()
        }).catch(() => {
          this.verifyResult = []
          this.verifyInvadeResult = []
          htmlText = ''
        })
      } else {
        this.verifyResult = []
        this.verifyInvadeResult = []
        await this.verifyFinal()
      }
    },
    verifyRequired(type, InsuranceActive) {
      this.requestFile = []
      //被保險人
      if (type == 'activity') {
        if (!this.Insuraned.activityName) {
          this.requestFile.push('未填寫活動名稱')
        }
      }
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
      if (this.Insuraned.CorporateRequired && !this.Insuraned.CorporateName) {
        this.requestFile.push('未填寫被保險負責人')
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
      if (this.Insuraned.subAddress && this.Insuraned.subAddress.length > 50) {
        this.requestFile.push('被保險人地址長度不可超過50字')
      }
      if (this.Insuraned.IsForeignRegister && !this.Insuraned.RegisterNationality) {
        this.requestFile.push('被保險人未輸入登記/註冊地國籍')
      }
      if (this.Insuraned.Mobile) {
        if (MobileRegex(this.Insuraned.Mobile)) {
          this.requestFile.push('被保險人' + MobileRegex(this.Insuraned.Mobile))
        }
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
      if (!this.Applicant.City.Value) {
        this.requestFile.push('要保險人未選擇縣市')
      }
      if (!this.Applicant.Area.Value) {
        this.requestFile.push('要保險人未選擇區域')
      }
      if (!this.Applicant.subAddress) {
        this.requestFile.push('要保險人未輸入地址')
      }
      if (this.Applicant.subAddress.length > 50) {
        this.requestFile.push('要保險人地址長度不可超過50字')
      }
      if (this.Applicant.IsForeignRegister && !this.Applicant.RegisterNationality) {
        this.requestFile.push('要保險人未輸入登記/註冊地國籍')
      }
      if (this.Applicant.CorporateRequired && !this.Applicant.CorporateName) {
        this.requestFile.push('未填寫要保險負責人')
      }
      if (this.Applicant.Mobile) {
        if (MobileRegex(this.Applicant.Mobile)) {
          this.requestFile.push('要保險人' + MobileRegex(this.Applicant.Mobile))
        }
      }
      if (!this.Relation.Value) {
        this.requestFile.push('未選擇關係')
      }
      if (this.internalControlData.businessSourceCode.Value == '請選擇業務來源') {
        this.requestFile.push('未選擇業務來源')
      }
      if (!this.internalControlData.issuerNumber) {
        this.requestFile.push('未填寫經手人代號')
      }
      if (this.policyTransfer.transferType == 1) {
        this.policyTransfer.transferDetails.map(item => {
          if (!item.transferInfo) {
            if (this.requestFile.includes('未填寫寄送資料')) return
            this.requestFile.push('未填寫寄送資料')
          } else {
            if (!item.transferDetailType && MobileRegex(item.transferInfo, true)) {
              if (this.requestFile.includes(MobileRegex(item.transferInfo, true))) return
              this.requestFile.push(MobileRegex(item.transferInfo, true))
            }
            if (item.transferDetailType && isEmail(item.transferInfo)) {
              if (this.requestFile.includes('信箱格式錯誤')) return
              this.requestFile.push('信箱格式錯誤')
            }
          }
        })
      }
      if (type == 'place' && InsuranceActive !== 2) {
        this.placeInfo.map(item => {
          if (item.area.Value == '選擇區域' || item.area.Text == '選擇區域') {
            this.requestFile.push('未選擇區域')
          }
          if (!item.subAddress) {
            if (this.requestFile.includes('未輸入處所地址')) return
            this.requestFile.push('未輸入處所地址')
          }
          if (item.subAddress.length > 50) {
            if (this.requestFile.includes('處所地址長度不可超過50字')) return
            this.requestFile.push('處所地址長度不可超過50字')
          }
        })
      }
    },
    async verifyUser() {
      const checkUser = await this.$store.dispatch('resource/CheckTaianUserExist', {
        employeeId: this.internalControl.issuerNumber
      })
      if (!checkUser.data.content) {
        this.requestFile.push('請確認經手人代號是否正確')
      }
    }
  }
}