import request from './index'

export const AdditionTermsType = ({ seq }) => request('get', '/AdditionTermSetting/GetTypeAdditionTerms', { seq, skip: 0, take: 1000 })
export const AdditionTermQuotation = () => request('get', '/AdditionTermSetting/GetAdditionTermQuotation')

export const AdditionTerms = ({ skip = 0, take = 10 }) => request('get', '/AdditionTermSetting/GetAdditionTerms', { skip, take })
export const EditAdditionTermDetail = (data) => request('patch', '/AdditionTermSetting/EditAdditionTermDetail', data)

export const EditAdditionTerm = (data) => request('patch', '/AdditionTermSetting/EditAdditionTerm', data)

export const AdditionTermQuotations = () => request('get', '/AdditionTermSetting/GetAdditionTermQuotations')
export const EditAdditionTermQuotation = (data) => request('patch', '/AdditionTermSetting/EditAdditionTermQuotation', data)
//取得條款說明
export const AdditionTermDescriptions = (additionTermId) => request('get', `/AdditionTermSetting/GetAdditionTermDescriptions?additionTermId=${additionTermId}`)
//取得附加條款加費設定
export const AdditionTermExtraRates = (placeActivityType) => request('get', `/AdditionTermSetting/GetAdditionTermExtraRates?placeActivityType=${placeActivityType}`)
//編輯附加條款加費
export const EditAdditionTermExtraRates = (data) => request('patch', '/AdditionTermSetting/EditAdditionTermExtraRates', data)
