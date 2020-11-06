import axios from 'axios'
import { get } from 'lodash'
import { getData } from '@utils/storage'

function responseHandler(resp) {
  return {
    data: resp.data,
    message: get(resp, 'data.message', resp.statusText),
    status: get(resp, 'data.status', resp.status),
    success: true,
  }
}

function errorHandler(e) {
  const resp = e.response
  throw get(resp, 'data.message', 'UNKNOWN_ERROR')
}

async function getAccessToken() {
  let accessToken = await getData('access_token')
  if (accessToken) {
    return 'Bearer ' + accessToken
  } else {
    return null
  }
}

const client = {
  async postUser(url, data, config = {}) {
    return axios
      .post(url, data, config)
      .then(responseHandler)
      .catch(errorHandler)
  },
  async get(url) {
    let accessToken = await getAccessToken()
    axios.defaults.headers.common.Authorization = accessToken && accessToken
    return axios.get(url).then(responseHandler).catch(errorHandler)
  },
  async post(url, data, config = {}) {
    let accessToken = await getAccessToken()
    axios.defaults.headers.common.Authorization = accessToken && accessToken
    return axios
      .post(url, data, config)
      .then(responseHandler)
      .catch(errorHandler)
  },
  async put(url, data, config = {}) {
    let accessToken = await getAccessToken()
    axios.defaults.headers.common.Authorization = accessToken && accessToken
    return axios
      .put(url, data, config)
      .then(responseHandler)
      .catch(errorHandler)
  },
}

export default client
