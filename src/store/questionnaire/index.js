import { GetPlaceQuestionnaireCoefficient, GetActivityQuestionnaireCoefficient } from '@/api/Questionnaire'
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async GetPlaceQuestionnaireCoefficient(_, data) {
      return await GetPlaceQuestionnaireCoefficient(data)
    },
    async GetActivityQuestionnaireCoefficient(_, data) {
      return await GetActivityQuestionnaireCoefficient(data)
    }
  }
}