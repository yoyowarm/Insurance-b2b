import {
  GetUnderwriteQuotationList,
  TrialBalancePlaceInsurance,
  TrialBalanceActivityInsurance,
  UpdateUnderwritePlaceQuotation,
  UpdateUnderwriteActivityQuotation
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
    }
  }
}