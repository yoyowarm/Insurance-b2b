import { request } from '../utils/request'

export default function (method, url, data = null, config) {
  switch (method) {
    case 'get':
      return request().get(url, { params: data })
    case 'post':
      return request().post(url, data, config)
    case 'put':
      return request().put(url, data)
    case 'patch':
      return request().patch(url, data)
    case 'delete':
      return request().delete(url, data)
    default:
      console.log(`${method} is not a valid HTTP method.`)
      return false
  }
}