import { mapState } from 'vuex'
import { quotationStep1 } from '@/utils/dataTemp'
import { formatDate } from '@/utils/dateFormat'
import { IDRegex } from '@/utils/regex'
export default {
  data() {
    return {
      selfPayList: [
        { Value: 0, Text: '0元' },
        { Value: 2500, Text: '2,500元' },
        { Value: 5000, Text: '5,000元' },
        { Value: 10000, Text: '10,000元' },
        { Value: 50000, Text: '50,000元' },
        { Value: 100000, Text: '100,000元' },
        { Value: 200000, Text: '200,000元' },
      ],
      amountList: [
        { Value: 0, Text: '依各縣市規定' },
        { Value: 1, Text: '合併單一限額' },
        { Value: 2, Text: '自行輸入保額' },
      ],
      IDRegex
    }
  },
  computed: {
    ...mapState({
      'InsuranceActive': state => state.quotationStep1.InsuranceActive,
      'step1Model': state => state.quotationStep1.step1Model,
    })
  },
  watch: {
    'targetSelect.roofList': function (val) {
      if (this.InsuranceActive === 0) return
      if (val.length > 0 && this.step1Model.step1ViewModel.Roof) {
        const roof = this.targetSelect.roofList.find(item => item.Value == this.step1Model.step1ViewModel.Roof)
        if (roof) {
          roof.placeholder = roof.Text
          roof.id = roof.Value
          this.targetData = Object.assign({ ...this.targetData }, { roof })
        }
      }
    },
    'targetSelect.structureList': function (val) {
      if (this.InsuranceActive === 0) return
      if (val.length > 0 && this.step1Model.step1ViewModel.Structure) {
        const structure = this.targetSelect.structureList.find(item => item.Value == this.step1Model.step1ViewModel.Structure)
        if (structure) {
          structure.placeholder = structure.Text
          structure.id = structure.Value
          this.targetData = Object.assign({ ...this.targetData }, { structure })
        }
      }
    },
    'targetSelect.areaList': function (val) {
      if (this.InsuranceActive === 0) return
      if (val.length > 0 && this.step1Model.step1ViewModel.Area) {
        const Area = this.targetSelect.areaList.find(item => item.Value == this.step1Model.step1ViewModel.Area)
        if (Area) {
          Area.placeholder = Area.Text
          Area.id = Area.Value
          this.targetData = Object.assign({ ...this.targetData }, { Area })
        }
      }
    }
  },
  methods: {
    quotationDataArrangement(data) {
      console.log(data)
      if (this.InsuranceActive === 0) return
      const obj = {
        step1ViewModel: data.step1ViewModel,
        step2ViewModel: data.step2ViewModel,
        InsuredCode: data.InsuredCode,
        TypeNumber: data.TypeNumber,
        InsuranceActive: this.InsuranceActive,
        UserID: data.UserID,
        OrderNo: data.OrderNo,
        SerialNo: data.SerialNo,
        CreateDate: formatDate(new Date())
      }
      this.$store.dispatch('quotationStep1/updatedStep1Model', obj)

      const copyInfo = quotationStep1().info
      Object.assign(copyInfo, {
        IsRenewal: data.step1ViewModel.IsRenewal,
        InsuranceNumber: data.step1ViewModel.InsuranceNumber,
        startDate: {
          year: data.step1ViewModel.StartDate.split('-')[0],
          month: data.step1ViewModel.StartDate.split('-')[1],
          day: data.step1ViewModel.StartDate.split('-')[2]
        },
        endDate: {
          year: data.step1ViewModel.EndDate.split('-')[0],
          month: data.step1ViewModel.EndDate.split('-')[1],
          day: data.step1ViewModel.EndDate.split('-')[2]
        },
        IsMortgageNeeded: data.step1ViewModel.HasMortgage,
        IOfficer: data.step1ViewModel.IOfficer,
        LoginCode: data.step1ViewModel.LoginCode,
      })
      this.$store.dispatch('quotationStep1/updatedInfo', copyInfo)

      const copyTarget = quotationStep1().target
      Object.assign(copyTarget, {
        address: data.step1ViewModel.Address,
        Square: (data.step1ViewModel.Square).toString(),
        TotalFloor: (data.step1ViewModel.TotalFloor).toString(),
        HasFactoryOrStoreInBuilding: data.step1ViewModel.HasFactoryOrStoreInBuilding,
        SpectificFloor: (data.step1ViewModel.SpectificFloor).toString(),
      })
      this.$store.dispatch('quotationStep1/updatedTarget', copyTarget)

    },
    step1InitAssignValue(type) {
      console.log(this.quotationData)
      if (Object.keys(this.quotationData).length == 0) return
      const quotationType = type == 'place' ? 'placeInsureInfo' : 'activityInsureInfo'
      if (type == 'place' && this.quotationData[quotationType].renewal.isRenewal) {//訂單續保
        this.$store.dispatch(`${type}/updatedRenewal`, {
          IsRenewal: this.quotationData[quotationType].renewal.isRenewal,
          InsuranceNumber: this.quotationData[quotationType].renewal.insuranceNumber,
        })
      }
      if (this.quotationData[quotationType].remark) {//備註
        this.$store.dispatch(`${type}/updatedRemark`, this.quotationData[quotationType].remark)
      }
      if (this.quotationData[quotationType].insureType) {//投保行業
        const target = this.industryList.find(item => item.itemName === this.quotationData[quotationType].insureType)
        if (target) {
          this.$store.dispatch(`${type}/updatedIndustry`, { ...target, Text: target.itemName, Value: target.dangerSeq })
        }
      }
      if (this.quotationData[quotationType].otherIndustryName && this.quotationData[quotationType].insureType == '其他(混合類別)') {
        this.$store.dispatch(`${type}/updatedIndustryText`, this.quotationData[quotationType].otherIndustryName)
      }
      if (this.quotationData[quotationType].additionTerms.length > 0 && this.additionTermsList.length > 0) {//附加條款
        this.quotationData[quotationType].additionTerms.map(item => {//建議條款
          const target = this.additionTermsList.find(i => i.additionTermId === item.additionTermId)
          if (target) {
            const copyTerms = { ...this.termsData }
            copyTerms[target.additionTermName].selected = true
            this.$store.dispatch(`${type}/updatedTerms`, copyTerms)
          }
          if (item.additionTermValue) {//建議條款細項
            const additionTerms = { ...this.$store.state[type].additionTerms }
            const data = { ...additionTerms[item.additionTermId] }
            if (item.additionTermId == 'PL005') {//建築物承租人火災附加條款

              item.additionTermValue.map(value => {
                data[value.itemId] = (value.itemValue == 'false') ? false : ((value.itemValue == 'true') ? true : (value.itemId == 'value1' ? Number(value.itemValue) / 10000 : value.itemValue))
              })
              this.$store.dispatch(`${type}/updateAdditionTerms`, { ...additionTerms, [item.additionTermId]: data })
            } else if (['PL040', 'PL049', 'PL016'].includes(item.additionTermId)) {
              item.additionTermValue.map(value => {
                data[value.itemId] = (value.itemValue == 'false') ? false : ((value.itemValue == 'true') ? true : Number(value.itemValue) / 10000)
              })
              this.$store.dispatch(`${type}/updateAdditionTerms`, { ...additionTerms, [item.additionTermId]: data })
            } else {
              item.additionTermValue.map(value => {
                data[value.itemId] = (value.itemValue == 'false') ? false : ((value.itemValue == 'true') ? true : value.itemValue)
              })
              this.$store.dispatch(`${type}/updateAdditionTerms`, { ...additionTerms, [item.additionTermId]: data })
            }
          }
        })
      }
      if (type == 'place' && this.quotationData[quotationType].insuranceRecord.lastYear.status) {//投保紀錄
        this.InsuranceRecordTable = {
          ...this.InsuranceRecordTable,
          lastYear: this.quotationData[quotationType].insuranceRecord.lastYear,
        }
      }
      if (type == 'place' && this.quotationData[quotationType].insuranceRecord.previousYear.status) {//投保紀錄
        this.InsuranceRecordTable = {
          ...this.InsuranceRecordTable,
          previousYear: this.quotationData[quotationType].insuranceRecord.previousYear,
        }
      }
      if (this.quotationData.insuranceAmounts.length > 0) {//保險金額/自負額
        this.insuranceAmountListData = {
          ...this.quotationData.insuranceAmounts[0],
          amount: this.quotationData.insuranceAmounts[0].insuranceAmount ? `NT$${this.quotationData.insuranceAmounts[0].insuranceAmount}` : 'NT$ - -',
          amountType: this.amountList.find(item => item.Value == this.quotationData.insuranceAmounts[0].amountType),
          insuranceTotalAmount: this.quotationData.insuranceAmounts[0].insuranceTotalAmount,
          mergeSingleAmount: this.quotationData.insuranceAmounts[0].mergeSingleAmount,
          perAccidentBodyAmount: this.quotationData.insuranceAmounts[0].perAccidentBodyAmount,
          perAccidentFinanceAmount: this.quotationData.insuranceAmounts[0].perAccidentFinanceAmount,
          perBodyAmount: this.quotationData.insuranceAmounts[0].perBodyAmount,
          selfInflictedAmount: this.selfPayList.find(item => item.Value == this.quotationData.insuranceAmounts[0].selfInflictedAmount),
        }
      }
      if (this.quotationData[quotationType].insuranceBeginDate) {//保險期間
        this.periodData = {
          ...this.periodData,
          startDate: {
            year: `${Number(this.quotationData[quotationType].insuranceBeginDate.split('T')[0].split('-')[0]) - 1911}`,
            month: `${this.quotationData[quotationType].insuranceBeginDate.split('T')[0].split('-')[1]}`,
            day: `${this.quotationData[quotationType].insuranceBeginDate.split('T')[0].split('-')[2]}`,
            hour: `${this.quotationData[quotationType].insuranceBeginHour}`,
          },
        }
      }
      if (this.quotationData[quotationType].insuranceEndDate) {//保險期間
        this.periodData = {
          ...this.periodData,
          endDate: {
            year: `${Number(this.quotationData[quotationType].insuranceEndDate.split('T')[0].split('-')[0]) - 1911}`,
            month: `${this.quotationData[quotationType].insuranceEndDate.split('T')[0].split('-')[1]}`,
            day: `${this.quotationData[quotationType].insuranceEndDate.split('T')[0].split('-')[2]}`,
            hour: `${this.quotationData[quotationType].insuranceEndHour}`,
          },
        }
      }
      if (this.quotationData[quotationType].fileAttachments && this.quotationData[quotationType].fileAttachments.length > 0) {//附件
        this.attachmentList = this.quotationData[quotationType].fileAttachments
      }
      if (this.quotationData[quotationType][`${type}Info`].length > 0) {//處所活動資訊
        if (type == 'place') {
          this.placeInfoList = this.quotationData[quotationType][`${type}Info`].map(item => {
            return {
              ...item,
              holdState: item.holdState == 0 ? true : false,
              city: this.countyList.find(i => i.Value == item.cityId) ? this.countyList.find(i => i.Value == item.cityId) : { Text: '選擇縣市', Value: '' },
              area: this.areaList.find(i => i.Value == item.areaId) ? this.areaList.find(i => i.Value == item.areaId) : { Value: '選擇區域', Text: '選擇區域' },
            }
          })
        }
        if (type == 'activity') {
          this.activityInfoList = this.quotationData[quotationType][`${type}Info`].map(item => {
            return {
              ...item,
              number: item.dailyPeople.toString(),
              address: item.subAddress.toString(),
              day: item.activityDays.toString(),
              city: this.countyList.find(i => i.Value == item.cityId),
              area: this.areaList.find(i => i.Value == item.areaId) ? this.areaList.find(i => i.Value == item.areaId) : { Value: '選擇區域', Text: '選擇區域' },
              startDate: {
                year: `${Number(item.activityBeginDate.split('T')[0].split('-')[0]) - 1911}`,
                month: `${item.activityBeginDate.split('T')[0].split('-')[1]}`,
                day: `${item.activityBeginDate.split('T')[0].split('-')[2]}`,
                hour: `${item.activityBeginHour}`,
              },
              endDate: {
                year: `${Number(item.activityEndDate.split('T')[0].split('-')[0]) - 1911}`,
                month: `${item.activityEndDate.split('T')[0].split('-')[1]}`,
                day: `${item.activityEndDate.split('T')[0].split('-')[2]}`,
                hour: `${item.activityEndHour}`,
              },
            }
          })
        }
      }


    },
    step2InitAssignValue(type) {
      console.log(this.quotationData)
      //被保人與要保人之關係
      if (this.quotationData.relationText) {
        const relation = this.relationShips.find(i => i.nane == this.quotationData.relationText)
        if (relation) {
          this.$store.dispatch(`${type}/updatedRelation`, relation)
        }
      }
      const Insuraned = {}//要保人
      if (Object.keys(this.quotationData.insuraned).length > 0) {
        Object.assign(Insuraned, {
          ID: this.quotationData.insuraned.id,
          Name: this.quotationData.insuraned.name,
          IsForeigner: this.quotationData.insuraned.isForeigner,
          Nationality: this.quotationData.insuraned.nationalityName ? this.nationalities.find(i => i.Text == this.quotationData.insuraned.nationalityName) : { Text: '', Value: '' },
          CorporateName: this.quotationData.insuraned.corporateName,
          City: this.quotationData.insuraned.cityId ? this.countyList.find(i => i.Value == this.quotationData.insuraned.cityId) : { Text: '選擇縣市', Value: '', },
          Area: this.quotationData.insuraned.areaId ? this.InsuranedAreaList.find(i => i.areaId == this.quotationData.insuraned.areaId) : { Text: '選擇區域', Value: '', },
          subAddress: this.quotationData.insuraned.subAddress,
          Mobile: this.quotationData.insuraned.mobile,
          IsForeignRegister: this.quotationData.insuraned.isForeignRegister,
          RegisterNationality: this.quotationData.insuraned.registerNationality !== '本國' ? (this.nationalities.find(i => i.Text == this.quotationData.insuraned.registerNationality) ? this.nationalities.find(i => i.Text == this.quotationData.insuraned.registerNationality) : { Text: '', Value: '' }) : { Text: '', Value: '' },
          Profession: this.quotationData.insuraned.isProfession,
          IsPolitician: this.quotationData.insuraned.isPolitician,
          overseasOrDomestic: Boolean(this.quotationData.insuraned.overseasOrDomestic),
          IsProOrNot: this.quotationData.insuraned.isProOrNot,
          activityName: this.quotationData.insuraned.activityName,
        })
        if (this.IDRegex(Insuraned.ID)[1]) {
          Insuraned.CorporateRequired = true
        }
        this.$store.dispatch(`${type}/updatedInsuraned`, Insuraned)
      }

      const Applicant = {}//被保人
      if (Object.keys(this.quotationData.applicant).length > 0) {
        Object.assign(Applicant, {
          ID: this.quotationData.applicant.id,
          Name: this.quotationData.applicant.name,
          IsForeigner: this.quotationData.applicant.isForeigner,
          Nationality: this.quotationData.applicant.nationalityName ? this.nationalities.find(i => i.Text == this.quotationData.applicant.nationalityName) : { Text: '', Value: '' },
          CorporateName: this.quotationData.applicant.corporateName,
          City: this.quotationData.applicant.cityId ? this.countyList.find(i => i.Value == this.quotationData.applicant.cityId) : { Text: '選擇縣市', Value: '', },
          Area: this.quotationData.applicant.areaId ? this.ApplicantAreaList.find(i => i.areaId == this.quotationData.applicant.areaId) : { Text: '選擇區域', Value: '', },
          subAddress: this.quotationData.applicant.subAddress,
          Mobile: this.quotationData.applicant.mobile,
          IsForeignRegister: this.quotationData.applicant.isForeignRegister,
          RegisterNationality: this.quotationData.applicant.registerNationality !== '本國' ? (this.nationalities.find(i => i.Text == this.quotationData.applicant.registerNationality) ? this.nationalities.find(i => i.Text == this.quotationData.applicant.registerNationality) : { Text: '', Value: '' }) : { Text: '', Value: '' },
          Profession: this.quotationData.applicant.isProfession,
          IsPolitician: this.quotationData.applicant.isPolitician,
          overseasOrDomestic: Boolean(this.quotationData.applicant.overseasOrDomestic),
          IsProOrNot: this.quotationData.applicant.isProOrNot,
        })
        if (this.IDRegex(Applicant.ID)[1]) {
          Applicant.CorporateRequired = true
        }
        this.$store.dispatch(`${type}/updatedApplicant`, Applicant)
      }
      if (this.quotationData.policyTransfer && Object.keys(this.quotationData.policyTransfer).length > 0) {
        this.policyTransferData = {
          transferType: this.quotationData.policyTransfer.transferType,
          transferDetails: this.quotationData.policyTransfer.transferDetails
            ? this.quotationData.policyTransfer.transferDetails.map(item => {
              return {
                ...item,
                transferDetailType: item.transferDetailType == 2 ? true : false,
                transferOriginalType: item.transferOriginalType == 2 ? true : false,
              }
            })
            : [{
              transferDetailType: false,
              transferOriginalType: false,
              transferInfo: '',
              sort: 0
            }]
        }
      }
      if (this.quotationData.internalControlData && Object.keys(this.quotationData.internalControlData).length > 0) {
        this.internalControl = {
          issuerNumber: this.quotationData.internalControlData.issuerNumber.trim(),
          loginIdNumber: this.quotationData.internalControlData.loginIdNumber.trim(),
          statisticsCode: this.quotationData.internalControlData.statisticsCode.trim(),
          businessSourceCode: this.businessSource.find(i => i.Value == this.quotationData.internalControlData.businessSourceCode),
        }
      }
    },
  }
}