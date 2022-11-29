import request from './index'

export const GetUnderwriteQuotationList = (data) => {//取得核保明細清單
  return request('get', '/Underwrite/GetUnderwriteQuotationList', data)
}

export const TrialBalancePlaceInsurance = (data) => {//處所核保方案試算
  return request('post', '/Underwrite/TrialBalancePlaceInsuranceProject', data)
}

export const TrialBalanceActivityInsurance = (data) => {//活動核保方案試算
  return request('post', '/Underwrite/TrialBalanceActivityInsuranceProject', data)
}

export const UpdateUnderwritePlaceQuotation = (data) => {//核保更新處所訂單
  return request('patch', '/Underwrite/UpdateUnderwritePlaceQuotation', data)
}

export const UpdateUnderwriteActivityQuotation = (data) => {//核保更新活動訂單
  return request('patch', '/Underwrite/UpdateUnderwriteActivityQuotation', data)
}

