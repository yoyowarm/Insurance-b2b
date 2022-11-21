import request from './index'

export const Nationality = () => request('get', '/NationalitySetting/GetNationalitySettings')
