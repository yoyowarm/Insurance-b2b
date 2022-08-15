import request from './index'
//新增場所報價
export const AddPlaceQuotation = (data) => request('post', '/Quotation/AddPlaceQuotation', data)
//新增活動報價
export const AddActivityQuotation = (data) => request('post', '/Quotation/AddActivityQuotation', data)
//取得報價明細
export const GetQuotationList = ({ Skip, Take, State, Type, QuotationDateBegin, QuotationDateEnd, ApplicantName
}) => request('get', '/Quotation/GetQuotationList', { Skip, Take, State, Type, QuotationDateBegin, QuotationDateEnd, ApplicantName })
//取得所有報價狀態
export const GetQuotationState = () => request('get', '/Quotation/GetQuotationsState')
//取得續保資訊
export const GetRenewInfo = (policyNo) => request('get', '/Quotation/GetRenewInfo/', { policyNo })
//檢查是否另行報價
export const CheckProjectHasQuotation = (orderno, insuranceProjectId) => request('get', '/Quotation/CheckInsuanceProjectHasQuotation', { orderno, insuranceProjectId })
//取得場所報價step3
export const GetPlaceQuotationDetail = (orderno) => request('get', '/Quotation/GetPlaceQuotationDetail', { orderno })
//取得活動報價step3
export const GetActivityQuotationDetail = (orderno) => request('get', '/Quotation/GetActivityQuotationDetail', { orderno })
//新增投保方案（前端保存時）
export const AddInsuranceProject = (data) => request('post', '/Quotation/AddInsuranceProject', data)
//試算
export const GetInsuranceProjectAmount = (data) => request('post', '/Quotation/GetInsuranceProjectAmount', data)
//完成報價
export const FinishQuotation = (data) => request('post', '/Quotation/FinishQuotation', data)
//開始核保
export const BeginUnderwriting = (data) => request('post', '/Quotation/BeginUnderwriting', data)
//修改處所報價 核保
export const EditPlaceQuotation = (data) => request('patch', '/Quotation/EditPlaceQuotation', data)
//修改活動報價 核保
export const EditActivityQuotation = (data) => request('patch', '/Quotation/EditActivityQuotation', data)
//更新場所報價單
export const UpdatePlaceQuotation = (data) => request('patch', '/Quotation/UpdatePlaceQuotation', data)
//更新活動報價單
export const UpdateActivityQuotation = (data) => request('patch', '/Quotation/UpdateActivityQuotation', data)
//保險方案試算
export const TrialBalanceInsuranceProject = (data) => request('post', '/Quotation/TrialBalanceInsuranceProject', data)
//核壓保費
export const ApprovedInsuranceAmount = (data) => request('patch', '/Quotation/ApprovedInsuranceAmount', data)
//處所建單前保費試算
export const GetPlaceInsuranceProjectAmount = (data) => request('post', '/Quotation/GetPlaceInsuranceProjectAmountWithoutOrder', data)
//修改保存舊有保險方案
export const EditInsuranceProject = (data) => request('put', '/Quotation/EditInsuranceProject', data)
//活動建單前保費試算
export const GetActivityInsuranceProjectAmount = (data) => request('post', '/Quotation/GetActivityInsuranceProjectAmountWithoutOrder', data)
//取得被保人資料
export const GetInsuraned = (name, id) => request('get', '/Quotation/GetInsuraned', { name, id })
//取得要保人資料
export const GetApplicant = (name, id) => request('get', '/Quotation/GetApplicant', { name, id })
//刪除保險方案
export const DeleteInusranceProject = (data) => request('delete', '/Quotation/DeleteInusranceProject', data)