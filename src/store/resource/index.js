import { CountyMinimumSettings } from '@/api/resource'
import { ActivityTypes } from '@/api/Activity'
import { AdditionTermsType, AdditionTermQuotation } from '@/api/AdditionTermSetting'
import { Users, UserDetail, Groups, GroupDetail } from '@/api/PermissionSetting'
import { PlaceTypes } from '@/api/Place'
import { Places, Activities } from '@/api/PlaceActivitySetting'
import { TaianUsers } from '@/api/User'
export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {},
  actions: {
    async CountyMinimumSettings() {
      return await CountyMinimumSettings()
    },
    async ActivityTypes() {
      return await ActivityTypes()
    },
    async AdditionTermsType() {
      return await AdditionTermsType()
    },
    async AdditionTermQuotation() {
      return await AdditionTermQuotation()
    },
    async PermissionSettingUsers() {
      return await Users()
    },
    async PermissionSettingUserDetail(_, id) {
      return await UserDetail(id)
    },
    async PermissionSettingGroups() {
      return await Groups()
    },
    async PermissionSettingGroupDetail(_, id) {
      return await GroupDetail(id)
    },
    async PlaceTypes() {
      return await PlaceTypes()
    },
    async PlacesSetting() {
      return await Places()
    },
    async ActivitiesSetting() {
      return await Activities()
    },
    async TaianUsers() {
      return await TaianUsers()
    }
  }
}