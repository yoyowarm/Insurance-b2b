import {
  GetPlaceQuestionnaireCoefficient,
  GetActivityQuestionnaireCoefficient,
  GetPlaceQuestionnaireWithoutOrder,
  GetActivityQuestionnaireWithoutOrder,
  AddPlaceQuestionnaireWithoutOrder,
  AddActivityQuestionnaireWithoutOrder,
  UpdatePlaceQuestionnaireWithoutOrder,
  UpdateActivityQuestionnaireWithoutOrder,
  GetQusetionnaireList
} from '@/api/Questionnaire'
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
    },
    async GetPlaceQuestionnaireWithoutOrder(_, questionnarieNo) {
      return await GetPlaceQuestionnaireWithoutOrder(questionnarieNo)
    },
    async GetActivityQuestionnaireWithoutOrder(_, questionnarieNo) {
      return await GetActivityQuestionnaireWithoutOrder(questionnarieNo)
    },
    async AddPlaceQuestionnaireWithoutOrder(_, data) {
      return await AddPlaceQuestionnaireWithoutOrder(data)
    },
    async AddActivityQuestionnaireWithoutOrder(_, data) {
      return await AddActivityQuestionnaireWithoutOrder(data)
    },
    async UpdatePlaceQuestionnaireWithoutOrder(_, data) {
      return await UpdatePlaceQuestionnaireWithoutOrder(data)
    },
    async UpdateActivityQuestionnaireWithoutOrder(_, data) {
      return await UpdateActivityQuestionnaireWithoutOrder(data)
    },
    async GetQusetionnaireList(_, Parameters) {
      return await GetQusetionnaireList(Parameters)
    }
  }
}