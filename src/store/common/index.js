import {
  DownloadFile,
  UploadFile,
  DeleteFile,
  AttachmentDetails,
  GetInsuranceDocument,
  GetPlaceQuotationDocument,
  GetActivityQuotationDocument,
  GetQuestionnaireDocument
} from '@/api/File'
export default {
  namespaced: true,
  state: {
    viewModel: false,
    editModel: false,
    calculateModel: false,
    orderNo: '',
    mainOrderNo: '',
    chatMessageList: [
      { name: '陳惠君(G234)', time: '2023.03.10 17:43', text: '留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字。' }, { name: '陳惠君(G234)', time: '2023.03.10 17:43', text: '留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字。' },
      { name: '陳惠君(G234)', time: '2023.03.10 17:43', text: '留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字。' },
      { name: '陳惠君(G234)', time: '2023.03.10 17:43', text: '留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字。' },
      { name: '陳惠君(G234)', time: '2023.03.10 17:43', text: '留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字。' },
      { name: '陳惠君(G234)', time: '2023.03.10 17:43', text: '留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字。' },
      { name: '陳惠君(G234)', time: '2023.03.10 17:43', text: '留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字留言文字。' },
    ],
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
    UPDATED_ORDER_NO(state, { orderNo, mainOrderNo }) {
      state.orderNo = orderNo
      state.mainOrderNo = mainOrderNo
    },
    UPDATED_CHAT_MESSAGE(state, chatMessageList) {
      state.chatMessageList = chatMessageList
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
    async AttachmentDetails(_, { policyAttachmentId }) {
      return await AttachmentDetails(policyAttachmentId)
    },
    async GetInsuranceDocument(_, OrderNo) {
      return await GetInsuranceDocument(OrderNo)
    },
    async GetPlaceQuotationDocument(_, OrderNo) {
      return await GetPlaceQuotationDocument(OrderNo)
    },
    async GetActivityQuotationDocument(_, OrderNo) {
      return await GetActivityQuotationDocument(OrderNo)
    },
    async GetQuestionnaireDocument(_, { orderNo, placeActivityType }) {
      return await GetQuestionnaireDocument(orderNo, placeActivityType)
    },
    updateOrderNo({ commit }, { orderNo, mainOrderNo }) {
      commit('UPDATED_ORDER_NO', { orderNo, mainOrderNo })
    },
    updatedChatMessage({ commit }, chatMessageList) {
      commit('UPDATED_CHAT_MESSAGE', chatMessageList)
    }
  }
}