import request from './index'

export const Users = ({ skip }) => request('get', '/PermissionSetting/GetUsers', { skip })
export const UserDetail = (id) => request('get', `/PermissionSetting/GetUserDetail/${id}`)
export const Groups = () => request('get', '/PermissionSetting/GetGroups')
export const GroupDetail = (id) => request('get', `/PermissionSetting/GetGroupDetail/${id}`)
export const GroupsDetail = () => request('get', `/PermissionSetting/GetGroupsDetail/`)
export const GroupPermissions = () => request('get', `/PermissionSetting/GetGroupPermissions/`)

export const AddUsers = (data) => request('post', '/PermissionSetting/AddUser', data)
export const UpdateUser = (data) => request('patch', '/PermissionSetting/EditUser', data)
export const DeleteUser = (data) => request('delete', '/PermissionSetting/DeleteUser', { data })

export const AddGroup = (data) => request('post', '/PermissionSetting/AddGroup', data)
export const UpdateGroup = (data) => request('patch', '/PermissionSetting/EditGroup', data)
export const DeleteGroup = (data) => request('delete', '/PermissionSetting/DeleteGroup', { data })