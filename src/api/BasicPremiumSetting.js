import request from './index'

export const basicPremiums = () => {//取得基本保額設定
  return request('get', '/BasicPremiumSetting/GetBasicPremiums')
}
export const updateBasicPremiums = (data) => {//修改基本保額設定
  return request('patch', '/BasicPremiumSetting/UpdateBasicPremiums', data)
}
