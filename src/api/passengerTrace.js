import request from '../utils/request'

export function getTrace(data) {
  return request({
    url: '/qly/location/getLocation',
    method: 'get',
    requestBase:'VUE_APP_URL_NAVI',
    params:data
  })
}

