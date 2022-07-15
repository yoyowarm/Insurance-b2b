import request from './index'

export const Districts = () => request('get', '/CountySetting/GetWithDistricts')