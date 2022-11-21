import request from './index'

export const GetDocumentSetting = (id) => {//取得單筆文件資訊
    return request('get', `/DocumentDownloadSetting/GetDocumentSetting`, { id })
}
export const GetDocumentSettings = (skip = 0, take = 10, categoryId) => {//取得文件清單
    return request('get', `/DocumentDownloadSetting/GetDocumentSettings`, { categoryId, skip, take })
}
export const GetCategories = () => {//取得文件類型清單
    return request('get', `/DocumentDownloadSetting/GetCategories`)
}
export const DownloadDocument = (id) => {//下載文件
    return request('get', `/DocumentDownloadSetting/DownloadDocument`, { id }, { responseType: 'blob' })
}
export const AddDocument = (CategoryId, Title, Sort, file) => {//新增文件
    return request('post', `/DocumentDownloadSetting/AddDocument?CategoryId=${CategoryId}&Title=${Title}&Sort=${Sort}`, { file }, { 'Content-Type': 'multipart/form-data' })
}
export const UpdateDocument = (id, CategoryId, Title, Sort, file) => {//修改文件
    return request('put', `/DocumentDownloadSetting/UpdateDocument?id=${id}&CategoryId=${CategoryId}&Title=${Title}&Sort=${Sort}`, { file }, { 'Content-Type': 'multipart/form-data' })
}
export const DeleteDocument = (id) => {//刪除文件
    return request('delete', `/DocumentDownloadSetting/DeleteDocument?id=${id}`)
}


