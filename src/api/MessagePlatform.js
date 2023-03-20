import request from './index'
//取得留言內容
export const getContents = (mainOrderNo) => request('get', '/MessagePlatform/GetContents', { mainOrderNo })
//新增留言內容
export const addCountents = (data) => request('post', '/MessagePlatform/AddCountents', data)


