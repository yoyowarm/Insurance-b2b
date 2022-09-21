import request from './index'

export const InsuranceQuotationAmountSetting = () => {//取得另行報價保額設定
  return request('get', '/InsuranceQuotationAmountSetting/GetSettings')
}
export const updatedInsuranceQuotationAmountSetting = (data) => {//修改另行報價保額設定
  return request('patch', '/InsuranceQuotationAmountSetting/UpdateSetting', data)
}
