import request from './index'

export const GetNews = (id) => {//取得單筆最新消息
    return request('get', `/NewsSetting/GetNews`, { id })
}
export const GetNewsList = (skip = 0, take = 10, isFilterEffective) => {//取得最新消息清單
    return request('get', `/NewsSetting/GetNewsList`, { isFilterEffective, skip, take })
}
export const AddNews = (data) => {//新增最新消息
    return request('post', `/NewsSetting/AddNews`, data)
}
export const UpdateNews = (data) => {//修改最新消息
    return request('put', `/NewsSetting/UpdateNews`, data)
}
export const DeleteNews = (id) => {//刪除最新消息
    return request('delete', `/NewsSetting/DeleteNews?id=${id}`)
}
