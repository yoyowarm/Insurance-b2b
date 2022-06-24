import request from './index'

export const PlaceTypes = () => request('get', '/Place/GetPlaceTypes')