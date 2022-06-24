import request from './index'

export const AdditionTermsType = () => request('get', '/AdditionTermSetting/GetTypeAdditionTerms')
export const AdditionTermQuotation = () => request('get', '/AdditionTermSetting/GetAdditionTermQuotation')