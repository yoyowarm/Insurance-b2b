import request from './index'

export const IsTaxIDNumberFormat = (text) => {//是否為公司統編格式
  return request('get', '/Verify/IsTaxIDNumberFormat', { text })
}
export const CheckPreventOccupy = (Type, Text, InsuranedId, ApplicantId) => {//檢核防侵占
  return request('get', '/Verify/CheckPreventOccupy', { Type, Text, InsuranedId, ApplicantId })
}

