import {
  GetDocumentSetting,
  GetDocumentSettings,
  GetCategories,
  DownloadDocument,
  AddDocument,
  UpdateDocument,
  DeleteDocument
} from '@/api/DocumentDownloadSetting'
export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {
  },
  actions: {
    async GetDocumentSetting(_, id) {
      return await GetDocumentSetting(id)
    },
    async GetDocumentSettings(_, { skip = 0, take = 10, categoryId }) {
      return await GetDocumentSettings(skip, take, categoryId)
    },
    async GetCategories() {
      return await GetCategories()
    },
    async DownloadDocument(_, id) {
      return await DownloadDocument(id)
    },
    async AddDocument(_, { CategoryId, Title, Sort, data }) {
      return await AddDocument(CategoryId, Title, Sort, data)
    },
    async UpdateDocument(_, { id, CategoryId, Title, Sort, data }) {
      return await UpdateDocument(id, CategoryId, Title, Sort, data)
    },
    async DeleteDocument(_, id) {
      return await DeleteDocument(id)
    }
  }
}