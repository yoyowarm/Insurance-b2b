import request from './index'

export const TaianUsers = () => request('get', '/User/GetTaianUsers')