import { CountyMinimumSettings } from '@/api/CountyMinimumSetting'
import { AdditionTermsType, AdditionTermQuotation } from '@/api/AdditionTermSetting'
import { Users, UserDetail, Groups, GroupDetail, GroupsDetail, GroupPermissions } from '@/api/PermissionSetting'
import { Places, Activities, PlaceTypes, ActivityTypes, PlaceActivities } from '@/api/PlaceActivitySetting'
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
    async PermissionSettingUsers(_, skip) {
      return await Users({ skip })
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
    async PermissionSettingGroupsDetail() {
      return await GroupsDetail()
    },
    async PermissionSettingGroupPermissions() {
      return await GroupPermissions()
    },
    async PlaceTypes() {
      return await PlaceTypes()
    },
    async PlaceActivities(_, { placeActivityType, typeName }) {
      return await PlaceActivities({ placeActivityType, typeName })
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