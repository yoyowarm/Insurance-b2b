import {
  AddPlaceQuotation,
  AddActivityQuotation,
  GetQuotationList,
  GetQuotationState,
  GetRenewInfo,
  CheckProjectHasQuotation,
  GetPlaceQuotationDetail,
  GetActivityQuotationDetail,
  AddInsuranceProject,
  GetInsuranceProjectAmount,
  FinishQuotation,
  BeginUnderwriting,
  EditPlaceQuotation,
  TrialBalanceInsuranceProject,
  ApprovedInsuranceAmount,
  GetPlaceInsuranceProjectAmount,
  EditInsuranceProject,
  GetActivityInsuranceProjectAmount
} from '@/api/Quotation'
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async AddPlaceQuotation(_, quotation) {
      return await AddPlaceQuotation(quotation)
    },
    async AddActivityQuotation(_, quotation) {
      return await AddActivityQuotation(quotation)
    },
    async GetQuotationList(_, { Skip, Take, State, Type, QuotationDateBegin, QuotationDateEnd, ApplicantName }) {
      return await GetQuotationList({ Skip, Take, State, Type, QuotationDateBegin, QuotationDateEnd, ApplicantName })
    },
    async GetQuotationState() {
      return await GetQuotationState()
    },
    async GetRenewInfo(_, policyNo) {
      return await GetRenewInfo(policyNo)
    },
    async CheckProjectHasQuotation(_, { orderno, insuranceProjectId }) {
      return await CheckProjectHasQuotation(orderno, insuranceProjectId)
    },
    async GetPlaceQuotationDetail(_, orderno) {
      return await GetPlaceQuotationDetail(orderno)
    },
    async GetActivityQuotationDetail(_, orderno) {
      return await GetActivityQuotationDetail(orderno)
    },
    async AddInsuranceProject(_, { data }) {
      return await AddInsuranceProject(data)
    },
    async GetInsuranceProjectAmount(_, { data }) {
      return await GetInsuranceProjectAmount(data)
    },
    async FinishQuotation(_, { data }) {
      return await FinishQuotation(data)
    },
    async BeginUnderwriting(_, { data }) {
      return await BeginUnderwriting(data)
    },
    async EditPlaceQuotation(_, { data }) {
      return await EditPlaceQuotation(data)
    },
    async TrialBalanceInsuranceProject(_, { data }) {
      return await TrialBalanceInsuranceProject(data)
    },
    async ApprovedInsuranceAmount(_, { data }) {
      return await ApprovedInsuranceAmount(data)
    },
    async GetPlaceInsuranceProjectAmount(_, { data }) {
      return await GetPlaceInsuranceProjectAmount(data)
    },
    async EditInsuranceProject(_, { data }) {
      return await EditInsuranceProject(data)
    },
    async GetActivityInsuranceProjectAmount(_, { data }) {
      return await GetActivityInsuranceProjectAmount(data)
    }
  }
}