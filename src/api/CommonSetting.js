import request from './index'

export const Relationships = () => request('get', '/CommonSetting/GetInsuranceRelationships')