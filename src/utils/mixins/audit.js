export default {
  data() {
    return {
      parameter: {}
    }
  },
  methods: {
    async activityAuditCalculateAmount(data) {
      this.parameter = {}
      this.verifyRequired('activity', true)
      if (this.requestFile.length === 0 &&
        this.verifyResult.length === 0) {
        const payload = {
          orderNo: this.orderNo,
          insureIndustrySeq: this.industry.Value,
          activityUnderwriteInsuranceParameter: {
            additionTermCoefficient: data.additionTermCoefficientParameter == '' ? null : data.additionTermCoefficientParameter,
            aggaoaCoefficient: data.aggAOACoefficient == '' ? null : data.aggAOACoefficient,
            periodCoefficient: data.periodParameter == '' ? null : data.periodParameter,
            sizeCofficient: data.sizeCofficient == '' ? null : data.sizeCofficient,
          },
          insuranceAmounts: this.insuranceAmountList.map((item) => {
            return {
              amountType: item.amountType.Value,
              perBodyAmount: item.perBodyAmount * 10000,
              perAccidentBodyAmount: item.perAccidentBodyAmount * 10000,
              perAccidentFinanceAmount: item.perAccidentFinanceAmount * 10000,
              insuranceTotalAmount: item.insuranceTotalAmount * 10000,
              mergeSingleAmount: item.mergeSingleAmount * 10000,
              selfInflictedAmount: item.selfInflictedAmount.Value,
            }
          }),
          insurancePeriod: {
            startDate: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day}`,
            startHour: this.period.startDate.hour,
            endDate: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day}`,
            endHour: this.period.endDate.hour,
          },
          additionTerms: [...this.additionTermsList.filter(item => {
            return this.termsData[item.additionTermName] && this.termsData[item.additionTermName].selected
          }).map(item => {
            if (this.additionTerms[item.additionTermId]) {
              if (item.additionTermId === 'PL005') {//建築物承租人火災附加條款
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: key == 'value1' ? Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')) * 10000 : this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')
                    }
                  })]
                }
              } else if (['PL040', 'PL049', 'PL016'].includes(item.additionTermId)) {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')) * 10000
                    }
                  })]
                }
              } else {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')
                    }
                  })]
                }
              }
            } else {
              return {
                additionTermId: item.additionTermId,
              }
            }
          })],
        }
        this.$store.dispatch('common/updatedCalculateModel', true)
        const res = await this.$store.dispatch('underwrite/TrialBalanceActivityInsurance', payload)
        if (data.type == 'inside') {
          this.parameter = res.data.content
        } else {
          this.parameter = res.data.content
          this.insuranceAmountListData = {
            ...this.insuranceAmountListData,
            amount: res.data.content.amount ? `NT$${res.data.content.amount}` : '請洽核保',
            parameter: res.data.content.parameter
              ? {
                ...res.data.content.parameter,
                underwriteCoefficient: res.data.content.parameter.underwriteCoefficient > 0
                  ? `+${Number(res.data.content.parameter.underwriteCoefficient) * 100}%`
                  : (res.data.content.parameter.underwriteCoefficient < 0 ? `${Number(res.data.content.parameter.underwriteCoefficient) * 100}%` : `0%`)
              }
              : this.insuranceAmountListData.parameter,
          }
        }
        payload.insureIndustryOtherText = this.industry.Value == 106 ? this.industryText : this.industry.Text
        payload.remark = this.remark.text
        this.$store.dispatch('activity/updatedUnderwriteQuotationData', payload)
        await this.questionnaireCoefficient(true)
        this.openAudit = true
      }
    },
    async placeAuditCalculateAmount(data) {
      this.parameter = {}
      this.verifyRequired('place', true)
      if (this.requestFile.length === 0 &&
        this.verifyResult.length === 0) {
        const payload = {
          orderNo: this.orderNo,
          insureIndustrySeq: this.industry.Value,
          placeUnderwriteInsuranceParameter: {
            additionTermCoefficient: data.additionTermCoefficientParameter == '' ? null : data.additionTermCoefficientParameter,
            aggaoaCoefficient: data.aggAOACoefficient == '' ? null : data.aggAOACoefficient,
            mutiSizeCofficient: data.mutiSizeParameter == '' ? null : data.mutiSizeParameter,
            sizeCofficient: data.sizeCofficient == '' ? null : data.sizeCofficient,
            hexTypeBasicAmount: data.hexTypeBasicAmount == '' ? null : data.hexTypeBasicAmount,
          },
          insuranceAmounts: this.insuranceAmountList.map((item) => {
            return {
              amountType: item.amountType.Value,
              perBodyAmount: item.perBodyAmount * 10000,
              perAccidentBodyAmount: item.perAccidentBodyAmount * 10000,
              perAccidentFinanceAmount: item.perAccidentFinanceAmount * 10000,
              insuranceTotalAmount: item.insuranceTotalAmount * 10000,
              mergeSingleAmount: item.mergeSingleAmount * 10000,
              selfInflictedAmount: item.selfInflictedAmount.Value,
            }
          }),
          insurancePeriod: {
            startDate: `${Number(this.period.startDate.year) + 1911}-${this.period.startDate.month}-${this.period.startDate.day}`,
            startHour: this.period.startDate.hour,
            endDate: `${Number(this.period.endDate.year) + 1911}-${this.period.endDate.month}-${this.period.endDate.day}`,
            endHour: this.period.endDate.hour,
          },
          additionTerms: [...this.additionTermsList.filter(item => {
            return this.termsData[item.additionTermName] && this.termsData[item.additionTermName].selected
          }).map(item => {
            if (this.additionTerms[item.additionTermId]) {
              if (item.additionTermId === 'PL005') {//建築物承租人火災附加條款
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: key == 'value1' ? Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')) * 10000 : this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')
                    }
                  })]
                }
              } else if (['PL040', 'PL049', 'PL016'].includes(item.additionTermId)) {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: Number(this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')) * 10000
                    }
                  })]
                }
              } else {
                return {
                  additionTermId: item.additionTermId,
                  additionTermDetail: [...Object.keys(this.additionTerms[item.additionTermId]).map(key => {
                    return {
                      itemId: key,
                      itemValue: this.additionTerms[item.additionTermId][key].toString().replace(/,/g, '')
                    }
                  })]
                }
              }
            } else {
              return {
                additionTermId: item.additionTermId,
              }
            }
          })],
        }
        this.$store.dispatch('common/updatedCalculateModel', true)
        const res = await this.$store.dispatch('underwrite/TrialBalancePlaceInsurance', payload)
        if (data.type == 'inside') {
          this.parameter = res.data.content
          this.parameter.parameter.hexTypeBasicAmount = data.hexTypeBasicAmount
        } else {
          this.parameter = res.data.content
          this.parameter.parameter.hexTypeBasicAmount = data.hexTypeBasicAmount
          this.insuranceAmountListData = {
            ...this.insuranceAmountListData,
            amount: res.data.content.amount ? `NT$${res.data.content.amount}` : '請洽核保',
            parameter: res.data.content.parameter
              ? {
                ...res.data.content.parameter,
                hexTypeBasicAmount: data.hexTypeBasicAmount,
                underwriteCoefficient: res.data.content.parameter.underwriteCoefficient > 0
                  ? `+${Number(res.data.content.parameter.underwriteCoefficient) * 100}%`
                  : (res.data.content.parameter.underwriteCoefficient < 0 ? `${Number(res.data.content.parameter.underwriteCoefficient) * 100}%` : `0%`)
              }
              : this.insuranceAmountListData.parameter,
          }
        }

        payload.renewal = {
          isRenewal: this.renewal.isRenewal,
          insuranceNumber: this.renewal.InsuranceNumber,
        }
        payload.insureIndustryOtherText = this.industry.Value == 106 ? this.industryText : this.industry.Text
        payload.remark = this.remark.text

        this.$store.dispatch('place/updatedUnderwriteQuotationData', payload)
        await this.questionnaireCoefficient(true)
        this.openAudit = true
      }
    },
    async updateParameter() {
      this.insuranceAmountListData = {
        ...this.insuranceAmountListData,
        amount: this.parameter.amount ? `NT$${this.parameter.amount}` : this.insuranceAmountListData.amount,
        parameter: this.parameter.parameter
          ? {
            ...this.parameter.parameter,
            hexTypeBasicAmount: this.parameter.parameter.hexTypeBasicAmount,
          }
          : this.insuranceAmountListData.parameter,
      }
      this.$store.dispatch('common/updatedCalculateModel', true)
      await this.questionnaireCoefficient(true)
    },
    async updateUnderwritePlaceQuotation(payload) {
      await this.$store.dispatch('underwrite/UpdateUnderwritePlaceQuotation', payload)
    },
    async updateUnderwriteActivityQuotation(payload) {
      await this.$store.dispatch('underwrite/updateUnderwriteActivityQuotation', payload)
    }
  }
}