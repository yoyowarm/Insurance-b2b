import request from './index'

export const CountyMinimumSettings = () => request('get', '/CountyMinimumSetting/GetAllCountyMinimumSettings')
export const updateCountyMinimumSettings = (data) => request('patch', '/CountyMinimumSetting/UpdateCountyMinimumSetting', data) //更新單筆縣市基礎額設定