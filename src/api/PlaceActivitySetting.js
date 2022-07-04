import request from './index'

export const Places = () => request('get', '/Place/GetPlaces')
export const PlaceTypes = () => request('get', '/Place/GetPlaceTypeNames')
export const Activities = () => request('get', '/Activity/GetActivities')
export const ActivityTypes = () => request('get', '/Activity/GetActivityTypeNames')
export const PlaceActivities = ({ placeActivityType, typeName }) => request('get', '/PlaceActivitySetting/GetPlaceActivities', { placeActivityType, typeName, skip: 0, take: 1000 })
export const updatePlacesActivity = (data) => request('patch', '/PlaceActivitySetting/EditPlaceActivities', data)
