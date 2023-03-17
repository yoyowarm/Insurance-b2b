import request from './index'

export const Places = (quotationUnderwriteType) => request('get', '/Place/GetPlaces', { quotationUnderwriteType })
export const PlaceTypes = () => request('get', '/Place/GetPlaceTypeNames')
export const Activities = (quotationUnderwriteType) => request('get', '/Activity/GetActivities', { quotationUnderwriteType })
export const ActivityTypes = () => request('get', '/Activity/GetActivityTypeNames')
export const PlaceActivities = ({ placeActivityType, typeName }) => request('get', '/PlaceActivitySetting/GetPlaceActivities', { placeActivityType, typeName, skip: 0, take: 1000 })
export const updatePlacesActivity = (data) => request('patch', '/PlaceActivitySetting/EditPlaceActivities', data)
//取得活動處所危險代號清單
export const GetPlaceActivitieDangerCodes = () => request('get', '/PlaceActivitySetting/GetPlaceActivitieDangerCodes')
//編輯投保行業可顯示目標階級
export const editPlaceActivitiesShowLevel = (data) => request('patch', '/PlaceActivitySetting/EditPlaceActivitiesShowLevel', data)
