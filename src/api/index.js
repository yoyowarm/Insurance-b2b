import { request } from '../utils/request'

export default function (method, url, data = null, config) {
  switch (method) {
    case 'get':
      return request(config).get(url, { params: data })
    case 'post':
      return request(config).post(url, data)
    case 'put':
      return request(config).put(url, data)
    case 'patch':
      return request().patch(url, data)
    case 'delete':
      return request().delete(url, data)
    default:
      console.log(`${method} is not a valid HTTP method.`)
      return false
  }
}