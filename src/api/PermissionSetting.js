import request from './index'

export const Users = () => request('get', '/PermissionSetting/GetUsers')
export const UserDetail = (id) => request('get', `/PermissionSetting/GetUserDetail/${id}`)
export const Groups = () => request('get', '/PermissionSetting/GetGroups')
export const GroupDetail = (id) => request('get', `/PermissionSetting/GetGroupDetail/${id}`)