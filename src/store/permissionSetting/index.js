import { AddUsers, UpdateUser, DeleteUser, AddGroup, UpdateGroup, DeleteGroup } from '@/api/PermissionSetting'
export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {
  },
  actions: {
    async AddUsers(_, data) {
      return await AddUsers(data)
    },
    async UpdateUser(_, data) {
      return await UpdateUser(data)
    },
    async DeleteUser(_, data) {
      console.log(data)
      return await DeleteUser(data)
    },
    async AddGroup(_, data) {
      return await AddGroup(data)
    },
    async UpdateGroup(_, data) {
      return await UpdateGroup(data)
    },
    async DeleteGroup(_, data) {
      return await DeleteGroup(data)
    }
  }
}