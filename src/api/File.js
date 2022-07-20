import request from './index'

export const DownloadFile = (fileAttachmentId, policyAttachmentId) => request('get', '/File/GetQuotationAttachment', { fileAttachmentId, policyAttachmentId })
export const UploadFile = (policyAttachmentId, file) => request('post', `/File/AddQuotationAttachmnet?policyAttachmentId=${policyAttachmentId}`, { file }, { 'Content-Type': 'multipart/form-data' })
export const DeleteFile = (fileAttachmentId, policyAttachmentId) => request('delete', '/File/DeleteQuotationAttachmnet', { fileAttachmentId, policyAttachmentId })