import request from './index'

export const BusinessSource = () => request('get', '/BusinessSourceSetting/GetAll')
//取得泰安使用者的業務來源
export const BusinessSourceByTaianUser = (employeeId) => request('get', `/BusinessSourceSetting/GetBusinessSourceByTaianUser?employeeId=${employeeId}`)

