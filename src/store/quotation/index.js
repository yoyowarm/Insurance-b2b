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
  EditActivityQuotation,
  UpdatePlaceQuotation,
  UpdateActivityQuotation,
  TrialBalanceInsuranceProject,
  ApprovedInsuranceAmount,
  GetPlaceInsuranceProjectAmount,
  EditInsuranceProject,
  GetActivityInsuranceProjectAmount,
  GetInsuraned,
  GetApplicant,
  DeleteInusranceProject,
  EditQuotationApplicantInsured,
  AddPlaceQuotionSerialNo,
  AddActivityQuotationSerialNo
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
    async GetQuotationList(_, { Skip, Take, QuotationListState, Type, QuotationDateBegin, QuotationDateEnd, ApplicantName, InsuredName, MainOrderNo, IOffIcer }) {
      return await GetQuotationList({ Skip, Take, QuotationListState, Type, QuotationDateBegin, QuotationDateEnd, ApplicantName, InsuredName, MainOrderNo, IOffIcer })
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
    async GetPlaceQuotationDetail(_, { orderno, mainOrderNo }) {
      return await GetPlaceQuotationDetail(orderno, mainOrderNo)
    },
    async GetActivityQuotationDetail(_, { orderno, mainOrderNo }) {
      return await GetActivityQuotationDetail(orderno, mainOrderNo)
    },
    async AddInsuranceProject(_, { data }) {
      return await AddInsuranceProject(data)
    },
    async GetInsuranceProjectAmount(_, { data }) {
      return await GetInsuranceProjectAmount(data)
    },
    async FinishQuotation(_, data) {
      return await FinishQuotation(data)
    },
    async BeginUnderwriting(_, { data }) {
      return await BeginUnderwriting(data)
    },
    async EditPlaceQuotation(_, { data }) {
      return await EditPlaceQuotation(data)
    },
    async EditActivityQuotation(_, { data }) {
      return await EditActivityQuotation(data)
    },
    async UpdatePlaceQuotation(_, data) {
      return await UpdatePlaceQuotation(data)
    },
    async UpdateActivityQuotation(_, data) {
      return await UpdateActivityQuotation(data)
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
    },
    async GetInsuraned(_, { name, id }) {
      return await GetInsuraned(name, id)
    },
    async GetApplicant(_, { name, id }) {
      return await GetApplicant(name, id)
    },
    async DeleteInusranceProject(_, { orderNo, insuranceProjectId }) {
      return await DeleteInusranceProject(orderNo, insuranceProjectId)
    },
    async EditQuotationApplicantInsured(_, data) {
      return await EditQuotationApplicantInsured(data)
    },
    async AddPlaceQuotionSerialNo(_, data) {
      return await AddPlaceQuotionSerialNo(data)
    },
    async AddActivityQuotationSerialNo(_, data) {
      return await AddActivityQuotationSerialNo(data)
    }
  }
}