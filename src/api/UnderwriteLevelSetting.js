import request from './index'

export const GetUnderwriteGroups = () => {//取得權限組織清單
  return request('get', '/UnderwriteLevelSetting/GetUnderwriteGroups')
}

export const GetUnderwriteGroupDetail = (id) => {//取得單筆權限組織
  return request('get', '/UnderwriteLevelSetting/GetUnderwriteGroupDetail', { id })
}

export const AddUnderwriteGroup = (data) => {//新增核保組織
  return request('post', '/UnderwriteLevelSetting/AddUnderwriteGroup', data)
}

export const UpdateUnderwriteGroup = (data) => {//更新權限組織
  return request('put', '/UnderwriteLevelSetting/UpdateUnderwriteGroup', data)
}

export const DeleteUnderwriteGroup = (id) => {//刪除權限組織
  return request('delete', `/UnderwriteLevelSetting/DeleteUnderwriteGroup?id=${id}`)
}

export const GetUnderwriteLevels = () => {//取得核保明細階級設定清單
  return request('get', '/UnderwriteLevelSetting/GetUnderwriteLevels')
}

export const GetUnderwriteLevel = (id) => {//取得單筆核保明細階級設定清單
  return request('get', '/UnderwriteLevelSetting/GetUnderwriteLevel', { id })
}

export const AddUnderwriteLevel = (data) => {//新增核保明細階級設定
  return request('post', '/UnderwriteLevelSetting/AddUnderwriteLevel', data)
}

export const UpdateUnderwriteLevel = (data) => {//更新核保階級設定
  return request('patch', '/UnderwriteLevelSetting/UpdateUnderwriteLevel', data)
}

export const DeleteUnderwriteLevel = (id) => {//刪除核保階級設定
  return request('delete', `/UnderwriteLevelSetting/DeleteUnderwriteLevel?id=${id}`)
}






