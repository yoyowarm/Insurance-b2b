import request from './index'
//取得系統設定
export const getSetting = () => request('get', '/GlobalSetting/GetSettings')

export const makeGlobalSetting = (data) => request('patch', '/GlobalSetting/MakeGlobalSetting', data)
