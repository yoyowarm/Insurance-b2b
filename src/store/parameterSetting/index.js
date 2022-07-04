import { updateCountyMinimumSettings } from '@/api/CountyMinimumSetting'
import { updatePlacesActivity } from '@/api/PlaceActivitySetting'
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
    }
  }
}