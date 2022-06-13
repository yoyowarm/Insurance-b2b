import { CountyMinimumSettings } from '@/api/resource'
export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {},
  actions: {
    async CountyMinimumSettings() {
      return await CountyMinimumSettings()
    }
  }
}