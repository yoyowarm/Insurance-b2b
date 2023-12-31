import { EditAdditionTermDetail, EditAdditionTerm, EditAdditionTermQuotation, EditAdditionTermExtraRates } from '@/api/AdditionTermSetting'
export default {
  namespaced: true,
  state: {
    viewModel: false,
    editModel: false,
  },
  getters: {
  },
  mutations: {},
  actions: {
    async editAdditionTermDetail(_, data) {
      return await EditAdditionTermDetail(data)
    },
    async editAdditionTerm(_, data) {
      return await EditAdditionTerm(data)
    },
    async editAdditionTermQuotation(_, data) {
      return await EditAdditionTermQuotation(data)
    },
    async editAdditionTermExtraRates(_, data) {
      return await EditAdditionTermExtraRates(data)
    }
  }
}