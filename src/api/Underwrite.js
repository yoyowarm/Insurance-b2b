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

export const BeginUnderwriting = (data) => {//送出核保
  return request('post', '/Underwrite/BeginUnderwriting', data)
}

export const GetUnderwriteStatusParameter = (orderno) => {//取得核保狀態參數
  return request('get', '/Underwrite/GetUnderwriteStatusParameter', { orderno })
}

export const UpdateUnderwriteProcess = (data) => {//更新核保流程
  return request('patch', '/Underwrite/UpdateUnderwriteProcess', data)
}

export const GetEmployeeUnderwriteLevel = () => {//取得使用者的核保階級
  return request('get', '/Underwrite/GetEmployeeUnderwriteLevel')
}

export const GetUnderwriteProcessHistory = (orderno) => {//取得核保歷程記錄
  return request('get', '/Underwrite/GetUnderwriteProcessHistory', { orderno })
}

export const GetUnderwriteModifyLogs = (orderno) => {//取得核保異動紀錄
  return request('get', '/Underwrite/GetUnderwriteModifyLogs', { orderno })
}

export const GetUnderwriteReviewedList = (data) => {//取得曾經審核過的報價單
  return request('get', '/Underwrite/GetUnderwriteReviewedList', data)
}





