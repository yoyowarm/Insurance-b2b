import request from './index'

export const DownloadFile = (fileAttachmentId, policyAttachmentId) => request('get', '/File/GetQuotationAttachment', { fileAttachmentId, policyAttachmentId })
export const UploadFile = (policyAttachmentId, file) => request('post', `/File/AddQuotationAttachmnet?policyAttachmentId=${policyAttachmentId}`, { file }, { 'Content-Type': 'multipart/form-data' })
export const DeleteFile = (fileAttachmentId, policyAttachmentId) => request('delete', `/File/DeleteQuotationAttachmnet?fileAttachmentId=${fileAttachmentId}&policyAttachmentId=${policyAttachmentId}`, { fileAttachmentId, policyAttachmentId })
export const AttachmentDetails = (policyAttachmentId) => request('get', '/File/GetQuotationLifeAttachmentDetails', { policyAttachmentId })
export const GetInsuranceDocument = (OrderNo) => request('get', '/Document/GetInsuranceDocument', { OrderNo }, { responseType: 'blob' })//取得要保書
export const GetPlaceQuotationDocument = (OrderNo) => request('get', '/Document/GetPlaceQuotationDocument', { OrderNo }, { responseType: 'blob' })//取得處所類報價單
export const GetActivityQuotationDocument = (OrderNo) => request('get', '/Document/GetActivityQuotationDocument', { OrderNo }, { responseType: 'blob' })//取得活動類報價單
export const GetQuestionnaireDocument = (orderNo, placeActivityType) => request('get', '/Document/GetQuestionnaireDocument', { orderNo, placeActivityType }, { responseType: 'blob' })//取得詢問表



