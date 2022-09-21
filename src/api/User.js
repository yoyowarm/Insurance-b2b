import request from './index'

export const TaianUsers = () => request('get', '/User/GetTaianUsers')
//取得泰安使用者是否存在
export const CheckTaianUserExist = (employeeId) => request('get', `/User/CheckTaianUserExist?employeeId=${employeeId}`)
//取得泰安分公司清單
export const GetTaianNGroup = () => request('get', '/User/GetTaianNGroup')



