import { IsTaxIDNumberFormat, CheckPreventOccupy } from '@/api/Verify'

export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {},
  actions: {
    async IsTaxIDNumberFormat(_, text) {
      return await IsTaxIDNumberFormat(text)
    },
    async CheckPreventOccupy(_, { Type, Text, InsuranedId, ApplicantId }) {
      return await CheckPreventOccupy(Type, Text, InsuranedId, ApplicantId)
    }
  }
}