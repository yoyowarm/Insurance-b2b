import request from './index'

export const BusinessSource = () => request('get', '/BusinessSourceSetting/GetAll')