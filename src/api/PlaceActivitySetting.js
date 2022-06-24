import request from './index'

export const Places = () => request('get', '/PlaceActivitySetting/GetPlaces')
export const Activities = () => request('get', '/PlaceActivitySetting/GetActivities')