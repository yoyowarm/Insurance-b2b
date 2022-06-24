import request from './index'

export const ActivityTypes = () => request('get', '/Activity/GetActivityTypes')