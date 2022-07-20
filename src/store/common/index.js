import { DownloadFile, UploadFile, DeleteFile } from '@/api/File'
export default {
  namespaced: true,
  state: {
    viewModel: false,
    editModel: false,
    calculateModel: false,
    orderNo: '',
  },
  getters: {
  },
  mutations: {
    UPDATED_VIEW_MODEL(state, viewModel) {
      state.viewModel = viewModel
    },
    UPDATED_EDIT_MODEL(state, editModel) {
      state.editModel = editModel
    },
    UPDATED_CALCULATE_MODEL(state, calculateModel) {
      state.calculateModel = calculateModel
    },
    UPDATED_ORDER_NO(state, orderNo) {
      state.orderNo = orderNo
    }
  },
  actions: {
    updatedViewModel({ commit }, viewModel) {
      commit('UPDATED_VIEW_MODEL', viewModel)
    },
    updatedEditModel({ commit }, editModel) {
      commit('UPDATED_EDIT_MODEL', editModel)
    },
    updatedCalculateModel({ commit }, calculateModel) {
      commit('UPDATED_CALCULATE_MODEL', calculateModel)
    },
    async DownloadFile(_, { fileAttachmentId, policyAttachmentId }) {
      return await DownloadFile(fileAttachmentId, policyAttachmentId)
    },
    async UploadFile(_, { policyAttachmentId, file }) {
      return await UploadFile(policyAttachmentId, file)
    },
    async DeleteFile(_, { fileAttachmentId, policyAttachmentId }) {
      return await DeleteFile(fileAttachmentId, policyAttachmentId)
    },
    updateOrderNo({ commit }, orderNo) {
      commit('UPDATED_ORDER_NO', orderNo)
    }
  }
}