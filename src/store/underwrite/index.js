import {
  GetUnderwriteQuotationList,
  TrialBalancePlaceInsurance,
  TrialBalanceActivityInsurance,
  UpdateUnderwritePlaceQuotation,
  UpdateUnderwriteActivityQuotation,
  BeginUnderwriting,
  GetUnderwriteStatusParameter,
  UpdateUnderwriteProcess,
  GetEmployeeUnderwriteLevel,
  GetUnderwriteProcessHistory,
  GetUnderwriteModifyLogs,
  GetUnderwriteReviewedList
} from '@/api/Underwrite'
export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {
  },
  actions: {
    async GetUnderwriteQuotationList(_, data) {
      return await GetUnderwriteQuotationList(data)
    },
    async TrialBalancePlaceInsurance(_, data) {
      return await TrialBalancePlaceInsurance(data)
    },
    async TrialBalanceActivityInsurance(_, data) {
      return await TrialBalanceActivityInsurance(data)
    },
    async UpdateUnderwritePlaceQuotation(_, data) {
      return await UpdateUnderwritePlaceQuotation(data)
    },
    async UpdateUnderwriteActivityQuotation(_, data) {
      return await UpdateUnderwriteActivityQuotation(data)
    },
    async BeginUnderwriting(_, data) {
      return await BeginUnderwriting(data)
    },
    async GetUnderwriteStatusParameter(_, orderno) {
      return await GetUnderwriteStatusParameter(orderno)
    },
    async UpdateUnderwriteProcess(_, data) {
      return await UpdateUnderwriteProcess(data)
    },
    async GetEmployeeUnderwriteLevel() {
      return await GetEmployeeUnderwriteLevel()
    },
    async GetUnderwriteProcessHistory(_, orderno) {
      return await GetUnderwriteProcessHistory(orderno)
    },
    async GetUnderwriteModifyLogs(_, { orderno, quotationUnderwriteType }) {
      return await GetUnderwriteModifyLogs(orderno, quotationUnderwriteType)
    },
    async GetUnderwriteReviewedList(_, data) {
      return await GetUnderwriteReviewedList(data)
    }
  }
}