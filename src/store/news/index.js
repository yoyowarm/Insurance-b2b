import { GetNews, GetNewsList, AddNews, UpdateNews, DeleteNews } from '@/api/NewsSetting'

export default {
  namespaced: true,
  state: {},
  getters: {
  },
  mutations: {
  },
  actions: {
    async GetNews(_, id) {
      return await GetNews(id)
    },
    async GetNewsList(_, { skip = 0, take = 10, isFilterEffective }) {
      return await GetNewsList(skip, take, isFilterEffective)
    },
    async AddNews(_, data) {
      return await AddNews(data)
    },
    async UpdateNews(_, data) {
      return await UpdateNews(data)
    },
    async DeleteNews(_, id) {
      return await DeleteNews(id)
    }
  }
}