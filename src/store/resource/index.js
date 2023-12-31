import { CountyMinimumSettings } from '@/api/CountyMinimumSetting'
import { AdditionTermsType, AdditionTermQuotation, AdditionTerms, AdditionTermQuotations, AdditionTermDescriptions, AdditionTermExtraRates } from '@/api/AdditionTermSetting'
import { Users, UserDetail, Groups, GroupDetail, GroupsDetail, GroupPermissions } from '@/api/PermissionSetting'
import { Places, Activities, PlaceTypes, ActivityTypes, PlaceActivities } from '@/api/PlaceActivitySetting'
import { TaianUsers, CheckTaianUserExist, GetTaianNGroup } from '@/api/User'
import { Districts } from '@/api/CountySetting'
import { Nationality } from '@/api/NationalitySetting'
import { BusinessSource, BusinessSourceByTaianUser } from '@/api/BusinessSourceSetting'
import { Relationships } from '@/api/CommonSetting'
import { basicPremiums } from '@/api/BasicPremiumSetting'
import { InsuranceQuotationAmountSetting } from '@/api/InsuranceQuotationAmountSetting'
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
    async AdditionTermsType(_, seq) {
      return await AdditionTermsType({ seq })
    },
    async AdditionTermQuotation() {
      return await AdditionTermQuotation()
    },
    async AdditionTerms(_, { skip = 0, take = 10 }) {
      return await AdditionTerms({ skip, take })
    },
    async AdditionTermQuotations() {
      return await AdditionTermQuotations()
    },
    async AdditionTermDescriptions(_, { additionTermId }) {
      return await AdditionTermDescriptions(additionTermId)
    },
    async AdditionTermExtraRates(_, { placeActivityType }) {
      return await AdditionTermExtraRates(placeActivityType)
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
    async PlacesSetting(_, quotationUnderwriteType) {
      return await Places(quotationUnderwriteType)
    },
    async ActivitiesSetting(_, quotationUnderwriteType) {
      return await Activities(quotationUnderwriteType)
    },
    async TaianUsers() {
      return await TaianUsers()
    },
    async GetTaianNGroup() {
      return await GetTaianNGroup()
    },
    async CheckTaianUserExist(_, { employeeId }) {
      return await CheckTaianUserExist(employeeId)
    },
    async Districts() {
      return await Districts()
    },
    async Nationality() {
      return await Nationality()
    },
    async BusinessSource() {
      return await BusinessSource()
    },
    async BusinessSourceByTaianUser(_, employeeId) {

      return await BusinessSourceByTaianUser(employeeId)
    },
    async Relationships() {
      return await Relationships()
    },
    async basicPremiums() {
      return await basicPremiums()
    },
    async InsuranceQuotationAmountSetting() {
      return await InsuranceQuotationAmountSetting()
    }
  }
}