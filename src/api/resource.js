import request from './index'

export const CountyMinimumSettings = () => request('get', '/CountyMinimumSetting/GetAllCountyMinimumSettings ')