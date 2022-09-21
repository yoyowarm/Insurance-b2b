import { updateCountyMinimumSettings } from '@/api/CountyMinimumSetting'
import { updatePlacesActivity } from '@/api/PlaceActivitySetting'
import { updateBasicPremiums } from '@/api/BasicPremiumSetting'
export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {
  },
  actions: {
    async updateCountyMinimumSettings(_, data) {
      return await updateCountyMinimumSettings(data)
    },
    async updatePlacesActivity(_, data) {
      return await updatePlacesActivity(data)
    },
    async updateBasicPremiums(_, data) {
      return await updateBasicPremiums(data)
    }
  }
}