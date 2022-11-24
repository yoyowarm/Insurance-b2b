import {
  GetUnderwriteGroups,
  GetUnderwriteGroupDetail,
  AddUnderwriteGroup,
  UpdateUnderwriteGroup,
  DeleteUnderwriteGroup,
  GetUnderwriteLevels,
  GetUnderwriteLevel,
  AddUnderwriteLevel,
  UpdateUnderwriteLevel,
} from '@/api/UnderwriteLevelSetting'
export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {
  },
  actions: {
    async GetUnderwriteGroups() {
      return await GetUnderwriteGroups()
    },
    async GetUnderwriteGroupDetail(_, id) {
      return await GetUnderwriteGroupDetail(id)
    },
    async AddUnderwriteGroup(_, data) {
      return await AddUnderwriteGroup(data)
    },
    async UpdateUnderwriteGroup(_, data) {
      return await UpdateUnderwriteGroup(data)
    },
    async DeleteUnderwriteGroup(_, id) {
      return await DeleteUnderwriteGroup(id)
    },
    async GetUnderwriteLevels() {
      return await GetUnderwriteLevels()
    },
    async GetUnderwriteLevel(_, id) {
      return await GetUnderwriteLevel(id)
    },
    async AddUnderwriteLevel(_, data) {
      return await AddUnderwriteLevel(data)
    },
    async UpdateUnderwriteLevel(_, data) {
      return await UpdateUnderwriteLevel(data)
    },
  }
}