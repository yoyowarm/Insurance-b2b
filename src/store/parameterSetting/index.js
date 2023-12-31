import { updateCountyMinimumSettings } from '@/api/CountyMinimumSetting'
import { updatePlacesActivity, GetPlaceActivitieDangerCodes, editPlaceActivitiesShowLevel } from '@/api/PlaceActivitySetting'
import { updateBasicPremiums } from '@/api/BasicPremiumSetting'
import { updatedInsuranceQuotationAmountSetting } from '@/api/InsuranceQuotationAmountSetting'
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
    async editPlaceActivitiesShowLevel(_, data) {
      return await editPlaceActivitiesShowLevel(data)
    },
    async updateBasicPremiums(_, data) {
      return await updateBasicPremiums(data)
    },
    async updatedInsuranceQuotationAmountSetting(_, data) {
      return await updatedInsuranceQuotationAmountSetting(data)
    },
    async GetPlaceActivitieDangerCodes(_, data) {
      return await GetPlaceActivitieDangerCodes(data)
    }
  }
}