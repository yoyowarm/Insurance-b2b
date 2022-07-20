import axios from 'axios'
import store from '../store/index'

export const request = function (config = {}) {
  const request = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 20000,
    headers: {
      'Content-Type': config['Content-Type'] ? config['Content-Type'] : 'application/json',
      'Accept': 'application/json'
    }
  })

  request.interceptors.request.use(requestInterceptors.fulfill, requestInterceptors.reject)
  request.interceptors.response.use(responseInterceptors.fulfill, responseInterceptors.reject)

  return request
}

const requestInterceptors = {
  fulfill(config) {
    store.dispatch('app/updatedLoading')
    if (store.state.home.token) {
      config.headers['bearer'] = store.state.home.token
    }

    return config
  },

  reject(error) {
    store.dispatch('app/clearLoading')
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
}

const responseInterceptors = {
  fulfill(response) {
    store.dispatch('app/clearLoading')
    // Do something with response data
    return response
  },
  reject(error) {
    store.dispatch('app/clearLoading')
    // Do something with response error
    console.log(error) // for debug
    if (error.response) {
      switch (error.response.status) {
        case 400:
        case 403:
          console.log("Token 未帶入或 Decode 失敗時")
          break
        case 404:
          console.log("無相對應資料")
          break
        case 500:
          console.log("程式發生問題")
          break
        default:
          console.log(error.message)
      }
    }

    return Promise.reject(error)
  }
}